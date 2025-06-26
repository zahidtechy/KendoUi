import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../types/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-component-grid',
  standalone: true,
  imports: [],
  templateUrl: './component-grid.component.html',
  styleUrl: './component-grid.component.css'
})
export class ComponentGridComponent implements OnInit, AfterViewInit, OnDestroy {

  users: User[] = [];

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    // Initialization logic can go here
  }

  ngAfterViewInit(): void {
    // Fetch users after the view has been initialized
    this.getUsers();
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

  // Additional methods and properties can be added as needed

  ngOnDestroy(): void {

  }
}
