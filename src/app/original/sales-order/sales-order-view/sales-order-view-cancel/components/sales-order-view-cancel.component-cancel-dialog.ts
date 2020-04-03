import { Component, OnInit, ViewChild, OnDestroy, Inject, Output, Input, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SalesOrderLine } from '../../../../../shared/class/sales-order-line';
import { SalesOrder } from '../../../../../shared/class/sales-order';
import { SalesOrderService } from '../../../sales-order.service';
import { environment } from '../../../../../../environments/environment';
import * as salesOrderActions from '../../../state/sales-order.actions';
import * as fromSalesOrder from '../../../state';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';

export class SalesOrderCancelDialog {
    constructor(
        public Size: string,
        public Border: string
    ) {}
}
@Component({
    selector: 'sales-order-cancel.component-print-dialog',
    templateUrl: '../../sales-order-view-cancel/components/sales-order-view-cancel.component-cancel-dialog.html',
})

export class SalesOrderCancelComponentPrintDialog implements OnInit, OnDestroy {
    itemLabelPrintDialog: SalesOrderCancelDialog;
    errorMessage: string;
    fulfilledby: string;
    orderid: number;
    salesOrder: SalesOrder;
    hasCancellationQty: boolean = false;
    salesOrderLinesMatTable: MatTableDataSource<SalesOrderLine>;
    deliveryDetail: string;
    pendingCancel: boolean;
    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;

    dataSource: MatTableDataSource<any>;
    displayedColumns = ['ItemImage', 'ProductDetails', 'ProductInfo', 'CancellationReason'];
    componentActive: boolean = true;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: SalesOrder,
        public dialogRef: MatDialogRef<SalesOrderCancelComponentPrintDialog>,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<fromSalesOrder.State>,
        private salesorderService: SalesOrderService) {}

    ngOnInit() {
        this.salesOrder = this.data;
        this.orderid = this.data.OrderID;
        this.fulfilledby = 'merchant';

        //this.store.dispatch(new salesOrderActions.LoadSalesOrderLines({orderid: this.orderid, fulfilledby: this.fulfilledby}));
        this.store.pipe(
            select(fromSalesOrder.getSalesOrderLines),
            takeWhile(() => this.componentActive)
          ).subscribe(
            salesorderlines => {
                salesorderlines.forEach((salesorderline) => {
                    if (salesorderline.Quantity - salesorderline.FulfilledQuantity > 0) {
                        this.hasCancellationQty = true;
                    }
                });
                return this.salesOrderLinesMatTable = new MatTableDataSource<SalesOrderLine>(salesorderlines);
            }
          );
    }

    onCancel() {
        if (this.isValid()) {
            const confirmation = confirm(`Are you sure you want to cancel this order?`);
            if (confirmation) {
                this.pendingCancel = true;
                this.salesorderService.cancelSalesOrderLines(this.salesOrderLinesMatTable.data)
                    .pipe(takeWhile(() => this.componentActive))
                    .subscribe(
                        (data) => {
                            this.pendingCancel = false;
                            this.dialogRef.close(data);
                        },
                        (error) => {
                            this.pendingCancel = false;
                            this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: 'Error cancelling.' });
                        },
                    );
            }
        }
    }

    isValid() {
        let _ret = false;
        let _count = 0;

        this.salesOrderLinesMatTable.data.forEach((salesorderline) => {
            _count++;

            if (_count === 1) {
                _ret = true;
            }

            if (salesorderline.Quantity - salesorderline.FulfilledQuantity > 0 && !salesorderline.CancellationReason) {
                this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: 'Cancellation Reasons are required' });
                _ret = false;
            }
        });

        if (_count === 0) {
            this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: 'No Lines to cancel' });
        }

        return _ret;
    }
    onCloseClick(): void {
        this.dialogRef.close();
    }
    ngOnDestroy(): void {
        this.componentActive = false;
    }
}
