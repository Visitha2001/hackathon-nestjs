import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinDate,
  MinLength,
} from 'class-validator';

const now = new Date();

export class CreateHackathonDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(1000)
  description?: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @MinDate(new Date())
  startsAt: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @MinDate(new Date())
  endsAt: Date;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
