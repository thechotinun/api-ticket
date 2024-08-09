import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from '@modules/ticket/controllers/ticket.controller';
import { TicketService } from '@modules/ticket/services/ticket.service';
import { HttpStatus } from '@nestjs/common';

describe('TicketController', () => {
  let ticketController: TicketController;
  let ticketService: TicketService;

  beforeEach(async () => {
    const mockTicketService = {
      paginate: jest.fn(),
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
});
