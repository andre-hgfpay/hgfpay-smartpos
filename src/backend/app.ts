import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { INestApplicationContext } from "@nestjs/common";
import {setupSwagger} from "./swagger";

export async function bootstrap(): Promise<INestApplicationContext> {
    //const nestContext = await NestFactory.createApplicationContext(AppModule, {});
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('v1')
    setupSwagger(app)
    await app.listen(3454);
    return app;
}
