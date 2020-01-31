import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  // 建立链接事件
  handleConnection(client: any) {
    console.log(
      '客户端(' + client.handshake.address + ')已与服务器建立socket.io链接...',
    );
  }

  // 断开连接事件
  handleDisconnect(client: any) {
    console.log(
      '客户端(' + client.handshake.address + ')已与服务器断开socket.io链接...',
    );
  }

  //接收客户端的数据
  @SubscribeMessage('events')
  handleEvent(client: any, data: any): Observable<WsResponse<any>> | any {
    // 输出客户端发送的数据
    console.log(JSON.stringify(data));

    // 给客户端发送数据
    this.server.emit('events', {
      event: 'events',
      data: {
        msg:
          'hello 这是服务器返回的数据! 接收到了客户端数据' +
          JSON.stringify(data),
      },
    });
  }
}
