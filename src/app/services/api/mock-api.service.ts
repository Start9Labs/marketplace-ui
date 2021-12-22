import { Injectable } from '@angular/core'
import { Mock } from './api.fixures'
import { ApiService } from './api.service'
import { pauseFor } from '../../util/misc'
import * as Types from './api.types'

@Injectable()
export class MockApiService implements ApiService {

  constructor () { }

  async getStatic (url: string): Promise<string> {
    await pauseFor(2000)
    return '**Hello** in _markdown_!'
  }

  async getData (params: Types.GetDataReq): Promise<Types.GetDataRes> {
    await pauseFor(2000)
    return {
      categories: ['featured', 'bitcoin', 'lightning', 'data', 'messaging', 'social', 'alt coin'],
    }
  }

  async getPkgs (params: Types.GetPackagesReq): Promise<Types.GetPackagesRes> {
    await pauseFor(2000)
    return Mock.MarketplacePkgsList
  }
}
