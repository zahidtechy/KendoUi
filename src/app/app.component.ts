import { Component } from '@angular/core';

import { KENDO_DATEINPUTS } from '@progress/kendo-angular-dateinputs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KENDO_DATEINPUTS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'KendoUi';
}
