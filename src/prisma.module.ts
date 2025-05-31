import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global() // グローバルモジュールとして定義
@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export class PrismaModule {}
