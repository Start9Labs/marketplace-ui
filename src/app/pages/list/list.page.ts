import { Component, ViewChild } from '@angular/core'
import { Pkg } from 'src/app/services/api/api.types'
import { MarketplaceService } from 'src/app/services/marketplace.service'
import { IonContent } from '@ionic/angular'
import Fuse from 'fuse.js/dist/fuse.min.js'
import config from '../../../../config.json'

const defaultOps = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  includeMatches: false,
  findAllMatches: false,
  minMatchCharLength: 1,
  location: 0,
  threshold: 0.6,
  distance: 100,
  useExtendedSearch: false,
  ignoreLocation: false,
  ignoreFieldNorm: false,
  keys: [
    'manifest.id',
    'manifest.title',
    'manifest.description.short',
    'manifest.description.long',
  ],
}

@Component({
  selector: 'list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage {
  @ViewChild(IonContent) content: IonContent

  pkgs: Pkg[] = []
  categories: string[]
  category = 'featured'
  query: string
  loading = true
  registryUrl = config.url

  constructor (
    private readonly marketplaceService: MarketplaceService,
  ) { }

  async ngOnInit () {
    try {
      if (!this.marketplaceService.pkgs.length) {
        await this.marketplaceService.load()
      }

      // default category (defined on class) should start as first item in array
      // remove here then add at beginning
      const filterdCategories = this.marketplaceService.data.categories.filter(cat => this.category !== cat)
      this.categories = [this.category].concat(filterdCategories).concat(['all'])

      this.filterPkgs()

    } catch (e) {
      console.error(e)
    } finally {
      this.loading = false
    }
  }

  ngAfterViewInit () {
    this.content.scrollToPoint(undefined, 1)
  }

  async search (): Promise<void> {
    if (this.query) {
      this.category = undefined
    }
    await this.filterPkgs()
  }

  async switchCategory (category: string): Promise<void> {
    this.category = category
    this.query = undefined
    this.filterPkgs()
  }

  private async filterPkgs (): Promise<void> {
    if (this.query) {
      const fuse = new Fuse(this.marketplaceService.pkgs, defaultOps)
      this.pkgs = fuse.search(this.query).map(p => p.item)

    } else {
      const pkgsToSort = this.marketplaceService.pkgs.filter(p => {
        return this.category === 'all' || p.categories.includes(this.category)
      })

      const fuse = new Fuse(pkgsToSort, { ...defaultOps, threshold: 1 })
      this.pkgs = fuse.search(this.category !== 'all' ? this.category || '' : 'bit').map(p => p.item)
    }
  }
}
