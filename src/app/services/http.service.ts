import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

const url = require('../../../config.json').url

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor (
    private readonly http: HttpClient,
  ) { }

  async request<T> (options: HttpOptions): Promise<T> {
    let { method, relativeUrl, params, ...rest } = options

    if (params) {
      Object.keys(params).forEach(key => {
        if (params![key] === undefined) {
          delete params![key]
        }
      })
    }

    return this.http.request(method, url + options.relativeUrl, {
      responseType: 'json',
      observe: 'events',
      reportProgress: false,
      withCredentials: false,
      ...rest,
    })
    .toPromise()
    .then(res => res.body)
    .catch((e: HttpErrorResponse) => { throw new RequestError(e) })
  }
}

class RequestError {
  code = this.e.status
  message = this.e.statusText
  details = this.e.message

  constructor (public e: HttpErrorResponse) { }
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
}

export interface HttpOptions {
  method: Method
  relativeUrl: string
  headers?: {
    [header: string]: string | string[]
  }
  params?: {
    [param: string]: string | string[]
  }
  responseType?: 'json' | 'text'
  body?: any
}
