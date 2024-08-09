import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from '@modules/ticket/controllers/ticket.controller';
import { TicketService } from '@modules/ticket/services/ticket.service';
import { CreateTicketDto } from '@modules/ticket/dto/create-ticket.dto';
import { UpdateTicketDto, TicketStatus } from '../dto/update-ticket.dto';
import { HttpStatus } from '@nestjs/common';

describe('TicketController', () => {
  let ticketController: TicketController;
  let ticketService: TicketService;

  beforeEach(async () => {
    const mockTicketService = {
      paginate: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [{ provide: TicketService, useValue: mockTicketService }],
    }).compile();

    ticketController = module.get<TicketController>(TicketController);
    ticketService = module.get<TicketService>(TicketService);
  });

  describe('paginate', () => {
    it('should return success response', async () => {
      const mockPaginationResult = {
        items: [],
        meta: {
          totalItems: 0,
          itemCount: 0,
          itemsPerPage: 10,
          totalPages: 0,
          currentPage: 1,
        },
        status: { code: HttpStatus.OK, message: 'OK' },
      };

      jest
        .spyOn(ticketService, 'paginate')
        .mockResolvedValue(mockPaginationResult);

      const result = await ticketController.paginate({ page: 1, limit: 10 });

      expect(result).toEqual({
        data: [],
        meta: mockPaginationResult.meta,
        status: { code: HttpStatus.OK, message: 'OK' },
      });
    });
  });

  describe('create', () => {
    it('should create a new ticket and return success response', async () => {
      const createTicketDto: CreateTicketDto = {
        title: 'test from unit test',
        description: 'test from unit test',
        contactInformation: 'test from unit test',
      };

      const mockCreatedTicket = {
        id: expect.any(Number),
        title: 'test from unit test',
        description: 'test from unit test',
        contactInformation: 'test from unit test',
        status: 'pending',
        createdDate: expect.any(Date),
        updatedDate: expect.any(Date),
        deletedDate: null,
        isActive: true,
      };
      (ticketService.create as jest.Mock).mockResolvedValue(mockCreatedTicket);

      const result = await ticketController.create(createTicketDto);

      expect(result).toEqual({
        data: expect.objectContaining(mockCreatedTicket),
        status: { code: HttpStatus.OK, message: 'OK' },
      });

      expect(ticketService.create).toHaveBeenCalledWith(createTicketDto);
    });
  });

  describe('update', () => {
    it('should update a ticket and return success response', async () => {
      const ticketId = 1;
      const updateTicketDto: UpdateTicketDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        contactInformation: 'Updated Contact Info',
        status: TicketStatus.ACCEPTED,
      };

      const mockUpdatedTicket = {
        id: ticketId,
        title: 'Updated Title',
        description: 'Updated Description',
        contactInformation: 'Updated Contact Info',
        status: 'accepted',
        createdDate: expect.any(Date),
        updatedDate: expect.any(Date),
        deletedDate: null,
        isActive: true,
      };

      (ticketService.update as jest.Mock).mockResolvedValue(mockUpdatedTicket);

      const result = await ticketController.update(ticketId, updateTicketDto);

      expect(result).toEqual({
        data: expect.objectContaining(mockUpdatedTicket),
        status: { code: HttpStatus.OK, message: 'OK' },
      });

      expect(ticketService.update).toHaveBeenCalledWith(
        ticketId,
        updateTicketDto,
      );
    });

    it('should throw an error when update fails', async () => {
      const ticketId = 1;
      const updateTicketDto: Partial<UpdateTicketDto> = {
        title: 'Updated Title',
      };

      const mockError = new Error('Update failed');
      (ticketService.update as jest.Mock).mockRejectedValue(mockError);

      await expect(
        ticketController.update(ticketId, updateTicketDto as UpdateTicketDto),
      ).rejects.toThrow('Update failed');

      expect(ticketService.update).toHaveBeenCalledWith(
        ticketId,
        updateTicketDto,
      );
    });
  });
});
