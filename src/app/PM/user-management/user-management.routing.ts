import {RouterModule, Routes} from '@angular/router';
import {UsermanagementMemberShellComponent} from './container/usermanagement-member-shell/usermanagement-member-shell.component';
import {UserManagementComponent} from './user-management.component';
import {PMSuperAdminAuthGuard} from '../guard/pm.guard';

const USER_ROUTES: Routes = [
    {
        path: '',
        component: UserManagementComponent,
        children: [
            {
                path: 'vendor', component: UsermanagementMemberShellComponent,
                canActivate: [PMSuperAdminAuthGuard]
            }
        ]
    }
];

export const userManagementRouting = RouterModule.forChild(USER_ROUTES);