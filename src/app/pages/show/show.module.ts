import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { ShowPage } from './show.page'
import { SharingModule } from '../../modules/sharing.module'
import { MarkdownPageModule } from '../../modals/markdown/markdown.module'

const routes: Routes = [
  {
    path: '',
    component: ShowPage,
  },
]

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharingModule,
    MarkdownPageModule,
  ],
  declarations: [ShowPage],
})
export class ShowPageModule { }
