import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginateQuery } from '@common/dto/paginate.query';
import { TicketService } from '@modules/ticket/services/ticket.service';
import { ApiResource } from '@common/reponses/api-resource';
import { UseResources } from '@interceptors/use-resources.interceptor';
import { TicketResourceDto } from '@modules/ticket/resources/ticket.resource';
import { CreateTicketDto } from '@modules/ticket/dto/create-ticket.dto';
import { UpdateTicketDto } from '@modules/ticket/dto/update-ticket.dto';
import { ApiQuery, ApiOperation } from '@nestjs/swagger';

@Controller('api/v1/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  @ApiOperation({ summary: 'Get Tickets' })
  @ApiQuery({
    name: 'perPage',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @UseResources(TicketResourceDto)
  async paginate(
    @Query() { page, limit }: PaginateQuery,
  ): Promise<ApiResource> {
    try {
      const reponse = await this.ticketService.paginate({
        page,
        limit,
      });

      return ApiResource.successResponse(reponse);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find Ticket' })
  async findOneById(@Param('id') id: number): Promise<ApiResource> {
    try {
      const response = await this.ticketService.findOneById(id);

      return ApiResource.successResponse(response);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create Ticket' })
  async create(@Body() payload: CreateTicketDto): Promise<ApiResource> {
    try {
      const response = await this.ticketService.create(payload);

      return ApiResource.successResponse(response);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Ticket' })
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateTicketDto,
  ): Promise<ApiResource> {
    try {
      const response = await this.ticketService.update(id, payload);

      return ApiResource.successResponse(response);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Ticket' })
  async remove(@Param('id') id: number): Promise<ApiResource> {
    try {
      const response = await this.ticketService.remove(id);

      return ApiResource.successResponse(response);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
