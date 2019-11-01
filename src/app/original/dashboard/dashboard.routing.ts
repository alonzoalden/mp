import { Routes, RouterModule } from '@angular/router';
import { DashboardMainShellComponent } from './containers/dashboard-main-shell/dashboard-main-shell.component';

const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        component: DashboardMainShellComponent
    }
];

export const dashboardRouting = RouterModule.forChild(DASHBOARD_ROUTES);
