import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

async function setupApp(app) {
    app.enableCors({
        origin: [
            process.env.CORS_ORIGIN || 'http://localhost:3000',
            'https://frontend-three-taupe-53.vercel.app'
        ],
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    app.setGlobalPrefix('api');
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await setupApp(app);
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`🚀 VEats API running on http://localhost:${port}/api`);
}

// For Vercel Serverless
export const handler = async (req, res) => {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    await setupApp(app);
    await app.init();
    server(req, res);
};

// Only bootstrap if not running on Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    bootstrap();
}

export default server;
