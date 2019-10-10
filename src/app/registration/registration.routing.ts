import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration.component';

const REGISTRATION_ROUTES: Routes = [
    {
        path: '',
        component: RegistrationComponent
    }
];

export const registrationRouting = RouterModule.forChild(REGISTRATION_ROUTES);
