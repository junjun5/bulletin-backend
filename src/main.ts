import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: 'http://localhost:3001', // Next.jsフロントエンドのオリジンを指定
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // 許可するHTTPメソッド
    credentials: true, // クッキーや認証ヘッダーを許可する場合
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
