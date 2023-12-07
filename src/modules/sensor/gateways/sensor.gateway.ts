import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
  }
})
export class SensorGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('')
  updateSensor(id: number) {
    this.server.emit('SENSOR', { type: "UPDATE", data: { id } })
  }
}
