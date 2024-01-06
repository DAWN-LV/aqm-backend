import { Injectable, Global } from '@nestjs/common'
import { Options, mande } from 'mande'

@Global()
@Injectable()
export class HttpService {
  public async post<T>(url: string, data?: any, options?: Options<"json">) {
    try {
      return await mande(url).post<T>(data, options)
    } catch (error) {
      console.log("HTTP ERROR : " + error.message)
    }
  }
}
