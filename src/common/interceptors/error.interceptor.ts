import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

//拦截器
@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      catchError(err => {
        // 异常捕获
        // console.log(err);
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            message: err.message,
          },
          403,
        );
      }),
    );
  }
}
