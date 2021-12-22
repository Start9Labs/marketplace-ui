import { Component, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AlertController, IonContent, ModalController } from '@ionic/angular'
import { Emver } from 'src/app/services/emver.service'
import { displayEmver } from 'src/app/pipes/emver.pipe'
import { MarketplaceService } from 'src/app/services/marketplace.service'
import { MarkdownPage } from 'src/app/modals/markdown/markdown.page'
import { Pkg } from 'src/app/services/api/api.types'

@Component({
  selector: 'show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage {
  @ViewChild(IonContent) content: IonContent
  error = ''
  loading = true
  pkgId: string
  pkg: Pkg

  constructor (
    private readonly route: ActivatedRoute,
    private readonly alertCtrl: AlertController,
    private readonly modalCtrl: ModalController,
    private readonly emver: Emver,
    private readonly marketplaceService: MarketplaceService,
  ) { }

  async ngOnInit () {
    this.pkgId = this.route.snapshot.paramMap.get('pkgId')

    try {
      if (!this.marketplaceService.pkgs.length) {
        await this.marketplaceService.load()
      }
      this.pkg = this.marketplaceService.pkgs.find(pkg => pkg.manifest.id === this.pkgId)
      if (!this.pkg) {
        throw new Error(`Service with ID "${this.pkgId}" not found.`)
      }
    } catch (e) {
      this.error = e.message
      console.error(e)
    } finally {
      this.loading = false
    }
  }

  ngAfterViewInit () {
    this.content.scrollToPoint(undefined, 1)
  }

  async presentAlertVersions () {
    const alert = await this.alertCtrl.create({
      header: 'Versions',
      inputs: this.pkg.versions.sort((a, b) => -1 * this.emver.compare(a, b)).map(v => {
        return {
          name: v, // for CSS
          type: 'radio',
          label: displayEmver(v), // appearance on screen
          value: v, // literal SEM version value
          checked: this.pkg.manifest.version === v,
        }
      }),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Ok',
          handler: (version: string) => {
            this.getPkg(version)
          },
          cssClass: 'enter-click',
        },
      ],
    })

    await alert.present()
  }

  async presentModalMd (title: string) {
    const modal = await this.modalCtrl.create({
      componentProps: {
        title,
        contentUrl: this.pkg[title],
      },
      component: MarkdownPage,
    })

    await modal.present()
  }

  private async getPkg (version: string): Promise<void> {
    this.loading = true

    try {
      this.pkg = await this.marketplaceService.getPkg(this.pkgId, version)
    } catch (e) {
      this.error = e.message
      console.error(e)
    } finally {
      this.loading = false
    }
  }
}
