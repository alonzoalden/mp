import { Component, OnInit, ViewChild, OnDestroy, Inject, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SalesOrderLine } from '../../../../shared/class/sales-order-line';
import { SalesOrder } from '../../../../shared/class/sales-order';
import { SalesOrderService } from '../../../sales-order.service';
import { AppService } from '../../../../app.service';
import { environment } from '../../../../../environments/environment';
import { Member } from 'app/shared/class/member';
import * as salesOrderActions from '../../../state/sales-order.actions';
import * as fromSalesOrder from '../../../state';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'o-sales-order-detail',
  templateUrl: './sales-order-view-detail.component.html',
  styleUrls: ['../../../sales-order.component.css'] 
})

export class SalesOrderDetailComponent implements OnInit {
    @Input() userInfo: Member;
    @Input() deliveryDetail: string;
    @Input() salesOrder: SalesOrder;
    @Input() salesOrderLinesMatTable: MatTableDataSource<SalesOrderLine>;
    @Input() errorMessage: string;
    @Output() getFulfilledBySalesOrder = new EventEmitter<{orderid: number, fulfilledby: string}>();
    @Output() getSalesOrderLineByVendor = new EventEmitter<{orderid: number, fulfilledby: string}>();
    @Output() getFulfilledBySalesOrderDelivery = new EventEmitter<{orderid: number, fulfilledby: string}>();
    @Output() cancelSalesOrderLines = new EventEmitter<SalesOrderLine[]>();
    @Output() getSalesOrderByVendor = new EventEmitter<{fulfilledby: string, status: string}>();
    @Output() downloadSalesOrderPackingSlip = new EventEmitter<SalesOrder>();
    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;
    
    fulfilledby: string;
    orderid: number;
    // displayedColumns = ['ItemImage','ItemName', 'SKU', 'TPIN', 'Quantity', 'ShippedQty', 'MerchantStatus', 'UnitPrice', 'LineSubTotal'];
    displayedColumns = ['ItemImage', 'ProductDetails', 'Quantity', 'MerchantStatus', 'UnitPrice', 'LineSubTotal'];
    //dataSource: any = null;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    // salesorderline: SalesOrderLine;
    // deliveryDetail: string;
    // salesorder: SalesOrder;
    // salesorderlines: SalesOrderLine[];

    isMerchant: boolean;

    constructor(private route: ActivatedRoute,
        private salesorderService: SalesOrderService,
        public printDialog: MatDialog) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.salesOrderLinesMatTable && changes.salesOrderLinesMatTable.currentValue.data.length) {
            this.salesOrderLinesMatTable.paginator = this.paginator;
            this.salesOrderLinesMatTable.sort = this.sort;
        }
        if (changes.deliveryDetail && changes.deliveryDetail.currentValue) {
            this.deliveryDetail = changes.deliveryDetail.currentValue.trim().replace(new RegExp('<br />', 'g'), '\n');
        }
        if (changes.salesOrder && !changes.salesOrder.currentValue && changes.salesOrder.firstChange) {
            this.getFulfilledBySalesOrder.emit({orderid: this.route.parent.snapshot.params['id'], fulfilledby: this.route.parent.snapshot.params['fulfilledby']});
        }
        
    }
    ngOnInit() {
        this.orderid = this.route.parent.snapshot.params['id'];
        this.fulfilledby = this.route.parent.snapshot.params['fulfilledby'];
        if(this.fulfilledby == 'merchant') {
            this.isMerchant = true;
        }
        else {
            this.isMerchant = false;
        }
        this.getSalesOrderLineByVendor.emit({orderid: this.orderid, fulfilledby: this.fulfilledby});
        this.getFulfilledBySalesOrderDelivery.emit({orderid: this.orderid, fulfilledby: this.fulfilledby});
    }
    
    onPrintPackingSlip() {
        this.downloadSalesOrderPackingSlip.emit(this.salesOrder);
    }

    openDialogCancelOrder(salesorder) {
        const dialogRef = this.printDialog.open(SalesOrderCancelComponentPrintDialog, {
            data: salesorder,
            width: '840px'
        });
    
        dialogRef.afterClosed().subscribe(() => window.location.reload());
    }
}


export class SalesOrderCancelDialog {
    constructor(
        public Size: string,
        public Border: string
    ) {}
}

@Component({
    selector: 'sales-order-cancel.component-print-dialog',
    templateUrl: '../sales-order-view-cancel/sales-order-view-cancel.component-cancel-dialog.html',
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
    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;
    
    dataSource: MatTableDataSource<any>;
    displayedColumns = ['ItemImage', 'ProductDetails','ProductInfo','CancellationReason'];
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
                console.log(salesorderlines);
                return this.salesOrderLinesMatTable = new MatTableDataSource<SalesOrderLine>(salesorderlines);
            }
          );
    }

    onCancel() {
        if(this.isValid()) {            
            const confirmation = confirm(`Are you sure you want to cancel this order?`);        
            if (confirmation) {
                this.store.dispatch(new salesOrderActions.CancelSalesOrderLines(this.salesOrderLinesMatTable.data));
            }
        }
    }

    isValid() {   
        var _ret = false;
        var _count = 0;

        this.salesOrderLinesMatTable.data.forEach((salesorderline) => {
            _count++;

            if(_count == 1) {
                _ret = true;
            }

            if (salesorderline.Quantity - salesorderline.FulfilledQuantity > 0 && !salesorderline.CancellationReason) {
                this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: 'Cancellation Reasons are required' });
                _ret = false;
            }
        });

        if(_count == 0) {
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