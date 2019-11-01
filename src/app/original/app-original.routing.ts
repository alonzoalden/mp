import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AppOriginalComponent } from './app-original.component';

const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    // {
    //     path: 'browser-invalid',
    //     component: BrowserCompatibilityComponent
    // },
    {
        path: '',
        component: AppOriginalComponent,
        canLoad: [ AuthGuard ],
        children: [
            {
                path: 'company', loadChildren: 'app/original/company/company.module#CompanyModule', canLoad: [ AuthGuard ]
            },
            {
                path: 'dashboard', loadChildren: 'app/original/dashboard/dashboard.module#DashboardModule', canLoad: [ AuthGuard ]
            },
            {
                path: 'member', loadChildren: 'app/original/member/member.module#MemberModule',
            },
            {
                path: 'admin', loadChildren: 'app/original/admin/admin.module#AdminModule',
            },
            {
                path: 'setting', loadChildren: 'app/original/setting/setting.module#SettingModule', canLoad: [ AuthGuard ]
            },
            {
                path: 'registration', loadChildren: 'app/registration/registration.module#RegistrationModule',
            },
            { path: 'item', loadChildren: 'app/original/item/item.module#ItemModule', canLoad: [ AuthGuard ] },
            { path: 'inbound-shipment', loadChildren: 'app/original/inbound-shipment/inbound-shipment.module#InboundShipmentModule', canLoad: [ AuthGuard ] },
            { path: 'sales-order', loadChildren: 'app/original/sales-order/sales-order.module#SalesOrderModule', canLoad: [ AuthGuard ] },
            {
                path: '**',
                redirectTo: 'home'
            }
        ]
    }
];

export const routing = RouterModule.forChild(APP_ROUTES);
