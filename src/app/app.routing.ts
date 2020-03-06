import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { BrowserCompatibilityComponent } from './browser-compatibility/browser-compatibility.component';

const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'browser-invalid',
        component: BrowserCompatibilityComponent
    },
    {
        // Original App
        path: '', loadChildren: 'app/original/app-original.module#AppOriginalModule'
    },
    {
        // PM App
        path: 'PM', loadChildren: 'app/PM/pm.module#PMModule', canLoad: [ AuthGuard ]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
