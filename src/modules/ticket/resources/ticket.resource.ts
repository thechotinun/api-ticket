import { BaseResourceDto } from '@common/resources/base.resource';
import { ResourceWithPaginateDto } from '@common/resources/paginate.resource';
import { Expose, Type } from 'class-transformer';

export class TicketDto extends BaseResourceDto {
  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  contactInformation: string;

  @Expose()
  status: string;
}

export class TicketResourceDto extends ResourceWithPaginateDto {
  @Expose()
  @Type(() => TicketDto)
  data: TicketDto;
}
