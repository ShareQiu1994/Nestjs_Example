import { Module } from '@nestjs/common';
import { EventsGateway } from './socket.gateway';

@Module({
  providers: [EventsGateway],
})
export class SocketModule {}
