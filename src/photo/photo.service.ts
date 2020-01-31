import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { PhotoArgs } from './dto/photo.dto';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  // 获取所有photo
  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }

  // 新增photo
  async add(PhotoArgs: PhotoArgs): Promise<Photo> {
    let photo = Object.assign({}, PhotoArgs);
    return this.photoRepository.save(photo);
  }

  // 根据id获取指定photo
  async findId(id: number): Promise<Photo> {
    let photoRes = await this.photoRepository.findOne({
      id: id,
    });

    if (photoRes) return photoRes;
    this.notFoundIdError(id);
  }

  // 根据id删除指定photo
  async remove(id: number): Promise<Photo> {
    let photo = await this.findId(id); // 获取实体并删除
    if (photo) {
      this.photoRepository.remove(photo);
      return photo;
    }
    this.notFoundIdError(id);
  }

  // 根据id修改指定photo
  async update(id: number, PhotoArgs: PhotoArgs): Promise<Photo> {
    let photo = await this.findId(id); // 获取实体并删除
    if (photo) {
      photo = Object.assign(photo, PhotoArgs); // 方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target） 参数1:tatgert 参数2:source
      return this.photoRepository.save(photo);
    }
    this.notFoundIdError(id);
  }

  // id寻找不到数据 异常处理
  notFoundIdError(id: number) {
    throw new HttpException(
      `抱歉，指定的id:${id}找不到对应的数据！`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
