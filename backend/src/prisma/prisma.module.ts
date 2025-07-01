import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// 全域 module
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
