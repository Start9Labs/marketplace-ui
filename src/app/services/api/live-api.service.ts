import { Injectable } from '@angular/core'
import { HttpService, Method } from '../http.service'
import { ApiService } from './api.service'
import * as Types from './api.types'

@Injectable()
export class LiveApiService implements ApiService {

  constructor (
    private readonly http: HttpService,
  ) { }

  async getStatic (url: string): Promise<string> {
    return this.http.request({
      method: Method.GET,
      relativeUrl: url,
      responseType: 'text',
    })
  }

  async getData (params: Types.GetDataReq): Promise<Types.GetDataRes> {
    return this.http.request<Types.GetDataRes>({
      method: Method.GET,
      relativeUrl: '/package/v0/info',
      params,
    })
  }

  async getPkgs (params: Types.GetPackagesReq): Promise<Types.GetPackagesRes> {
    return this.http.request<Types.GetPackagesRes>({
      method: Method.GET,
      relativeUrl: '/package/v0/index',
      params: {
        ...params,
        ids: JSON.stringify(params.ids),
      },
    })
  }
}
