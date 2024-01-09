import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets'
import { JwtService } from '@nestjs/jwt'
import { Socket } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class AppGateway implements OnGatewayConnection {
  constructor (private readonly jwtService: JwtService) {}
  
  async handleConnection(client: Socket, ...args: any[]) {
    try {
      const token = client.handshake.query.token as string
      const decoded = this.jwtService.verify(token)
      
      client.join(`${decoded.user.id}`)
    } catch (error) {
      client.disconnect()
    }
  }
}
