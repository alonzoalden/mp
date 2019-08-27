import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSortModule, MatMenuModule, MatButtonModule, MatDatepickerModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ToolModule } from '../shared/tool/tool.module';

import { SalesOrderComponent } from './sales-order.component';
import { SalesOrderViewCancelShellComponent } from './containers/sales-order-view-shell/sales-order-view-cancel-shell/sales-order-view-cancel-shell.component';
import { SalesOrderViewShellComponent } from './containers/sales-order-view-shell/sales-order-view-shell.component';
import { SalesOrderViewDetailShellComponent } from './containers/sales-order-view-shell/sales-order-view-detail-shell/sales-order-view-detail-shell.component';
import { SalesOrderListShellComponent } from './containers/sales-order-list-shell/sales-order-list-shell.component';
import { SalesOrderFulfillmentShellComponent } from './containers/sales-order-view-shell/sales-order-view-fulfillment-shell/sales-order-view-fulfillment-shell.component';
import { SalesOrderFulfillmentAddShellComponent } from './containers/sales-order-view-shell/sales-order-view-fulfillment-shell/sales-order-view-fullfillment-add-shell/sales-order-view-fulfillment-add-shell.component';
import { SalesOrderFulfillmentEditShellComponent } from './containers/sales-order-view-shell/sales-order-view-fulfillment-shell/sales-order-view-fullfillment-edit-shell/sales-order-view-fulfillment-edit-shell.component';
import { SalesOrderFulfillmentListShellComponent } from './containers/sales-order-view-shell/sales-order-view-fulfillment-shell/sales-order-view-fullfillment-list-shell/sales-order-view-fulfillment-list-shell.component';
import { SalesOrderListComponent } from './components/sales-order-list/sales-order-list.component';

import { SalesOrderDetailComponent, SalesOrderCancelComponentPrintDialog } from './components/sales-order-view/sales-order-view-detail/sales-order-view-detail.component';
import { SalesOrderViewComponent } from './components/sales-order-view/sales-order-view.component';
import { SalesOrderCancelComponent } from './components/sales-order-view/sales-order-view-cancel/sales-order-view-cancel.component';
//import { SalesOrderFulfillmentComponent } from './components/sales-order-view/sales-order-view-fulfillment/sales-order-view-fulfillment.component';
import { SalesOrderFulfillmentListComponent } from './components/sales-order-view/sales-order-view-fulfillment/sales-order-view-fullfillment-list/sales-order-view-fulfillment-list.component';
import { SalesOrderFulfillmentAddComponent } from './components/sales-order-view/sales-order-view-fulfillment/sales-order-view-fullfillment-add/sales-order-view-fulfillment-add.component';
import { SalesOrderFulfillmentEditComponent } from './components/sales-order-view/sales-order-view-fulfillment/sales-order-view-fullfillment-edit/sales-order-view-fulfillment-edit.component';

import { SalesOrderService } from './sales-order.service';

import { salesorderRouting } from './sales-order.routing';
import { TranslateModule } from '@ngx-translate/core';
import { salesOrderReducer } from './state/sales-order.reducer';
import { SalesOrderEffects } from './state/sales-order.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    declarations: [
        SalesOrderComponent,
        SalesOrderViewShellComponent,
        SalesOrderViewCancelShellComponent,
        SalesOrderListShellComponent,
        SalesOrderViewDetailShellComponent,
        SalesOrderDetailComponent,
        SalesOrderFulfillmentShellComponent,
        SalesOrderFulfillmentAddShellComponent,
        SalesOrderFulfillmentEditShellComponent,
        SalesOrderFulfillmentListShellComponent,
        SalesOrderViewComponent,
        SalesOrderListComponent,
        SalesOrderDetailComponent,
        SalesOrderCancelComponent,
        //SalesOrderFulfillmentComponent,
        SalesOrderFulfillmentListComponent,
        SalesOrderFulfillmentAddComponent,
        SalesOrderFulfillmentEditComponent,
        SalesOrderCancelComponentPrintDialog
    ],
    entryComponents: [SalesOrderCancelComponentPrintDialog],
    imports: [
        TranslateModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        CdkTableModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatMenuModule,
        MatButtonModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatDialogModule,
        ToolModule,
        salesorderRouting,
        StoreModule.forFeature('SalesOrder', salesOrderReducer),
        EffectsModule.forFeature([SalesOrderEffects])
    ],
    providers: [
        SalesOrderService
    ]
})

export class SalesOrderModule { }
