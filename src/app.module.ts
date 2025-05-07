import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { CategoryService } from './category.service';
import { ThreadService } from './thread.service';
import { PostService } from './post.service';
import { LikeService } from './like.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService, CategoryService, ThreadService, PostService, LikeService],
})
export class AppModule {}
