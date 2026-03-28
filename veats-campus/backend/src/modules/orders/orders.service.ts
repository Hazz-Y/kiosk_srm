// VEats — Orders Service
// Handles cart validation, order creation with multi-vendor splits,
// commission computation, pickup code generation, and promo allocation.

import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import { computeCommission, allocatePromoDiscount } from '../../utils/commission';

export interface CartItem {
    menuItemId: string;
    quantity: number;
}

export interface CreateOrderDto {
    userId: string;
    items: CartItem[];
    promoCode?: string;
    promoDiscount?: number; // flat discount amount
}

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    /**
     * Create a new order with multi-vendor support.
     * 1. Validate all items exist and are available
     * 2. Compute totals per vendor
     * 3. Apply promo discount pro-rata across vendors
     * 4. Generate pickup code
     * 5. Return payment token stub
     */
    async createOrder(dto: CreateOrderDto) {
        const { userId, items, promoCode, promoDiscount } = dto;

        if (!items || items.length === 0) {
            throw new BadRequestException('Cart is empty');
        }

        // Fetch all menu items
        const menuItemIds = items.map((i) => i.menuItemId);
        const menuItems = await this.prisma.menuItem.findMany({
            where: { id: { in: menuItemIds } },
            include: { vendor: true },
        });

        // Validate availability
        for (const cartItem of items) {
            const mi = menuItems.find((m) => m.id === cartItem.menuItemId);
            if (!mi) throw new BadRequestException(`Menu item ${cartItem.menuItemId} not found`);
            if (!mi.isAvailable) throw new BadRequestException(`${mi.name} is currently unavailable`);
        }

        // Compute totals
        let totalAmount = new Decimal(0);
        const orderItemsData: Array<{
            menuItemId: string; vendorId: string; quantity: number; itemPrice: Decimal;
        }> = [];

        const vendorSubtotals: Record<string, number> = {};

        for (const cartItem of items) {
            const mi = menuItems.find((m) => m.id === cartItem.menuItemId)!;
            const lineTotal = mi.price.mul(cartItem.quantity);
            totalAmount = totalAmount.add(lineTotal);

            orderItemsData.push({
                menuItemId: mi.id,
                vendorId: mi.vendorId,
                quantity: cartItem.quantity,
                itemPrice: mi.price,
            });

            vendorSubtotals[mi.vendorId] = (vendorSubtotals[mi.vendorId] || 0) + lineTotal.toNumber();
        }

        // Apply promo discount pro-rata
        const discountAmount = promoDiscount && promoDiscount > 0 ? promoDiscount : 0;
        const promoAllocation = discountAmount > 0
            ? allocatePromoDiscount(vendorSubtotals, discountAmount)
            : {};

        const finalTotal = Math.max(0, totalAmount.toNumber() - discountAmount);

        // Compute commission metadata per vendor
        const commissionMeta: Record<string, { subtotal: number; commission: number; promoShare: number }> = {};
        for (const mi of menuItems) {
            if (!commissionMeta[mi.vendorId]) {
                const commissionPercent = mi.vendor.commissionPercent.toNumber();
                const subtotal = vendorSubtotals[mi.vendorId] || 0;
                commissionMeta[mi.vendorId] = {
                    subtotal,
                    commission: computeCommission(subtotal, commissionPercent),
                    promoShare: promoAllocation[mi.vendorId] || 0,
                };
            }
        }

        // Generate 6-digit pickup code
        const pickupCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Create order + items in transaction
        const order = await this.prisma.order.create({
            data: {
                userId,
                totalAmount: finalTotal,
                pickupCode,
                metadata: {
                    vendorSplits: commissionMeta,
                    promoCode: promoCode || null,
                    promoDiscount: discountAmount,
                    promoAllocation,
                },
                items: {
                    create: orderItemsData,
                },
            },
            include: { items: true },
        });

        // Log food items for nutrition tracking
        for (const cartItem of items) {
            const mi = menuItems.find((m) => m.id === cartItem.menuItemId)!;
            await this.prisma.foodLog.create({
                data: {
                    userId,
                    menuItemId: mi.id,
                    quantity: cartItem.quantity,
                    calories: mi.calories * cartItem.quantity,
                    proteinG: mi.proteinG.mul(cartItem.quantity),
                    carbsG: mi.carbsG.mul(cartItem.quantity),
                    fatG: mi.fatG.mul(cartItem.quantity),
                },
            });
        }

        // Return payment token stub
        // TODO: Replace with actual PhonePe payment initiation
        // See: https://developer.phonepe.com/docs/payment-gateway/
        const paymentPayload = {
            order_ref: order.id,
            amount: finalTotal,
            currency: 'INR',
            payment_token: `PHONEPE_STUB_${order.id}`,
            // TODO: INSERT PHONEPE_MID HERE
            merchant_id: process.env.PHONEPE_MID || 'TODO_INSERT_MERCHANT_ID',
            redirect_url: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/orders?id=${order.id}`,
        };

        return {
            order,
            pickupCode,
            qrContent: `${order.id}|${pickupCode}`,
            payment_payload: paymentPayload,
        };
    }

    async findByUser(userId: string) {
        return this.prisma.order.findMany({
            where: { userId },
            include: {
                items: { include: { menuItem: true, vendor: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                items: { include: { menuItem: true, vendor: true } },
            },
        });
    }

    async getOrderStatus(id: string) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            select: { id: true, orderStatus: true, paymentStatus: true, pickupCode: true },
        });
        return order;
    }
}
