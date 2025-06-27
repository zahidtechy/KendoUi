import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User } from '../../types/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from "@angular/common";
import { KENDO_CHARTS } from "@progress/kendo-angular-charts";
import {
  DataBindingDirective,
  KENDO_GRID,
  KENDO_GRID_EXCEL_EXPORT,
  KENDO_GRID_PDF_EXPORT,
} from "@progress/kendo-angular-grid";
import { KENDO_INPUTS } from "@progress/kendo-angular-inputs";
import { process } from "@progress/kendo-data-query";
import { SVGIcon, fileExcelIcon, filePdfIcon } from "@progress/kendo-svg-icons";
import { employees } from '../../types/employee';
import { images } from '../../types/images';

@Component({
  selector: 'app-component-grid',
  standalone: true,
  imports: [
    CommonModule,
    KENDO_GRID,
    KENDO_CHARTS,
    KENDO_INPUTS,
    KENDO_GRID_PDF_EXPORT,
    KENDO_GRID_EXCEL_EXPORT],
  templateUrl: './component-grid.component.html',
  styleUrl: './component-grid.component.css'
})
export class ComponentGridComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  public gridData: unknown[] = employees;
  public gridView: unknown[] = [];

  public mySelection: string[] = [];
  public pdfSVG: SVGIcon = filePdfIcon;
  public excelSVG: SVGIcon = fileExcelIcon;
  users: User[] = [];

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    // Initialization logic can go here
  }

  ngAfterViewInit(): void {
    // Fetch users after the view has been initialized
    this.gridView = this.gridData;
    //this.getUsers();
  }

  getUsers(page: number = 1): void {
    this.userService.gets(page)
      .subscribe({
        next: (response) => {
          this.users = response.data;
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      });
  }

  public onFilter(value: Event): void {
    const inputValue = value;

    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "full_name",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "job_title",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "budget",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "phone",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "address",
            operator: "contains",
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }

  public photoURL(dataItem: { img_id: string; gender: string }): string {
    const code: string = dataItem.img_id + dataItem.gender;
    const image: { [Key: string]: string } = images;

    return image[code];
  }

  public flagURL(dataItem: { country: string }): string {
    const code: string = dataItem.country;
    const image: { [Key: string]: string } = images;

    return image[code];
  }

  // Additional methods and properties can be added as needed

  ngOnDestroy(): void {

  }
}
