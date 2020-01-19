import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn() // 主键 递增
  id: number;

  @ApiProperty()
  @Column({
    length: '255',
    type: 'varchar',
    nullable: true,
  })
  name: string;

  @ApiProperty()
  @Column({
    type: 'text',
    nullable: true,
  }) // text类型
  description: string;

  @ApiProperty()
  @Column({
    length: '255',
    type: 'varchar',
    nullable: true,
  })
  filename: string;

  @ApiProperty()
  @Column({
    type: 'int',
    nullable: true,
  }) // int类型
  views: number;

  @ApiProperty()
  @Column({
    type: 'bool',
    nullable: true,
  })
  isPublished: boolean;
}
