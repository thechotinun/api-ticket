import { Module } from '@nestjs/common';
import { TicketService } from './services/ticket.service';
import { TicketRepository } from '@repositories/ticket.repository';
import { TicketController } from './controllers/ticket.controller';
import { MyLogger } from '@common/logger/mylogger.service';

@Module({
  imports: [],
  controllers: [TicketController],
  providers: [TicketService, TicketRepository, MyLogger],
})
export class TicketModule {}
