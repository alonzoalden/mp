import { Routes, RouterModule } from '@angular/router';
import { AdminShellComponent } from './containers/admin-shell/admin-shell.component';
import { AdminMemberListShellComponent } from './containers/admin-member-list-shell/admin-member-list-shell.component';
import { AdminMemberAddShellComponent } from './containers/admin-member-add-shell/admin-member-add-shell.component';
import { AdminMemberEditShellComponent } from './containers/admin-member-edit-shell/admin-member-edit-shell.component';

const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminShellComponent,
        children: [ {
                path: '',
                component: AdminMemberListShellComponent
            },
            {
                path: 'member-add',
                component: AdminMemberAddShellComponent
            },
            {
                path: ':id/member-edit',
                component: AdminMemberEditShellComponent
            } ]
    }
];

export const adminRouting = RouterModule.forChild(ADMIN_ROUTES);
