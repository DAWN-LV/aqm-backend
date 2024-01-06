import { Injectable, Global } from '@nestjs/common'
import { Options, mande } from 'mande'

@Global()
@Injectable()
export class HttpService {
  public async post<T>(url: string, data?: any) {
    try {
      const res = await mande(url).post<T>(data)
      console.log("RESULT = ", res)
      return res
    } catch (error) {
      console.log("HTTP ERROR : " + error.message)
    }
  }
}
