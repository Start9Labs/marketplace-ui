import { Injectable } from '@angular/core'
import { ApiService } from './api/api.service'
import { MarketplaceData, Pkg } from './api/api.types'

@Injectable({
  providedIn: 'root',
})
export class MarketplaceService {
  data: MarketplaceData
  pkgs: Pkg[] = []

  constructor(
    private readonly marketplaceApi: ApiService,
  ) { }

  async load (): Promise<void> {
    const [data, pkgs] = await Promise.all([
      this.marketplaceApi.getData({ }),
      this.getPkgs(),
    ])
    this.data = data
    this.pkgs = pkgs
  }

  async getPkgs () : Promise<Pkg[]> {
    const pkgs = await this.marketplaceApi.getPkgs({
      page: String(1),
      'per-page': String(100),
    })

    return pkgs
  }

  async getPkg (id: string, version?: string): Promise<Pkg> {
    const pkgs = await this.marketplaceApi.getPkgs({
      ids: [{ id, version: version || '*' }],
    })
    const pkg = pkgs.find(pkg => pkg.manifest.id == id)

    if (!pkg) {
      throw new Error(`No results for ${id}${version ? ' ' + version : ''}`)
    } else {
      return pkg
    }
  }
}
