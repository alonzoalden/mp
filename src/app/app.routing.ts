import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyComponent } from './company/company.component';
import { BrowserCompatibilityComponent } from './browser-compatibility/browser-compatibility.component';

const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'browser-invalid',
        component: BrowserCompatibilityComponent
    },
    {
        path: 'company', loadChildren: 'app/company/company.module#CompanyModule', canLoad: [ AuthGuard ]
    },
    {
        path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canLoad: [ AuthGuard ]
    },
    {
        path: 'member', loadChildren: 'app/member/member.module#MemberModule',
    },
    {
        path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule',
    },
    {
        path: 'setting', loadChildren: 'app/setting/setting.module#SettingModule', canLoad: [ AuthGuard ]
    },
    {
        path: 'registration', loadChildren: 'app/registration/registration.module#RegistrationModule',
    },
    { path: 'item', loadChildren: 'app/item/item.module#ItemModule', canLoad: [ AuthGuard ] },
    { path: 'inbound-shipment', loadChildren: 'app/inbound-shipment/inbound-shipment.module#InboundShipmentModule', canLoad: [ AuthGuard ] },
    { path: 'sales-order', loadChildren: 'app/sales-order/sales-order.module#SalesOrderModule', canLoad: [ AuthGuard ] },
    {
        path: '**',
        redirectTo: 'home'
    }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
