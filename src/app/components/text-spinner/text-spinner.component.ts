import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-text-spinner',
  templateUrl: './text-spinner.component.html',
  styleUrls: ['./text-spinner.component.scss'],
})
export class TextSpinnerComponent {
  @Input() text: string
}
