import { NgModule } from '@angular/core'
import { EmverComparesPipe, EmverDisplayPipe } from '../pipes/emver.pipe'
import { MarkdownPipe } from '../pipes/markdown.pipe'
import { EmptyPipe } from '../pipes/empty.pipe'
import { TextSpinnerComponentModule } from '../components/text-spinner/text-spinner.component.module'

@NgModule({
  declarations: [
    EmverComparesPipe,
    EmverDisplayPipe,
    MarkdownPipe,
    EmptyPipe,
  ],
  imports: [
    TextSpinnerComponentModule,
  ],
  exports: [
    EmverComparesPipe,
    EmverDisplayPipe,
    MarkdownPipe,
    EmptyPipe,
    TextSpinnerComponentModule,
  ],
})
export class SharingModule { }