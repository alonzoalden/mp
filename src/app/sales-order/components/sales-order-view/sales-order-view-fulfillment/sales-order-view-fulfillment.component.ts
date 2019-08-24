import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SalesOrder } from '../../../../shared/class/sales-order';
import { SalesOrderService } from '../../../sales-order.service';

@Component({
  selector: 'o-sales-order-fulfillment',
  templateUrl: './sales-order-view-fulfillment.component.html'
})

export class SalesOrderFulfillmentComponent implements OnInit {
    errorMessage: string;
    deliveryDetail: string;
    salesorder: SalesOrder;

    orderid: number;
    fulfilledby: string;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private salesorderService: SalesOrderService) { }

    ngOnInit() {
        const paramOrderID = this.route.snapshot.params['id'];
        const paramFulfilledBy = this.route.snapshot.params['fulfilledby'];

        this.orderid = paramOrderID;
        this.fulfilledby = paramFulfilledBy;

        // this.salesorderService.getSalesOrder(param).subscribe(
        //     (salesorder: SalesOrder) => {
        //         this.salesorder = salesorder;                
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );

        this.salesorderService.getFulfilledBySalesOrder(this.orderid, this.fulfilledby).subscribe(
            (salesorder: SalesOrder) => {
                this.salesorder = salesorder;
            },
            (error: any) => this.errorMessage = <any>error
        );

        this.salesorderService.getSalesOrderDelivery(this.orderid).subscribe(
            (deliveryDetail: string) => {
                this.deliveryDetail = deliveryDetail.trim().replace(new RegExp('<br />', 'g'), '\n');
            },
            (error: any) => this.errorMessage = <any>error
        );
    }
}
