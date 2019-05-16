import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminMemberListComponent } from './admin-member-list/admin-member-list.component';
import { AdminMemberAddComponent } from './admin-member-add/admin-member-add.component';
import { AdminMemberEditComponent } from './admin-member-edit/admin-member-edit.component';

import { AuthGuard } from '../auth/auth.guard';
import { componentFactoryName } from '@angular/compiler';

const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminComponent,
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
