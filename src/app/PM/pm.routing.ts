import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {PMAuthGuard} from './guard/pm.guard';
import {BrowserCompatibilityComponent} from '../browser-compatibility/browser-compatibility.component';
import {PmComponent} from './pm.component';

const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: PmComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: 'app/PM/dashboard-pm/dashboard-pm.module#DashboardPMModule',
                canLoad: [PMAuthGuard]
            },
            {
                path: 'item',
                loadChildren: 'app/PM/item-pm/item-pm.module#ItemPmModule',
                canLoad: [PMAuthGuard]
            },
            {
                path: 'sales-order',
                loadChildren: 'app/PM/sales-order-pm/sales-order-pm.module#SalesOrderPmModule',
                canLoad: [PMAuthGuard]
            },
            {
                path: 'inbound-shipment',
                loadChildren: 'app/PM/inbound-shipment-pm/inbound-shipment-pm.module#InboundShipmentPmModule',
                canLoad: [PMAuthGuard]
            },
            {
                path: 'setting',
                loadChildren: 'app/PM/setting-pm/setting-pm.module#SettingPmModule',
                canLoad: [PMAuthGuard]
            },
            {
                path: 'report',
                loadChildren: 'app/PM/report-pm/report-pm.module#ReportPmModule',
                canLoad: [PMAuthGuard]
            },
            {
                path: 'user',
                loadChildren: 'app/PM/user-management/user-management.module#UserManagementModule',
                canLoad: [PMAuthGuard]
            },
            {
                path: 'payout',
                loadChildren: 'app/PM/payout-pm/payout-pm.module#PayoutPmModule',
                canLoad: [PMAuthGuard]
            },
            {
                path: '**',
                redirectTo: 'dashboard'
            }
        ]
    }
];

export const routing = RouterModule.forChild(APP_ROUTES);
