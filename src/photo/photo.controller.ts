import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('photo')
@Controller('photo')
@ApiBearerAuth() // 在线文档增加登录鉴权 (Swagger)
@UseGuards(AuthGuard()) // 整个类的方法都是 401鉴权的
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  // 获取所有photo
  @Get()
  @ApiOperation({ summary: '获取所有photo' })
  findAll(): Promise<Photo[]> {
    return this.photoService.findAll();
  }

  // 新增photo
  @Post()
  @ApiOperation({ summary: '新增photo' })
  add(@Body() Photo: Photo): Promise<Photo> {
    return this.photoService.add(Photo);
  }

  // 根据id获取指定photo
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '参数id',
  })
  @ApiOperation({ summary: '根据id获取指定photo' })
  findId(@Param('id') id: number): Promise<Photo> {
    return this.photoService.findId(id);
  }

  // 根据id删除指定photo
  @Delete(':id')
  @ApiOperation({ summary: '根据id删除photo' })
  async remove(@Param('id') id: number): Promise<Photo> {
    return this.photoService.remove(id);
  }

  // 根据id修改指定photo
  @Put(':id')
  @ApiOperation({ summary: '根据id修改photo' })
  async update(@Param('id') id: number, @Body() Photo: Photo): Promise<Photo> {
    return this.photoService.update(id, Photo);
  }
}
