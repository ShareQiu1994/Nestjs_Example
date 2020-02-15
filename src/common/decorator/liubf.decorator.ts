//自定义装饰器
/* 
在 Node.js 的世界中，把属性值附加到 request 对象中是一种很常见的做法。
然后你可以在任何时候在路由处理程器（route handlers）中手动取到它们
*/
import { createParamDecorator } from '@nestjs/common';

export const Liubf = createParamDecorator((data: string, request) => {
  return {
    msg: data,
    timestamp: new Date().toISOString(),
    path: request.url,
  };
});
