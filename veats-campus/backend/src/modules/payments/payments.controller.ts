// VEats — Payments Controller
import { Controller, Post, Body, Headers } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(private paymentsService: PaymentsService) { }

    /**
     * POST /api/payments/phonepe/webhook
     * PhonePe server-to-server callback endpoint.
     * TODO: In production, verify x-verify header signature.
     */
    @Post('phonepe/webhook')
    async phonePeWebhook(
        @Body() body: any,
        @Headers('x-verify') xVerify?: string,
    ) {
        return this.paymentsService.handlePhonePeWebhook({
            ...body,
            'x-verify': xVerify,
        });
    }
}
