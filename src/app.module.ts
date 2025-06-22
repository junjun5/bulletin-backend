import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma.service";
import { UserService } from "./user.service";
import { CategoryService } from "./category.service";
import { ThreadService } from "./thread.service";
import { PostService } from "./post.service";
import { LikeService } from "./like.service";
import { AuthService } from "./auth/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./auth/constants";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";

@Module({
	imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
	],
	controllers: [AppController],
	providers: [
		AppService,
		PrismaService,
		UserService,
		CategoryService,
		ThreadService,
		PostService,
		LikeService,
		AuthService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
