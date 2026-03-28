import { Controller, Post, Body } from '@nestjs/common';
import { PickupService } from './pickup.service';

@Controller('pickup')
export class PickupController {
    constructor(private pickupService: PickupService) { }

    @Post('scan')
    async scanPickup(@Body() body: { orderId: string; pickupCode: string }) {
        return this.pickupService.scanPickup(body.orderId, body.pickupCode);
    }
}
