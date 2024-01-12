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

  create(data: { id: number }) {
    this.server.emit('SENSOR', { type: "CREATE", data })
  }

  update(data: { id: number }) {
    this.server.emit('SENSOR', { type: "UPDATE", data })
  }

  delete(data: { id: number }) {
    this.server.emit('SENSOR', { type: "DELETE", data })
  }

  // updateData(data: { [key: string]: { value: number, ts: number } }) {
  //   this.server.emit('SENSOR', { type: "DATA:UPDATE", data })
  // }
}
