import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = new Date().getTime();
    res.on('finish', () => {
      const endTime = new Date().getTime();
      console.log(
        `${req.method}请求 ${req.url} 状态码: ${
          res.statusCode
        }：总耗时: ${endTime - startTime} ms`,
      );
    });

    return next();
  }
}
