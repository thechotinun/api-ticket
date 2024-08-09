import { IsOptional, IsEnum, ValidateIf, MaxLength } from 'class-validator';

enum TicketStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

export class UpdateTicketDto {
  @IsOptional()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @MaxLength(100)
  description: string;

  @IsOptional()
  @MaxLength(100)
  contactInformation: string;

  @IsOptional()
  @ValidateIf((o) => o.status !== undefined && o.status !== null)
  @IsEnum(TicketStatus, {
    message: 'Status must be one of: pending, accepted, resolved, rejected',
  })
  status: TicketStatus;
}
