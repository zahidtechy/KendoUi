import { Routes } from '@angular/router';
import { BlankComponent } from './shared/layouts/blank/blank.component';
import { MainComponent } from './shared/layouts/main/main.component';
import { authGuard } from './shared/auth/auth.guard';

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
    },
    {
        path: '',
        component: MainComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'user',
                loadComponent: () => import('./features/user/user.component').then(m => m.UserComponent),
                loadChildren: () => import('./features/user/user.routes').then(m => m.routes)
            }
        ]
    }
];
