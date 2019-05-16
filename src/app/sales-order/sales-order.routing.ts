import { Routes, RouterModule } from '@angular/router';

import { SalesOrderComponent } from './sales-order.component';
import { SalesOrderViewComponent } from './sales-order-view/sales-order-view.component';
import { SalesOrderListComponent } from './sales-order-list/sales-order-list.component';
import { SalesOrderDetailComponent } from './sales-order-view/sales-order-view-detail/sales-order-view-detail.component';
import { SalesOrderCancelComponent } from './sales-order-view/sales-order-view-cancel/sales-order-view-cancel.component';
import { componentFactoryName } from '@angular/compiler';
import { SalesOrderFulfillmentComponent } from './sales-order-view/sales-order-view-fulfillment/sales-order-view-fulfillment.component';
import { SalesOrderFulfillmentAddComponent } from './sales-order-view/sales-order-view-fulfillment/sales-order-view-fulfillment-add.component';
import { SalesOrderFulfillmentEditComponent } from './sales-order-view/sales-order-view-fulfillment/sales-order-view-fulfillment-edit.component';
import { SalesOrderFulfillmentListComponent } from './sales-order-view/sales-order-view-fulfillment/sales-order-view-fulfillment-list.component';

const SALESORDER_ROUTES: Routes = [
    {
        path: '',
        component: SalesOrderComponent,
        children: [ {
                path: '',
                component: SalesOrderListComponent
            },
            {
                path: ':id/cancellation',
                component: SalesOrderCancelComponent
            },
            {
                path: ':fulfilledby/status/:status',
                component: SalesOrderListComponent,
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
                component: SalesOrderViewComponent,
                children: [
                    {
                        path: 'detail',
                        component: SalesOrderDetailComponent
                    },
                    {
                        path: 'fulfillment',
                        component: SalesOrderFulfillmentListComponent
                    },
                    {
                        path: 'fulfillment/add',
                        component: SalesOrderFulfillmentAddComponent
                    },
                    {
                        path: 'fulfillment/edit/:fulfillmentid',
                        component: SalesOrderFulfillmentEditComponent
                    }
                ]
            },
        ]
    },    
];

export const salesorderRouting = RouterModule.forChild(SALESORDER_ROUTES);
