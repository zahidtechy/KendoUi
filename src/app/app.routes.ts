import { Routes } from '@angular/router';
import { BlankComponent } from './shared/layouts/blank/blank.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        component: BlankComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
            }
        ]
    }
];
