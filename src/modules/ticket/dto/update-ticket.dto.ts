import { IsOptional, IsEnum, ValidateIf, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TicketStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

export class UpdateTicketDto {
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ example: 'string', required: false })
  title: string;

  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ example: 'string', required: false })
  description: string;

  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ example: 'string', required: false })
  contactInformation: string;

  @IsOptional()
  @ValidateIf((o) => o.status !== undefined && o.status !== null)
  @IsEnum(TicketStatus, {
    message: 'Status must be one of: pending, accepted, resolved, rejected',
  })
  @ApiProperty({
    example: 'pending || accepted || resolved || rejected',
    required: false,
  })
  status: TicketStatus;
}
