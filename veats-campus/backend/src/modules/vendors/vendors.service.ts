import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VendorsService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.vendor.findMany({
            where: { status: 'ACTIVE' },
            include: { _count: { select: { menuItems: true } } },
        });
    }

    async findById(id: string) {
        return this.prisma.vendor.findUnique({
            where: { id },
            include: { menuItems: { where: { isAvailable: true } } },
        });
    }

    async getVendorMenu(vendorId: string) {
        return this.prisma.menuItem.findMany({
            where: { vendorId, isAvailable: true },
            orderBy: { name: 'asc' },
        });
    }

    async getVendorOrders(vendorId: string) {
        return this.prisma.orderItem.findMany({
            where: { vendorId },
            include: {
                order: { select: { id: true, orderStatus: true, paymentStatus: true, pickupCode: true, createdAt: true } },
                menuItem: { select: { name: true } },
            },
            orderBy: { order: { createdAt: 'desc' } },
            take: 50,
        });
    }

    async updateOrderStatus(orderId: string, status: 'CONFIRMED' | 'PREPARING' | 'READY' | 'COMPLETED') {
        return this.prisma.order.update({
            where: { id: orderId },
            data: { orderStatus: status },
        });
    }
}
