import * as Types from './api.types'

export abstract class ApiService {
  abstract getStatic (url: string): Promise<string>
  abstract getData (params: Types.GetDataReq): Promise<Types.GetDataRes>
  abstract getPkgs (params: Types.GetPackagesReq): Promise<Types.GetPackagesRes>
}