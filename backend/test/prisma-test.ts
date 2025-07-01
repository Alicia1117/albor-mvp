import { PrismaClient, type User } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const user: User = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
    },
  });
  console.log(user);
}

main()
  .catch((e: unknown) => console.error(e))
  .finally(() => {
    void prisma.$disconnect();
  });
