import { Routes, RouterModule } from '@angular/router';

import { AdminShellComponent } from './containers/admin-shell/admin-shell.component';
import { AdminMemberListComponent } from './components/admin-member-list/admin-member-list.component';
import { AdminMemberAddComponent } from './components/admin-member-add/admin-member-add.component';
import { AdminMemberEditComponent } from './components/admin-member-edit/admin-member-edit.component';

import { AuthGuard } from '../auth/auth.guard';
import { componentFactoryName } from '@angular/compiler';

const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminShellComponent,
        children: [ {
                path: '',
                component: AdminMemberListComponent
            },
            {
                path: 'member-add',
                component: AdminMemberAddComponent
            },
            {
                path: ':id/member-edit',
                component: AdminMemberEditComponent
            } ]
    }
];

export const adminRouting = RouterModule.forChild(ADMIN_ROUTES);
