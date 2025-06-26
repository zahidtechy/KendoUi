import { Component, OnDestroy, OnInit } from '@angular/core';
import { KENDO_INPUTS } from "@progress/kendo-angular-inputs";
import { KENDO_BUTTONS } from "@progress/kendo-angular-buttons";
import { KENDO_LABEL } from "@progress/kendo-angular-label"
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'login',
  standalone: true,
  imports: [KENDO_INPUTS, KENDO_BUTTONS, KENDO_LABEL, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  private _destroy: Subject<void> = new Subject<void>();

  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit(): void {
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    if (this.form.valid) {
      this.authService.login(email, password)
        .pipe(takeUntil(this._destroy))
        .subscribe(
          {
            next: (response) => {
              this.authService.isLoggedIn();
              this.router.navigate(['/dashboard']);
            },
            error: (error) => {
              console.error('Login failed', error);
              // Handle login error, e.g., show a notification
            }
          }
        );
    }
  }

  ngOnDestroy(): void {
    // Cleanup if necessary
    this._destroy.next();
    this._destroy.unsubscribe();
  }

}
