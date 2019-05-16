import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSortModule, MatMenuModule, MatButtonModule, MatDatepickerModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ToolModule } from '../shared/tool/tool.module';

import { SalesOrderComponent } from './sales-order.component';
import { SalesOrderViewComponent } from './sales-order-view/sales-order-view.component';
import { SalesOrderListComponent } from './sales-order-list/sales-order-list.component';
import { SalesOrderDetailComponent, SalesOrderCancelComponentPrintDialog } from './sales-order-view/sales-order-view-detail/sales-order-view-detail.component';
import { SalesOrderCancelComponent } from './sales-order-view/sales-order-view-cancel/sales-order-view-cancel.component';
import { SalesOrderFulfillmentComponent } from './sales-order-view/sales-order-view-fulfillment/sales-order-view-fulfillment.component';
import { SalesOrderFulfillmentListComponent } from './sales-order-view/sales-order-view-fulfillment/sales-order-view-fulfillment-list.component';
import { SalesOrderFulfillmentAddComponent } from './sales-order-view/sales-order-view-fulfillment/sales-order-view-fulfillment-add.component';
import { SalesOrderFulfillmentEditComponent } from './sales-order-view/sales-order-view-fulfillment/sales-order-view-fulfillment-edit.component';

import { SalesOrderService } from './sales-order.service';

import { salesorderRouting } from './sales-order.routing';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        SalesOrderComponent,
        SalesOrderViewComponent,
        SalesOrderListComponent,
        SalesOrderDetailComponent,
        SalesOrderCancelComponent,
        SalesOrderFulfillmentComponent,
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
        salesorderRouting
    ],
    providers: [
        SalesOrderService
    ]
})

export class SalesOrderModule { }
