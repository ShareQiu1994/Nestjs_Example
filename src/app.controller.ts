import {
  Controller,
  Get,
  Render,
  Request,
  Res,
  Next,
  Param,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { TestGuard } from './common/guards/test.guards';
import { TestInterceptor } from './common/interceptors/test.interceptor';

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

  // 使用守卫(自定义守卫)
  @UseGuards(TestGuard)
  @Get('guards/:num')
  guards(@Param('num') num: number): number {
    return num;
  }

  // 使用拦截器(自定义拦截器)
  @UseInterceptors(TestInterceptor)
  @Get('interceptors/:num')
  interceptors(@Param('num') num: number) {
    return '这是一个普通的拦截器';
  }

  @Get('ejs')
  @Render('index.ejs') // 模板注解
  getEjs(): Object {
    return { name: '刘博方' }; // 往模板注入变量
  }
}
