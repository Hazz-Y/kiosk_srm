// VEats — Pickup Service (QR verification)
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PickupService {
    constructor(private prisma: PrismaService) { }

    /**
     * Verify pickup code and mark order as COMPLETED.
     * QR content format: order_id|pickup_code
     * Vendor scans QR → frontend sends orderId + pickupCode → backend verifies.
     */
    async scanPickup(orderId: string, pickupCode: string) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        if (order.pickupCode !== pickupCode) {
            throw new BadRequestException('Invalid pickup code');
        }

        if (order.orderStatus === 'COMPLETED') {
            throw new BadRequestException('Order already picked up');
        }

        if (order.orderStatus !== 'READY') {
            throw new BadRequestException(`Order is not ready for pickup (current status: ${order.orderStatus})`);
        }

        const updated = await this.prisma.order.update({
            where: { id: orderId },
            data: { orderStatus: 'COMPLETED' },
        });

        return {
            success: true,
            orderId: updated.id,
            orderStatus: updated.orderStatus,
            message: 'Pickup confirmed! Order completed.',
        };
    }
}
