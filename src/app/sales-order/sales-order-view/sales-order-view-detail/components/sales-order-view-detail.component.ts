import { SalesOrderCancelComponentPrintDialog } from './../../sales-order-view-cancel/components/sales-order-view-cancel.component-cancel-dialog';
import { Component, OnInit, ViewChild, Output, Input, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SalesOrderLine } from '../../../../shared/class/sales-order-line';
import { SalesOrder } from '../../../../shared/class/sales-order';
import { BOLRequest } from '../../../../shared/class/bol-request';
import { environment } from '../../../../../environments/environment';
import { Member } from '../../../../shared/class/member';
import { SalesOrderViewBOLRequestComponentDialog } from '../../sales-order-view-bol/sales-order-view-bol-request/components/sales-order-view-bol.component.request-dialog';
import { SalesOrderViewUploadBOLComponentDialog } from '../../sales-order-view-bol/sales-order-view-bol-upload/components/sales-order-view-bol.component.upload-dialog';

@Component({
    selector: 'o-sales-order-detail',
    templateUrl: './sales-order-view-detail.component.html',
    styleUrls: ['../../../sales-order.component.css']
})

export class SalesOrderDetailComponent implements OnInit, OnChanges {
    imageURL = environment.imageURL;
    linkURL = environment.linkURL;
    bolURL = environment.bolURL;
    @Input() userInfo: Member;
    @Input() salesOrder: SalesOrder;
    @Input() salesOrderLinesMatTable: MatTableDataSource<SalesOrderLine>;
    @Input() errorMessage: string;
    @Input() isLoading: boolean;
    @Input() isSalesOrderLinesLoading: boolean;
    @Input() isBOLRequestLoading: boolean;
    @Input() BOLRequest: BOLRequest;
    @Output() addBOLRequest = new EventEmitter<BOLRequest>();
    @Output() getBOLRequest = new EventEmitter<number>();
    @Output() getFulfilledBySalesOrder = new EventEmitter<{orderid: number, fulfilledby: string}>();
    @Output() getSalesOrderLineByVendor = new EventEmitter<{orderid: number, fulfilledby: string}>();
    @Output() cancelSalesOrderLines = new EventEmitter<SalesOrderLine[]>();
    @Output() getSalesOrderByVendor = new EventEmitter<{fulfilledby: string, status: string}>();
    @Output() downloadSalesOrderPackingSlip = new EventEmitter<{salesorder: SalesOrder, orderid: number}>();
    fulfilledby: string;
    orderid: number;
    displayedColumns = ['ItemImage', 'ProductDetails', 'Quantity', 'MerchantStatus', 'UnitPrice', 'LineSubTotal'];
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    isMerchant: boolean;

    constructor(private route: ActivatedRoute,
        public printDialog: MatDialog) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.salesOrderLinesMatTable && changes.salesOrderLinesMatTable.currentValue.data.length) {
            this.salesOrderLinesMatTable.paginator = this.paginator;
            this.salesOrderLinesMatTable.sort = this.sort;
        }
    }
    ngOnInit() {
        this.orderid = this.route.parent.snapshot.params['id'];
        this.fulfilledby = this.route.parent.snapshot.params['fulfilledby'];
        if (this.fulfilledby === 'merchant') {
            this.isMerchant = true;
        } else {
            this.isMerchant = false;
        }
        this.getSalesOrderLineByVendor.emit({orderid: this.orderid, fulfilledby: this.fulfilledby});
        this.getBOLRequest.emit(this.orderid);
    }

    onPrintPackingSlip() {
        this.downloadSalesOrderPackingSlip.emit({salesorder: this.salesOrder, orderid: this.orderid});
    }

    openDialogCancelOrder(salesorder) {
        const dialogRef = this.printDialog.open(SalesOrderCancelComponentPrintDialog, {
            data: salesorder,
            width: '840px'
        });
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.getFulfilledBySalesOrder.emit({orderid: this.orderid, fulfilledby: this.fulfilledby});
                this.getSalesOrderLineByVendor.emit({orderid: this.orderid, fulfilledby: this.fulfilledby});
            }
        });
    }

    openDialogBOL(salesorder) {
        const _data = {
            salesorder,
            orderid: this.orderid
        };
        const dialogRef = this.printDialog.open(SalesOrderViewBOLRequestComponentDialog, {
            data: _data,
            width: '1040px'
        });

        dialogRef.afterClosed().subscribe(() => {
        });
    }
    openDialogUploadBOLRequest(salesorder) {
        const _data = {
            salesorder,
            orderid: this.orderid
        };
        const dialogRef = this.printDialog.open(SalesOrderViewUploadBOLComponentDialog, {
            data: _data,
            width: '1040px'
        });

        dialogRef.afterClosed().subscribe(() => {
        });
    }

    formatPhoneNumber(phoneNumberString) {
        if (!phoneNumberString) { return; }
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }
}
