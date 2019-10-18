import { Component, OnInit, ViewChild, SimpleChanges, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { SalesOrderLine } from '../../../../shared/class/sales-order-line';
import { SalesOrder } from '../../../../shared/class/sales-order';
import { SalesOrderService } from '../../../sales-order.service';
import { environment } from '../../../../../environments/environment';
import { Member } from 'app/shared/class/member';

@Component({
    selector: 'o-sales-order-cancel',
    templateUrl: './sales-order-view-cancel.component.html',
    styleUrls: ['../../../sales-order.component.css']
})

export class SalesOrderCancelComponent implements OnInit, OnChanges {
    imageURL = environment.imageURL;
    linkURL = environment.linkURL;
    @Input() userInfo: Member;
    @Input() salesOrder: SalesOrder;
    @Input() salesOrderLinesMatTable: MatTableDataSource<SalesOrderLine>;
    @Input() pendingDelete: boolean = false;
    @Input() errorMessage: string;
    @Output() getFulfilledBySalesOrder = new EventEmitter<{orderid: number, fulfilledby: string}>();
    @Output() getSalesOrderLineByVendor = new EventEmitter<{orderid: number, fulfilledby: string}>();
    @Output() getFulfilledBySalesOrderDelivery = new EventEmitter<{orderid: number, fulfilledby: string}>();
    @Output() cancelSalesOrderLines = new EventEmitter<SalesOrderLine[]>();
    @Output() getSalesOrderByVendor = new EventEmitter<{fulfilledby: string, status: string}>();
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    displayedColumns = ['ItemImage', 'ProductDetails', 'ProductInfo', 'CancellationReason'];
    fulfilledby: string = 'merchant';
    orderid: number;
    hasCancellationQty: boolean = false;
    constructor(private route: ActivatedRoute,
        private salesorderService: SalesOrderService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.salesOrderLinesMatTable && changes.salesOrderLinesMatTable.currentValue.data.length) {
            this.salesOrderLinesMatTable.paginator = this.paginator;
            this.salesOrderLinesMatTable.sort = this.sort;
            this.salesOrderLinesMatTable.data.forEach((salesorderline) => {
                if (salesorderline.Quantity - salesorderline.FulfilledQuantity > 0) {
                    this.hasCancellationQty = true;
                }
            });
        }
        if (changes.salesOrder && !changes.salesOrder.currentValue && changes.salesOrder.firstChange) {
            this.getFulfilledBySalesOrder.emit({orderid: this.route.snapshot.params['id'], fulfilledby: this.fulfilledby});
        }

    }
    ngOnInit() {
        this.orderid = this.route.snapshot.params['id'];
        this.getSalesOrderLineByVendor.emit({orderid: this.orderid, fulfilledby: this.fulfilledby});
        this.getFulfilledBySalesOrderDelivery.emit({orderid: this.orderid, fulfilledby: this.fulfilledby});
    }

    onCancel() {
        if (this.isValid()) {
            const confirmation = confirm(`Are you sure you want to cancel this order?`);
            if (confirmation) {
                this.cancelSalesOrderLines.emit(this.salesOrderLinesMatTable.data);
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
}
