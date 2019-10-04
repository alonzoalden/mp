import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesOrder } from '../../../shared/class/sales-order';

@Component({
    selector: 'o-sales-order-view',
    templateUrl: './sales-order-view.component.html',
    styleUrls: ['../../sales-order.component.css']
})

export class SalesOrderViewComponent implements OnInit {
    @Input() salesorder: SalesOrder;
    //@Input() isLoading: boolean;
    @Input() errorMessage: string;
    @Output() getFulfilledBySalesOrder = new EventEmitter<{orderid: number, fulfilledby: string}>();
    @Output() getSalesOrderLineByVendor = new EventEmitter<{orderid: number, fulfilledby: string}>();

    isMerchant: boolean;
    fulfilledby: string;
    orderid: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.orderid = this.route.snapshot.params['id'];
        this.fulfilledby = this.route.snapshot.params['fulfilledby'];
        this.isMerchant = this.fulfilledby === 'merchant';
        this.getFulfilledBySalesOrder.emit({orderid: this.orderid, fulfilledby: this.fulfilledby});
        //this.getSalesOrderLineByVendor.emit({orderid: this.orderid, fulfilledby: this.fulfilledby});
    }
}
