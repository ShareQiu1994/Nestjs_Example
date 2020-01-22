import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoModule } from './photo/photo.module';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'lbf@2018',
      database: 'ptyt',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // 是否同步
    }),
    GraphQLModule.forRoot({
      playground: true, // 开启调试界面
      autoSchemaFile: './schema.gql', // 放个该名字的空文件，底层会读取Nest形式的schema然后生成graphql原始的sehema里面
      context: ({ req }) => {
        // console.log(req.headers.authorization); // <-- this is always undefined
        return { req };
      },
      // installSubscriptionHandlers: true, // 使用订阅就要开启这个参数
    }),
    RecipesModule,
    AuthModule,
    PhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
