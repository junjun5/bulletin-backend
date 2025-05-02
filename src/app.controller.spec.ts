
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User as UserModel } from 'generated/prisma';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UsersService,
  ) {}

  @Get('user/:id')
  async getPostById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: String(id) });
  }

  @Get('feed')
  async getUsers(): Promise<UserModel[]> {
    return this.userService.users({
      // where: { published: true },
    });
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<UserModel[]> {
    return this.userService.users({
      where: {
        OR: [
          {
            username: { contains: searchString },
          },
          {
            email: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('user')
  async signupUser(
    @Body() userData: { id: string; username: string; email: string; pass_hash: string; created_at: Date; updated_at: Date },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: String(id) });
  }
}
