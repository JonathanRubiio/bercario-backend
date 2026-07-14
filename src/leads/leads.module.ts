import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minuto
      limit: 10,  // Límite por defecto
    }]),
  ],
  controllers: [LeadsController],
  providers: [LeadsService, PrismaService],
})
export class LeadsModule {}
