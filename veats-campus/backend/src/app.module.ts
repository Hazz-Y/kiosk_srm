// VEats — Root Application Module
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { VendorsModule } from './modules/vendors/vendors.module';
import { MenuModule } from './modules/menu/menu.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PickupModule } from './modules/pickup/pickup.module';
import { SettlementsModule } from './modules/settlements/settlements.module';
import { NutritionModule } from './modules/nutrition/nutrition.module';
import { CronModule } from './cron/cron.module';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        PrismaModule,
        AuthModule,
        UsersModule,
        VendorsModule,
        MenuModule,
        OrdersModule,
        PaymentsModule,
        PickupModule,
        SettlementsModule,
        NutritionModule,
        CronModule,
    ],
})
export class AppModule { }
