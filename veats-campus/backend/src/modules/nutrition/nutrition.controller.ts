import { Controller, Get, Param, Query } from '@nestjs/common';
import { NutritionService } from './nutrition.service';

@Controller('nutrition')
export class NutritionController {
    constructor(private nutritionService: NutritionService) { }

    @Get('user/:id')
    async getDailySummary(
        @Param('id') userId: string,
        @Query('date') date?: string,
    ) {
        const targetDate = date || new Date().toISOString().split('T')[0];
        return this.nutritionService.getDailySummary(userId, targetDate);
    }

    @Get('user/:id/weekly')
    async getWeeklyTrend(@Param('id') userId: string) {
        return this.nutritionService.getWeeklyTrend(userId);
    }
}
