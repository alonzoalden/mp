import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SalesOrderService } from '../../sales-order.service';
import { SalesOrder } from '../../../shared/class/sales-order';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: './sales-order-view-shell.component.html',
  styleUrls: ['../../sales-order.component.css'] 
})

export class SalesOrderViewShellComponent implements OnInit {
    isMerchant: boolean;
    fulfilledby: string;
    orderid: number;
    
    salesorder: SalesOrder;
    errorMessage: string;
    constructor(private route: ActivatedRoute,
        private router: Router,
        private salesorderService: SalesOrderService) { }

    ngOnInit() {
        const paramFulfilledBy = this.route.snapshot.params['fulfilledby'];
        const paramOrderID = this.route.snapshot.params['id'];
        this.orderid = paramOrderID;
        this.fulfilledby = paramFulfilledBy;
        this.isMerchant = paramFulfilledBy === "merchant";
        this.salesorderService.getFulfilledBySalesOrder(this.orderid, this.fulfilledby).subscribe(
            (salesorder: SalesOrder) => {
                this.salesorder = salesorder;
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

}
