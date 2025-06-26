import { Component, OnInit } from '@angular/core';
import { KENDO_INPUTS } from "@progress/kendo-angular-inputs";
import { KENDO_BUTTONS } from "@progress/kendo-angular-buttons";
import { KENDO_LABEL } from "@progress/kendo-angular-label"
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [KENDO_INPUTS, KENDO_BUTTONS, KENDO_LABEL, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit(): void {
    const userName = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    if (this.form.valid) {
      if (userName === 'admin' && password === '1234') {

      }
    }
  }

}
