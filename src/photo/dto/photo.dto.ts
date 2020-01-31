import { IsOptional, IsInt, IsBoolean, IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql'; // 定义 graphql的相关 装饰器
import { ApiProperty } from '@nestjs/swagger'; // 定义 swagger相关 装饰器

@InputType()
export class PhotoArgs {
  @Field({ nullable: true }) // 可以为空
  @IsOptional() // 可选的
  @IsString({
    // 验证字段类型
    message: 'name字段必须字符串',
  })
  @ApiProperty()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({
    message: 'description字段必须字符串',
  })
  @ApiProperty()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({
    message: 'filename字段必须字符串',
  })
  @ApiProperty()
  filename?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt({
    message: 'views字段必须为数值',
  })
  @ApiProperty()
  views?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean({
    message: 'isPublished字段必须布尔值',
  })
  @ApiProperty()
  isPublished?: boolean;
}
