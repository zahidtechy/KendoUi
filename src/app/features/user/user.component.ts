import { Component, importProvidersFrom } from '@angular/core';
import { provideRouter, Route, RouterOutlet } from '@angular/router';
import { ComponentGridComponent } from './components/component-grid/component-grid.component';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {

}
