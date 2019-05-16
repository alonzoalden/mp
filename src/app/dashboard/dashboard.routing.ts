import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';

import { componentFactoryName } from '@angular/compiler';

const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [ {
            path: '',
            component: DashboardMainComponent
        } ]
    }
];

export const dashboardRouting = RouterModule.forChild(DASHBOARD_ROUTES);
