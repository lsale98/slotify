import { hash } from '@node-rs/argon2';
import { PrismaClient } from '@/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const email =
    process.env.SEED_SUPER_ADMIN_EMAIL ?? 'lakatos.aleksandar79@gmail.com';
  const password = process.env.SEED_SUPER_ADMIN_PASSWORD ?? 'coa98!*';
  const name = process.env.SEED_SUPER_ADMIN_NAME ?? 'Aleksandar';
  const lastname = process.env.SEED_SUPER_ADMIN_LASTNAME ?? 'Lakatos';

  const passwordHash = await hash(password);

  const superAdmin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name,
      lastname,
      passwordHash,
      role: 'SUPERADMIN',
      status: 'ACTIVE',
      emailVerified: true,
      agreedTerms: true,
    },
  });

  console.log(`✅ Super admin seeded: ${superAdmin.email}`);
}

main()
  .catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
