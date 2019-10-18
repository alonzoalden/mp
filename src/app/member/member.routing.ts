import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member.component';
import { MemberListShellComponent } from './containers/member-list-shell/member-list-shell.component';
import { MemberConfirmShellComponent } from './containers/member-confirm-shell/member-confirm-shell.component';
import { MemberInviteShellComponent } from './containers/member-invite-shell/member-invite-shell.component';
import { MemberRegistrationShellComponent } from './containers/member-registration-shell/member-registration-shell.component';


import { AuthGuard } from '../auth/auth.guard';
import { componentFactoryName } from '@angular/compiler';


const MEMBER_ROUTES: Routes = [
    {
        path: '',
        component: MemberComponent,
        children: [ {
                path: '',
                component: MemberListShellComponent
            },
            {
                path: 'invite',
                component: MemberInviteShellComponent
            },
            {
                path: 'registration',
                component: MemberRegistrationShellComponent
            },
            {
                path: 'confirm',
                component: MemberConfirmShellComponent
            } ]
    }
];

export const memberRouting = RouterModule.forChild(MEMBER_ROUTES);
