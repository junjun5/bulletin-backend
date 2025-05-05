// prisma/seed.ts
import { getEnabledCategories } from "trace_events";
import { PrismaClient } from "../generated/prisma";
// import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // const user1 = await prisma.user.create({
  //   data: {
	// 		id: "1",
	// 		username: "junjun",
	// 		email: 'junjun@example.com',
	// 		pass_hash: "password",
	// 		created_at: "2023-10-27T10:30:00+09:00",
	// 		updated_at: "2023-10-27T10:30:00+09:00",
  //     },
  // });

  // console.log({ user1 });
	// const newCategory = await prisma.category.create({
	// 	data: {
	// 		name: "Music",
	// 		description: "Let's get excited about recommended songs, artists, and live music information."
	// 	},
	// })
	// console.log({ newCategory })
	// const newUser = await prisma.user.create({
  //   data: {
  //     username: 'newuser',
  //     email: 'newuser@example.com',
	// 		password_hash: "password!",
	// 		}
	// 	}
  // );
  // console.log({ newUser });
	// const newThread = await prisma.thread.create({
	// 	data: {
	// 		title: "hoge",
	// 		category_id: 1,
	// 		user_id: 3,
	// 		}
	// 	}
	// )
  // console.log({ newThread });
	// const newPost = await prisma.post.create({
	// 	data: {
	// 		thread_id: 4,
	// 		user_id: 3,
	// 		content: "fuga"
	// 	}
	// })
	// console.log({ newPost })
	const newLike = await prisma.like.create({
		data: {
			user_id: 3,
			post_id: 4
		}
	})
	console.log({ newLike })
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });