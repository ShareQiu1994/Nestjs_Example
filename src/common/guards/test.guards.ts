import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';

//守卫
@Injectable()
export class TestGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}

function validateRequest(req) {
  // 获取请求体中的 req.params.num
  if (req.params.num % 2 === 0) {
    return true;
  }
  return false;
  // 只有参数num是偶数时 才通过守卫
}
