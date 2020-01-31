import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthTokenDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'userName字段不能为空!' }) //  nest逻辑层验证
  @IsString({
    // 验证字段类型
    message: 'userName字段必须字符串',
  })
  userName: string;
}
