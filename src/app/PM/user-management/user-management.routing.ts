import {RouterModule, Routes} from '@angular/router';
import {UsermanagementMemberVendorShellComponent} from './container/usermanagement-membervendor-shell/usermanagement-membervendor-shell.component';
import {UserManagementComponent} from './user-management.component';
import {PMSuperAdminAuthGuard} from '../guard/pm.guard';

const USER_ROUTES: Routes = [
    {
        path: '',
        component: UserManagementComponent,
        children: [
            {
                path: 'vendor', component: UsermanagementMemberVendorShellComponent,
                canActivate: [PMSuperAdminAuthGuard]
            },
            // {
            //     path: 'member', component: UsermanagementMemberVendorShellComponent,
            //     canActivate: [PMSuperAdminAuthGuard]
            // }
        ]
    }
];

export const userManagementRouting = RouterModule.forChild(USER_ROUTES);
