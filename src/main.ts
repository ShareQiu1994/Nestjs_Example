import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /* 配置静态目录 */
  //app.useStaticAssets('public'); // 配置静态资源目录 http://localhost:3000/images/0.jpg
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static/', //配置虚拟目录 http://localhost:3000/static/images/0.jpg
  });

  /* 配置模板引擎 */
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs'); //配置模板引擎类型 必须提前安装好依赖

  /* 使用全局管道 http请求产生数据验证,数据转换 */
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('liubf Api')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth() // 文档 添加jwt请求验证头
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);

  await app.listen(3000);
}
bootstrap();
