import { Controller, Get, Render, Request, Res, Next } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('setSession')
  setSession(@Request() req): string {
    req.session.username = 'liubf set a session';
    return 'session set success!';
  }

  @Get('getSession')
  getSession(@Request() req): string {
    return req.session.username || 'session is undefined';
  }

  @Get('setCookie')
  setCookie(@Res() res: Response) {
    res.cookie('name', 'zhangsan', {
      // 更多参数参考官网 https://github.com/expressjs/cookie-parser
      maxAge: 60 * 1000 * 30, // 过期时间 毫秒 这里设置30分钟
      httpOnly: false, // 是否允许客户端使用cookie
    });
    res.send('cookie set success!');
  }

  @Get('getCookie')
  getCookie(@Request() req): string {
    return req.cookies.name || 'cookie is undefined';
  }

  @Get('ejs')
  @Render('index.ejs') // 模板注解
  getEjs(): Object {
    return { name: '刘博方' }; // 往模板注入变量
  }
}
