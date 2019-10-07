import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSortModule, MatMenuModule, MatButtonModule, MatDatepickerModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ToolModule } from '../shared/tool/tool.module';
import { SalesOrderComponent } from './sales-order.component';
import { SalesOrderViewCancelShellComponent } from './sales-order-view/sales-order-view-cancel/containers/sales-order-view-cancel-shell.component';
import { SalesOrderViewShellComponent } from './sales-order-view/containers/sales-order-view-shell.component';
import { SalesOrderViewDetailShellComponent } from './sales-order-view/sales-order-view-detail/containers/sales-order-view-detail-shell.component';
import { SalesOrderListShellComponent } from './sales-order-list/containers/sales-order-list-shell.component';
import { SalesOrderFulfillmentShellComponent } from './sales-order-view/sales-order-view-fulfillment/containers/sales-order-view-fulfillment-shell.component';
import { SalesOrderFulfillmentAddShellComponent } from './sales-order-view/sales-order-view-fulfillment/sales-order-view-fullfillment-add/containers/sales-order-view-fulfillment-add-shell.component';
import { SalesOrderFulfillmentEditShellComponent } from './sales-order-view/sales-order-view-fulfillment/sales-order-view-fullfillment-edit/containers/sales-order-view-fulfillment-edit-shell.component';
import { SalesOrderFulfillmentListShellComponent } from './sales-order-view/sales-order-view-fulfillment/sales-order-view-fullfillment-list/containers/sales-order-view-fulfillment-list-shell.component';
import { SalesOrderListComponent } from './sales-order-list/components/sales-order-list.component';
import { SalesOrderDetailComponent, SalesOrderCancelComponentPrintDialog, SalesOrderOpenBocComponentDialog } from './sales-order-view/sales-order-view-detail/components/sales-order-view-detail.component';
import { SalesOrderViewComponent } from './sales-order-view/components/sales-order-view.component';
import { SalesOrderCancelComponent } from './sales-order-view/sales-order-view-cancel/components/sales-order-view-cancel.component';
import { SalesOrderFulfillmentListComponent } from './sales-order-view/sales-order-view-fulfillment/sales-order-view-fullfillment-list/components/sales-order-view-fulfillment-list.component';
import { SalesOrderFulfillmentAddComponent } from './sales-order-view/sales-order-view-fulfillment/sales-order-view-fullfillment-add/components/sales-order-view-fulfillment-add.component';
import { SalesOrderFulfillmentEditComponent } from './sales-order-view/sales-order-view-fulfillment/sales-order-view-fullfillment-edit/components/sales-order-view-fulfillment-edit.component';
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
        SalesOrderFulfillmentListComponent,
        SalesOrderFulfillmentAddComponent,
        SalesOrderFulfillmentEditComponent,
        SalesOrderCancelComponentPrintDialog,
        SalesOrderOpenBocComponentDialog
    ],
    entryComponents: [SalesOrderCancelComponentPrintDialog, SalesOrderOpenBocComponentDialog],
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
