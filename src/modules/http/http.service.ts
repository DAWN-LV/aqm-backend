import { Injectable, Global } from '@nestjs/common'
import { Options, mande } from 'mande'

@Global()
@Injectable()
export class HttpService {
  public post<T>(url: string, data?: any, options?: Options<"json">) {
    return mande(url).post<T>(data, options)
  }
}
