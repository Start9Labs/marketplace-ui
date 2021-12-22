import { Component, Input } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { ApiService } from 'src/app/services/api/api.service'

@Component({
  selector: 'markdown',
  templateUrl: './markdown.page.html',
  styleUrls: ['./markdown.page.scss'],
})
export class MarkdownPage {
  @Input() contentUrl: string
  @Input() title: string
  content: string
  loading = true

  constructor (
    private readonly modalCtrl: ModalController,
    private readonly api: ApiService,
  ) { }

  async ngOnInit () {
    try {
      this.content = await this.api.getStatic(this.contentUrl)
    } catch (e) {
      console.error(e)
    } finally {
      this.loading = false
    }
  }

  async dismiss () {
    return this.modalCtrl.dismiss(true)
  }
}
