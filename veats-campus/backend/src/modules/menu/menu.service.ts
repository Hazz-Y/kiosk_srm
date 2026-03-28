import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MenuService {
    constructor(private prisma: PrismaService) { }

    async findAll(vendorId?: string) {
        return this.prisma.menuItem.findMany({
            where: {
                ...(vendorId ? { vendorId } : {}),
                isAvailable: true,
            },
            include: { vendor: { select: { name: true, outletCode: true } } },
            orderBy: { name: 'asc' },
        });
    }

    async findById(id: string) {
        return this.prisma.menuItem.findUnique({
            where: { id },
            include: { vendor: { select: { name: true, location: true } } },
        });
    }

    async create(data: {
        vendorId: string; name: string; description?: string;
        price: number; isVeg?: boolean; calories?: number;
        proteinG?: number; carbsG?: number; fatG?: number;
    }) {
        return this.prisma.menuItem.create({ data });
    }

    async update(id: string, data: Partial<{
        name: string; description: string; price: number;
        isVeg: boolean; isAvailable: boolean; calories: number;
        proteinG: number; carbsG: number; fatG: number;
    }>) {
        return this.prisma.menuItem.update({ where: { id }, data });
    }

    async topSellingItems(days = 7, limit = 5) {
        // Analytics: top 5 selling items in last N days
        const since = new Date();
        since.setDate(since.getDate() - days);

        const topItems = await this.prisma.orderItem.groupBy({
            by: ['menuItemId'],
            _sum: { quantity: true },
            where: { order: { createdAt: { gte: since } } },
            orderBy: { _sum: { quantity: 'desc' } },
            take: limit,
        });

        const itemIds = topItems.map((t) => t.menuItemId);
        const items = await this.prisma.menuItem.findMany({
            where: { id: { in: itemIds } },
            include: { vendor: { select: { name: true } } },
        });

        return topItems.map((t) => ({
            ...items.find((i) => i.id === t.menuItemId),
            totalSold: t._sum.quantity,
        }));
    }
}
