import { Injectable, Global } from '@nestjs/common'
import { Options, mande } from 'mande'

@Global()
@Injectable()
export class HttpService {
  public async post<T>(url: string, data?: any) {
    try {
      const formData = new FormData(data)
      const res = await mande(url).post<T>(formData)
      console.log("RESULT = ", res)
      return res
    } catch (error) {
      console.log("HTTP ERROR : " + error.message)
    }
  }
}
