import { Component } from '@angular/core';
import { KENDO_LAYOUT, KENDO_PANELBAR } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KENDO_LAYOUT,KENDO_PANELBAR],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'KendoUi';
}
