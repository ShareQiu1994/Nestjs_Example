import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthTokenDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'userName字段不能为空!' }) //  nest逻辑层验证
  userName: string;
}
