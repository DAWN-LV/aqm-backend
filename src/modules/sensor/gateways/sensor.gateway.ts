import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: 'http://40.68.14.121:5173',
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
