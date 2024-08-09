import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ example: 'string' })
  title: string;

  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ example: 'string', required: false })
  description: string;

  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ example: 'string' })
  contactInformation: string;
}
