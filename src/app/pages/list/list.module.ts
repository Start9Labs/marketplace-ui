import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { ListPage } from './list.page'
import { SharingModule } from 'src/app/modules/sharing.module'
import { FormsModule } from '@angular/forms'

const routes: Routes = [
  {
    path: '',
    component: ListPage,
  },
]

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharingModule,
  ],
  declarations: [ListPage],
})
export class ListPageModule { }
