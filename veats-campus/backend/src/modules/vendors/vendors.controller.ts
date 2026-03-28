import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { VendorsService } from './vendors.service';

@Controller('vendors')
export class VendorsController {
    constructor(private vendorsService: VendorsService) { }

    @Get()
    async findAll() {
        return this.vendorsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.vendorsService.findById(id);
    }

    @Get(':id/menu')
    async getMenu(@Param('id') id: string) {
        return this.vendorsService.getVendorMenu(id);
    }

    @Get(':id/orders')
    async getOrders(@Param('id') id: string) {
        return this.vendorsService.getVendorOrders(id);
    }

    @Patch('orders/:orderId/status')
    async updateOrderStatus(
        @Param('orderId') orderId: string,
        @Body('status') status: 'CONFIRMED' | 'PREPARING' | 'READY' | 'COMPLETED',
    ) {
        return this.vendorsService.updateOrderStatus(orderId, status);
    }
}
