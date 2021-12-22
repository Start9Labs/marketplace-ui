import { HttpService } from '../http.service'
import { LiveApiService } from './live-api.service'
import { MockApiService } from './mock-api.service'

const useMocks = require('../../../../config.json').useMocks

export function ApiServiceFactory (http: HttpService) {
  if (useMocks) {
    return new MockApiService()
  } else {
    return new LiveApiService(http)
  }
}