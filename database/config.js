import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line import/no-mutable-exports
let prisma = null;

// Stop hot-reloading from generating too many prisma clients in dev
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  global.prisma = global.prisma || new PrismaClient();
  prisma = global.prisma;
}

export default prisma;
