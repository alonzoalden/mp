import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { RegistrationB2bComponent } from './registration-b2b.component';

const REGISTRATION_ROUTES: Routes = [
    {
        path: '',
        component: RegistrationComponent
    },
    {
        path: 'b2b',
        component: RegistrationB2bComponent
    }
];

export const registrationRouting = RouterModule.forChild(REGISTRATION_ROUTES);
