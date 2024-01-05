import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class GroupGateway {
  @WebSocketServer()
  server: Server

  create(userId: string, data: { id: number }) {
    this.server.to(userId).emit('GROUP', { type: 'CREATE', data})
  }

  update(userId: string, data: { id: number }) {
    this.server.to(userId).emit('GROUP', { type: 'UPDATE', data })
  }

  delete(userId: string, data: { id: number }) {
    this.server.to(userId).emit('GROUP', { type: 'DELETE', data })
  }
}
