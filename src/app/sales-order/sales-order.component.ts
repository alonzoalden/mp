import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesOrderService } from './sales-order.service';

@Component({
    selector: 'o-sales-order',
    templateUrl: './sales-order.component.html',
})

export class SalesOrderComponent implements OnInit {
    constructor(private route: ActivatedRoute, private salesorderService: SalesOrderService) { }
    ngOnInit() {
        if (this.route.snapshot.queryParams['init']) {
            this.salesorderService.resetSalesOrders();
        }
    }
}
