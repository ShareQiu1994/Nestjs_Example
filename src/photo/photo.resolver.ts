import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';
import { PhotoArgs } from './dto/photo.dto';
import { GqlAuthGuard } from '../auth/jwt.graphql.strategy';
import { ParseIntPipe } from '../common/pipetransform/parseint.pipe'; // 管道数据转换 (数据数据转换)

@Resolver(of => Photo)
// @UseGuards(GqlAuthGuard) // graphql添加jwt鉴权 调试时建议关闭
export class PhotoResolver {
  constructor(private readonly photoService: PhotoService) {}

  // 获取所有photo
  @Query(returns => [Photo])
  async photoFindAll(): Promise<Photo[]> {
    const photoList = await this.photoService.findAll();
    if (!photoList) {
      throw new NotFoundException();
    }
    return photoList;
  }

  // 根据id获取指定photo
  @Query(returns => Photo)
  async photoFindId(
    @Args('id', new ParseIntPipe()) id: number,
  ): Promise<Photo> {
    const photo = await this.photoService.findId(id);
    if (!photo) {
      throw new NotFoundException(id);
    }
    return photo;
  }

  // 新增photo
  @Mutation(returns => Photo)
  async photoAdd(@Args('photo') PhotoArgs: PhotoArgs): Promise<Photo> {
    const addPhoto = await this.photoService.add(PhotoArgs);
    if (!addPhoto) {
      throw new NotFoundException();
    }
    return addPhoto;
  }

  // 根据id修改指定photo
  @Mutation(returns => Photo)
  async photoUpdate(
    @Args('id', new ParseIntPipe()) id: number,
    @Args('photo') PhotoArgs: PhotoArgs,
  ): Promise<Photo> {
    let updatePhoto = await this.photoService.update(id, PhotoArgs);
    if (!updatePhoto) {
      throw new NotFoundException();
    }
    return updatePhoto;
  }

  // 根据id删除指定photo
  @Mutation(returns => Photo)
  async photoDelete(
    @Args('id', new ParseIntPipe()) id: number,
  ): Promise<Photo> {
    let removePhoto = await this.photoService.remove(id);
    return removePhoto;
  }
}
