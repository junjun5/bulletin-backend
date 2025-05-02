// prisma/seed.ts
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
			id: "1",
			username: "junjun",
			email: 'junjun@example.com',
			pass_hash: "password",
			created_at: "2023-10-27T10:30:00+09:00",
			updated_at: "2023-10-27T10:30:00+09:00",
      },
  });

  console.log({ user1 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });