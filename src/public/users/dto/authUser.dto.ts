import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class AuthUserDto extends Dto<AuthUserDto> {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  email: string;
}
