import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ejs')
  @Render('index.ejs') // 模板注解
  getEjs(): Object {
    return { name: '刘博方' }; // 往模板注入变量
  }
}
