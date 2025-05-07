import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CategoryService } from './category.service';
import { ThreadService } from './thread.service';
import { PostService } from './post.service';
import { LikeService } from './like.service';
import { User as UserModel } from 'generated/prisma';
import { Category as CategoryModel } from 'generated/prisma';
import { Thread as ThreadModel } from 'generated/prisma';
import { Post as PostModel } from 'generated/prisma';
import { Like as LikeModel } from 'generated/prisma';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
		private readonly appService: AppService,
		private readonly userService: UserService,
		private readonly categoryService: CategoryService,
		private readonly threadService: ThreadService,
		private readonly postService: PostService,
		private readonly likeService: LikeService,
	) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
	// User Controller
	@Get('user/:id')
  async getUser(@Param('id') id: Number): Promise<UserModel|null> {
    return this.userService.user({ 
			id: Number(id)
		});
  }
  @Get('users/:searchString')
  async getUsersSearch(
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
    @Body() userData: { id: number; username: string; email: string; password_hash: string; created_at: Date; updated_at: Date },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
  @Delete('userdelete/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
	// Category Controller
	@Get('category/:id')
  async getCategory(@Param('id') id: Number): Promise<CategoryModel|null> {
    return this.categoryService.category({ 
			id: Number(id)
		});
  }
  @Get('categories/:searchString')
  async getCategorySearch(
    @Param('searchString') searchString: string,
  ): Promise<CategoryModel[]> {
    return this.categoryService.categories({
      where: {
        OR: [
          {
            name: { contains: searchString },
          },
          {
            description: { contains: searchString },
          },
        ],
      },
    });
  }
  @Post('category')
  async createCategory(
    @Body() categoryData: { id: number; name: string; description: string; created_at: Date; updated_at: Date },
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(categoryData);
  }
  @Delete('categorydelete/:id')
  async deletecategory(@Param('id') id: string): Promise<CategoryModel> {
    return this.categoryService.deleteCategory({ id: Number(id) });
  }
	// Thread Controller
	@Get('thread/:id')
  async getThread(@Param('id') id: Number): Promise<UserModel|null> {
    return this.userService.user({ 
			id: Number(id)
		});
  }
  @Get('threads/:searchString')
  async getThreadsSearch(
    @Param('searchString') searchString: string,
  ): Promise<ThreadModel[]> {
    return this.threadService.threads({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
        ],
      },
    });
  }
  @Post('thread')
  async createThread(
    @Body() threadData: { id: number, title: string; authoremail: string; created_at: Date; updated_at: Date, category: string},
  ): Promise<ThreadModel> {
		const { title, authoremail, created_at, updated_at, category } = threadData;
    return this.threadService.createThread({
			title,
			user: {
				connect: { email: authoremail },
			},
			created_at,
			updated_at,
			category: {
				connect: { name: category}
			}
	});
  }
  @Delete('threaddelete/:id')
  async deleteThread(@Param('id') id: string): Promise<ThreadModel> {
    return this.threadService.deleteThread({ id: Number(id) });
  }
	// Post Controller
	@Get('post/:id')
  async getPost(@Param('id') id: Number): Promise<PostModel|null> {
    return this.postService.post({ 
			id: Number(id)
		});
  }
  @Get('posts/:searchString')
  async getpostsSearch(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }
  @Post('post')
  async createPost(
    @Body() postData: { id: number; content: string; created_at: Date; updated_at: Date; thread_id: number, authoremail:string},
  ): Promise<PostModel> {
		const { content, created_at, updated_at, thread_id, authoremail} = postData;
    return this.postService.createPost({
			content,
			created_at,
			updated_at,
			thread: {
				connect: { id: thread_id }
			},
			author: {
				connect: { email: authoremail}
			}
		});
  }
  @Delete('postdelete/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
	// Like Controller
  @Get('likes/:searchString')
  async getLikesSearch(
    @Param('searchString') searchString: string,
  ): Promise<LikeModel[]> {
    return this.likeService.likes({
      where: {
        OR: [
          {
          },
        ],
      },
    });
  }
  @Post('like')
  async signupLike(
    @Body() likeData: { created_at: Date; useremail: string, postid: number },
  ): Promise<LikeModel> {
		const { created_at, useremail, postid } = likeData; 
    return this.likeService.createLike({
			created_at,
			user: {
				connect: { email: useremail },
			},
			post: {
				connect: { id: postid }
			}
		});
  }
  @Delete('likedelete/:user_id/:post_id')
  async deleteLike(
		@Param('user_id') user_id: number,
		@Param('post_id') post_id: number,
	): Promise<LikeModel> {
    return this.likeService.deleteLike({
			user_id_post_id: {
				user_id: Number(user_id),
				post_id: Number(post_id)
			}
		});
  }
}
