import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
import { OrdersService, CreateOrderDto } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @Post('create')
    async createOrder(@Body() body: CreateOrderDto) {
        return this.ordersService.createOrder(body);
    }

    @Get('user/:userId')
    async getUserOrders(@Param('userId') userId: string) {
        return this.ordersService.findByUser(userId);
    }

    @Get(':id')
    async getOrder(@Param('id') id: string) {
        return this.ordersService.findById(id);
    }

    @Get(':id/status')
    async getOrderStatus(@Param('id') id: string) {
        return this.ordersService.getOrderStatus(id);
    }
}
