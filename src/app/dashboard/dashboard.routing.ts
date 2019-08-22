import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardMainShellComponent } from './containers/dashboard-main-shell/dashboard-main-shell.component';

import { componentFactoryName } from '@angular/compiler';

const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        component: DashboardMainShellComponent,
        // children: [ {
        //     path: '',
        //     component: DashboardMainComponent
        // } ]
    }
];

export const dashboardRouting = RouterModule.forChild(DASHBOARD_ROUTES);
