import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TextSpinnerComponent } from './text-spinner.component'
import { IonicModule } from '@ionic/angular'

@NgModule({
  declarations: [TextSpinnerComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [TextSpinnerComponent],
})
export class TextSpinnerComponentModule { }
