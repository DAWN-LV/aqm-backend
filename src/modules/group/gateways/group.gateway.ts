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

  create(data: { id: number }) {
    this.server.emit('GROUP', { type: 'CREATE', data})
  }

  update(data: { id: number }) {
    this.server.emit('GROUP', { type: 'UPDATE', data })
  }

  delete(data: { id: number }) {
    this.server.emit('GROUP', { type: 'DELETE', data })
  }
}
