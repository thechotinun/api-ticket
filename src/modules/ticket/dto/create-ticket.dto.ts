import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @MaxLength(100)
  description: string;

  @IsNotEmpty()
  @MaxLength(100)
  contactInformation: string;
}
