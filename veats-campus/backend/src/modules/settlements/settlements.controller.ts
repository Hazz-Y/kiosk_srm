import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { SettlementsService } from './settlements.service';

@Controller('settlements')
export class SettlementsController {
    constructor(private settlementsService: SettlementsService) { }

    @Post('run')
    async runSettlements(
        @Body() body: { periodStart: string; periodEnd: string },
    ) {
        return this.settlementsService.runSettlements(body.periodStart, body.periodEnd);
    }

    @Get()
    async getAllSettlements() {
        return this.settlementsService.getAllSettlements();
    }

    @Get('vendor/:vendorId')
    async getVendorSettlements(@Param('vendorId') vendorId: string) {
        return this.settlementsService.getVendorSettlements(vendorId);
    }
}
