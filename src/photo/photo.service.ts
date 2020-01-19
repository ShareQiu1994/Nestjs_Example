import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  // 获取所有photo
  async findAll(): Promise<any> {
    return this.photoRepository.findAndCount();
  }

  // 根据id获取指定photo
  async findId(id: number): Promise<Photo> {
    return this.photoRepository.findOne({
      id: id,
    });
  }

  // 新增photo
  async add(Photo: Photo): Promise<Photo> {
    return this.photoRepository.save(Photo);
  }

  // 根据id删除指定photo
  async remove(id: number): Promise<Photo> {
    let photo = await this.findId(id); // 获取实体并删除
    if (photo) {
      return this.photoRepository.remove(photo);
    }
  }

  // 根据id修改指定photo
  async update(id: number, Photo: Photo): Promise<any> {
    let photo = await this.findId(id); // 获取实体并删除
    if (photo) {
      for (let k in Photo) {
        photo[k] = Photo[k];
      }
      return this.photoRepository.save(photo);
    }
  }
}
