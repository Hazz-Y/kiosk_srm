import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
    constructor(private menuService: MenuService) { }

    @Get()
    async findAll(@Query('vendorId') vendorId?: string) {
        return this.menuService.findAll(vendorId);
    }

    @Get('top-selling')
    async topSelling(@Query('days') days?: string) {
        return this.menuService.topSellingItems(days ? parseInt(days) : 7);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.menuService.findById(id);
    }

    @Post()
    async create(@Body() body: {
        vendorId: string; name: string; description?: string;
        price: number; isVeg?: boolean; calories?: number;
        proteinG?: number; carbsG?: number; fatG?: number;
    }) {
        return this.menuService.create(body);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() body: any) {
        return this.menuService.update(id, body);
    }
}
