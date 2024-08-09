import { Ticket } from '@entities/ticket.entity';
import { TicketException } from '@exceptions/app/ticket.exception';
import { CreateTicketDto } from '@modules/ticket/dto/create-ticket.dto';
import { UpdateTicketDto } from '@modules/ticket/dto/update-ticket.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketRepository } from '@repositories/ticket.repository';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { UpdateResult } from 'typeorm';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketRepository)
    private readonly ticketRepository: TicketRepository,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<Ticket>> {
    const queryBuilder = this.ticketRepository
      .createQueryBuilder('ticket')
      .orderBy('ticket.createdDate', 'DESC');

    return paginate<Ticket>(queryBuilder, options);
  }

  async findOneById(id: number): Promise<Ticket> {
    return await this.ticketRepository
      .findOneOrFail({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw TicketException.notFound();
      });
  }

  async create(payload: CreateTicketDto): Promise<Ticket> {
    try {
      const create = await this.ticketRepository.create(payload);
      create.status = 'pending';

      return await this.ticketRepository.save(create);
    } catch (error) {
      throw TicketException.createError(error.message);
    }
  }

  async update(id: number, payload: UpdateTicketDto): Promise<Ticket> {
    try {
      await this.findOneById(id);

      await this.ticketRepository.update(id, {
        ...payload,
      });

      return await this.findOneById(id);
    } catch (error) {
      throw TicketException.updateError(error.message);
    }
  }

  async remove(id: number): Promise<UpdateResult> {
    try {
      await this.findOneById(id);

      return await this.ticketRepository.softDelete(id);
    } catch (error) {
      throw TicketException.deleteError(error.message);
    }
  }
}
