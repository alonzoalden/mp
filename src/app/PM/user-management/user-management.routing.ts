import {RouterModule, Routes} from '@angular/router';
import {UsermanagementShellComponent} from './container/usermanagement-shell/usermanagement-shell.component';
import {UserManagementComponent} from './user-management.component';

const USER_ROUTES: Routes = [
    {
        path: '',
        component: UserManagementComponent,
        children: [
            {
                path: 'list', component: UsermanagementShellComponent
            },
            {
                path: '**',
                redirectTo: 'list'
            }
        ]
    }
];

export const userManagementRouting = RouterModule.forChild(USER_ROUTES);
