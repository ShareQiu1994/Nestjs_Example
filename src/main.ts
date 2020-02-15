import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /* cookie 中间件 */
  app.use(cookieParser());

  /* 设置session中间件 */
  app.use(
    session({
      secret: 'liubf', //  一个 String 类型的字符串，作为服务器端生成 session 的签名。
      name: 'nest', // 返回客户端的 key 的名称，默认为 connect.sid,也可以自己设置。
      resave: false, // 强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。
      saveUninitialized: true, //强制将未初始化的 session 存储。当新建了一个 session 且未设定属性或值时，它就处于未初始化状态。在设定一个 cookie 前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。
      rolling: true, // 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
      cookie: {
        // cookie包含的options 有 domain expires httpOnly maxAge path // 详细见官网 https://github.com/expressjs/session
        maxAge: 60 * 1000 * 30, // 过期时间 毫秒 这里设置30分钟
      },
    }),
  );

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

  /* swagger配置 */
  const options = new DocumentBuilder()
    .setTitle('liubf Api')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth() // 文档 添加jwt请求验证头
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(3000);

  console.log(
    '\x1B[33mNestJS程序启动成功！\x1B[0m\x1B[36mhttp://localhost:3000\x1B[0m',
  );
}
bootstrap();
