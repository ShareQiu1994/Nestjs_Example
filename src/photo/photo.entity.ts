import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'; // 定义 typeorm相关 装饰器
import { Field, ID, ObjectType } from 'type-graphql'; // 定义 graphql的相关 装饰器

@Entity()
@ObjectType()
export class Photo {
  @Field(type => ID)
  @PrimaryGeneratedColumn() // 主键 递增
  id: number;

  @Field({ nullable: true })
  @Column({
    name: 'name',
    length: '255',
    type: 'varchar',
    nullable: true,
  })
  name: string;

  @Field({ nullable: true })
  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  }) // text类型
  description: string;

  @Field({ nullable: true })
  @Column({
    name: 'filename',
    length: '255',
    type: 'varchar',
    nullable: true,
  })
  filename: string;

  @Field({ nullable: true })
  @Column({
    name: 'views',
    type: 'int',
    nullable: true,
  }) // int类型
  views: number;

  @Field({ nullable: true })
  @Column({
    name: 'isPublished',
    type: 'bool',
    nullable: true,
  })
  isPublished: boolean;
}
