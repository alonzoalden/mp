import { Routes, RouterModule } from '@angular/router';

import { SalesOrderComponent } from './sales-order.component';
import { SalesOrderViewCancelShellComponent } from './sales-order-view/sales-order-view-cancel/containers/sales-order-view-cancel-shell.component';

import { SalesOrderViewDetailShellComponent } from './sales-order-view/sales-order-view-detail/containers/sales-order-view-detail-shell.component';
import { SalesOrderViewShellComponent } from './sales-order-view/containers/sales-order-view-shell.component';
import { SalesOrderListShellComponent } from './sales-order-list/containers/sales-order-list-shell.component';
import { componentFactoryName } from '@angular/compiler';

import { SalesOrderFulfillmentAddShellComponent } from './sales-order-view/sales-order-view-fulfillment/sales-order-view-fullfillment-add/containers/sales-order-view-fulfillment-add-shell.component';
import { SalesOrderFulfillmentEditShellComponent } from './sales-order-view/sales-order-view-fulfillment/sales-order-view-fullfillment-edit/containers/sales-order-view-fulfillment-edit-shell.component';
import { SalesOrderFulfillmentListShellComponent } from './sales-order-view/sales-order-view-fulfillment/sales-order-view-fullfillment-list/containers/sales-order-view-fulfillment-list-shell.component';

const SALESORDER_ROUTES: Routes = [
    {
        path: '',
        component: SalesOrderComponent,
        children: [ {
                path: '',
                component: SalesOrderListShellComponent
            },
            {
                path: ':id/cancellation',
                component: SalesOrderViewCancelShellComponent
            },
            {
                path: ':fulfilledby/status/:status',
                component: SalesOrderListShellComponent,
                pathMatch: 'full'            
            },
            
            // {
            //     path: ':fulfilledby/:id/detail',
            //     component: SalesOrderDetailComponent
            // },
            // {
            //     path: ':fulfilledby/:id/fulfillment',
            //     component: SalesOrderFulfillmentListComponent
            // },
            // {
            //     path: ':fulfilledby/:id/fulfillment/add',
            //     component: SalesOrderFulfillmentAddComponent
            // },
            // {
            //     path: ':fulfilledby/:id/fulfillment/edit/:fulfillmentid',
            //     component: SalesOrderFulfillmentEditComponent
            // }

            {
                path: 'view/:fulfilledby/:id',
                component: SalesOrderViewShellComponent,
                children: [
                    {
                        path: 'detail',
                        component: SalesOrderViewDetailShellComponent
                    },
                    {
                        path: 'fulfillment',
                        component: SalesOrderFulfillmentListShellComponent
                    },
                    {
                        path: 'fulfillment/add',
                        component: SalesOrderFulfillmentAddShellComponent
                    },
                    {
                        path: 'fulfillment/edit/:fulfillmentid',
                        component: SalesOrderFulfillmentEditShellComponent
                    }
                ]
            },
        ]
    },    
];

export const salesorderRouting = RouterModule.forChild(SALESORDER_ROUTES);
