// VEats — Payments Service (PhonePe Integration Stubs)
// TODO: Complete PhonePe integration
// Docs: https://developer.phonepe.com/docs/payment-gateway/
// Sandbox: https://api-preprod.phonepe.com/apis/pg-sandbox

import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
    private readonly logger = new Logger(PaymentsService.name);

    constructor(private prisma: PrismaService) { }

    /**
     * Handle PhonePe webhook callback.
     * Verifies signature and updates order payment status.
     *
     * TODO: Implement actual PhonePe signature verification
     * See: https://developer.phonepe.com/docs/payment-gateway/server-to-server-callback
     */
    async handlePhonePeWebhook(payload: {
        response: string; // base64 encoded response
        'x-verify'?: string; // checksum header
    }) {
        const { response: encodedResponse } = payload;
        const xVerify = payload['x-verify'];

        // ── Signature Verification Placeholder ──
        // TODO: INSERT PHONEPE_WEBHOOK_SECRET HERE
        const webhookSecret = process.env.PHONEPE_WEBHOOK_SECRET || 'TODO_INSERT_WEBHOOK_SECRET';

        if (webhookSecret !== 'TODO_INSERT_WEBHOOK_SECRET') {
            // TODO: Implement actual verification:
            // 1. Decode base64 response
            // 2. Compute SHA256(response + "/pg/v1/status/" + merchantId + "/" + transactionId + webhookSecret) + "###" + saltIndex
            // 3. Compare with x-verify header
            const computedChecksum = crypto
                .createHash('sha256')
                .update(encodedResponse + webhookSecret)
                .digest('hex');

            this.logger.log(`Computed checksum: ${computedChecksum}`);
            // if (computedChecksum !== xVerify) {
            //   throw new BadRequestException('Invalid webhook signature');
            // }
        } else {
            this.logger.warn('⚠️  PhonePe webhook secret not configured. Skipping signature verification.');
        }

        // Decode the response (stub: treat as JSON with order_ref)
        let decodedResponse: any;
        try {
            decodedResponse = JSON.parse(
                Buffer.from(encodedResponse, 'base64').toString('utf-8'),
            );
        } catch {
            // For dev/testing: accept plain JSON body
            decodedResponse = payload as any;
        }

        const orderId = decodedResponse.order_ref || decodedResponse.orderId;
        const status = decodedResponse.status || 'PAID';

        if (!orderId) {
            throw new BadRequestException('Missing order_ref in webhook payload');
        }

        // Update order payment status
        const paymentStatus = status === 'PAID' || status === 'SUCCESS' ? 'PAID' : 'FAILED';
        const order = await this.prisma.order.update({
            where: { id: orderId },
            data: {
                paymentStatus,
                orderStatus: paymentStatus === 'PAID' ? 'CONFIRMED' : undefined,
            },
        });

        this.logger.log(`Order ${orderId} payment status updated to ${paymentStatus}`);
        return { success: true, orderId: order.id, paymentStatus };
    }
}
