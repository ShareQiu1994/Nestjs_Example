import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

//拦截器

/* 
【拦截器主要功能】
1.在函数执行之前/之后绑定额外的逻辑
2.转换从函数返回的结果
3.转换从函数抛出的异常
4.扩展基本函数行为
5.根据所选条件完全重写函数 (例如, 缓存目的)
*/
@Injectable()
export class TestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();
    const request = context.switchToHttp().getRequest();

    request.params.num = Number(request.params.num) + 10; // 【在函数执行之前/之后绑定额外的逻辑】

    return next
      .handle()
      .pipe(
        map(data => ({
          // map函数用于转换函数的输出数据  【转换从函数返回的结果】
          msg: data,
          parma: `接收的参数是:${request.params.num}`,
          date: `访问拦截器共计耗时:${Date.now() - now}ms`,
        })),
      )
      .pipe(
        tap(res => {
          console.log(res); // 查看输出结果
          console.log(`After... ${Date.now() - now}ms`);
        }),
      );
  }
}
