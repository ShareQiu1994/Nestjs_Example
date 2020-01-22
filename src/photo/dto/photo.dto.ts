import { IsOptional } from 'class-validator';
import { Field, InputType } from 'type-graphql'; // 定义 graphql的相关 装饰器
import { ApiProperty } from '@nestjs/swagger'; // 定义 swagger相关 装饰器

@InputType()
export class PhotoArgs {
  @Field({ nullable: true }) // 可以为空
  @IsOptional() // 可选的
  @ApiProperty()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @ApiProperty()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @ApiProperty()
  filename?: string;

  @Field({ nullable: true })
  @IsOptional()
  @ApiProperty()
  views?: number;

  @Field({ nullable: true })
  @IsOptional()
  @ApiProperty()
  isPublished?: boolean;
}
