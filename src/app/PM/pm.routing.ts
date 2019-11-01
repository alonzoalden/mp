import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {PMAuthGuard} from './guard/pm.guard';
import {BrowserCompatibilityComponent} from '../browser-compatibility/browser-compatibility.component';
import {PmComponent} from './pm.component';

const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '',
        component: PmComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: 'app/pm/dashboard-pm/dashboard-pm.module#DashboardPMModule',
                canLoad: [PMAuthGuard]
            },
            {
                path: 'item',
                loadChildren: 'app/pm/item-pm/item-pm.module#ItemPmModule',
                canLoad: [PMAuthGuard]
            },
            {
                path: 'sales-order',
                loadChildren: 'app/pm/sales-order-pm/sales-order-pm.module#SalesOrderPmModule',
                canLoad: [PMAuthGuard]
            },
            {
                path: 'inbound-shipment',
                loadChildren: 'app/pm/inbound-shipment-pm/inbound-shipment-pm.module#InboundShipmentPmModule',
                canLoad: [PMAuthGuard]
            },
            {
                path: 'setting',
                loadChildren: 'app/pm/setting-pm/setting-pm.module#SettingPmModule',
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
