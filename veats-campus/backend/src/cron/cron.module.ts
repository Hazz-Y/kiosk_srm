import { Module } from '@nestjs/common';
import { SettlementCronService } from './settlement-cron.service';

@Module({
    providers: [SettlementCronService],
})
export class CronModule { }
