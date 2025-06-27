import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DrawerSelectEvent, KENDO_LAYOUT } from "@progress/kendo-angular-layout"
import { KENDO_BUTTONS } from "@progress/kendo-angular-buttons";
import {
  SVGIcon,
  calendarIcon,
  dashboardOutlineIcon,
  envelopeLinkIcon,
  menuIcon,
  starOutlineIcon,
  usersOutlineIcon,
} from "@progress/kendo-svg-icons";


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, KENDO_LAYOUT, KENDO_BUTTONS],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(private readonly router: Router) { }

  menuSvg: SVGIcon = menuIcon;

  items = [
    { text: "dashboard", svgIcon: dashboardOutlineIcon, selected: true, route: '/dashboard' },
    { separator: true },
    { text: "user", svgIcon: usersOutlineIcon, route: '/user' },
    { text: "Calendar", svgIcon: calendarIcon },
    { separator: true },
    { text: "Attachments", svgIcon: envelopeLinkIcon },
    { text: "Favourites", svgIcon: starOutlineIcon },
  ];

  public onSelect(ev: DrawerSelectEvent): void {
    const route = ev.item?.route;
    if (route) {
      this.router.navigate([route]);
    }
  }
}
