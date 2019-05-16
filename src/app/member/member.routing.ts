import { Routes, RouterModule } from '@angular/router';

import { MemberComponent } from './member.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberConfirmComponent } from './member-confirm/member-confirm.component';
import { MemberInviteComponent } from './member-invite/member-invite.component';
import { MemberRegistrationComponent } from './member-registration/member-registration.component';


import { AuthGuard } from '../auth/auth.guard';
import { componentFactoryName } from '@angular/compiler';


const MEMBER_ROUTES: Routes = [
    {
        path: '', 
        component: MemberComponent,
        children: [ {
                path: '',
                component: MemberListComponent
            },
            {
                path: 'invite',
                component: MemberInviteComponent
            },
            {
                path: 'registration',
                component: MemberRegistrationComponent
            },
            {
                path: 'confirm',
                component: MemberConfirmComponent
            } ]
    }   
];

export const memberRouting = RouterModule.forChild(MEMBER_ROUTES);
