import { Routes, RouterModule } from '@angular/router';

import { RegistrationComponent } from './registration.component';

import { AuthGuard } from '../auth/auth.guard';
import { componentFactoryName } from '@angular/compiler';


const REGISTRATION_ROUTES: Routes = [
    {
        path: '', 
        component: RegistrationComponent
    }   
];

export const registrationRouting = RouterModule.forChild(REGISTRATION_ROUTES);
