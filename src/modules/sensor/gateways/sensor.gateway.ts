import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class SensorGateway {
  @WebSocketServer()
  server: Server

  create(userId: string, data: { id: number }) {
    this.server.to(userId).emit('SENSOR', { type: "CREATE", data })
  }

  update(userId: string, data: { id: number }) {
    this.server.to(userId).emit('SENSOR', { type: "UPDATE", data })
  }

  delete(userId: string, data: { id: number }) {
    this.server.to(userId).emit('SENSOR', { type: "DELETE", data })
  }

  updateData(data: { [key: string]: { value: number, ts: number } }) {
    this.server.emit('SENSOR', { type: "DATA:UPDATE", data })
  }
}
