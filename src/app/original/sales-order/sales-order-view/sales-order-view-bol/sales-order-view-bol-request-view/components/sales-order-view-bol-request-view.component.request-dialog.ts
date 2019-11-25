import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SalesOrderLine } from '../../../../../../shared/class/sales-order-line';
import { SalesOrder } from '../../../../../../shared/class/sales-order';
import { BOLRequest, BOLRequestLine } from '../../../../../../shared/class/bol-request';
import { SalesOrderService } from '../../../../sales-order.service';
import { environment } from '../../../../../../../environments/environment';
import * as fromSalesOrder from '../../../../state';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import * as fromCompany from '../../../../../company/company-info/state/';
import { CompanyInfo } from '../../../../../../shared/class/company-info';

@Component({
    selector: 'sales-order-view-bol-request-view.component-request-dialog',
    templateUrl: './sales-order-view-bol-request-view.component-request-dialog.html',
})

export class SalesOrderViewBOLRequestViewComponentDialog implements OnInit {
    errorMessage: string;
    fulfilledby: string;
    orderid: number;
    salesOrder: SalesOrder;
    dataSource: MatTableDataSource<BOLRequestLine>;
    displayedColumns = ['Type', 'Weight', 'Dimensions', 'Pieces'];
    bolRequest: BOLRequest;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {salesorder: SalesOrder, orderid: number, bolRequest: BOLRequest },
        public dialogRef: MatDialogRef<SalesOrderViewBOLRequestViewComponentDialog>,
        private store: Store<fromSalesOrder.State>) {}

    ngOnInit() {
        this.bolRequest = this.data.bolRequest;
        this.orderid = this.data.orderid;
        this.refreshDataSource(this.bolRequest.BOLRequestLines);
        this.salesOrder = this.data.salesorder;
    }
    refreshDataSource(requestlines: BOLRequestLine[]) {
        this.dataSource = new MatTableDataSource<BOLRequestLine>(requestlines);
    }
    onCloseClick(): void {
        this.dialogRef.close();
    }
}
