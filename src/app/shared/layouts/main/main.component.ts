import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DrawerItem, DrawerSelectEvent, KENDO_LAYOUT } from "@progress/kendo-angular-layout"
import { KENDO_BUTTONS } from "@progress/kendo-angular-buttons";
import {
  SVGIcon,
  bellIcon,
  calendarIcon,
  envelopeLinkIcon,
  inboxIcon,
  menuIcon,
  starOutlineIcon,
} from "@progress/kendo-svg-icons";


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, KENDO_LAYOUT, KENDO_BUTTONS],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  public selected = "Inbox";
  public menuSvg: SVGIcon = menuIcon;

  public items: Array<DrawerItem> = [
    { text: "Inbox", svgIcon: inboxIcon, selected: true },
    { separator: true },
    { text: "Notifications", svgIcon: bellIcon },
    { text: "Calendar", svgIcon: calendarIcon },
    { separator: true },
    { text: "Attachments", svgIcon: envelopeLinkIcon },
    { text: "Favourites", svgIcon: starOutlineIcon },
  ];

  public onSelect(ev: DrawerSelectEvent): void {
    this.selected = ev.item.text;
  }

}
