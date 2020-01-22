import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { PassportModule } from '@nestjs/passport';
import { PhotoResolver } from './photo.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [PhotoResolver, PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
