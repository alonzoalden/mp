import { Component, OnInit } from '@angular/core';
import { SalesOrder } from '../../../shared/class/sales-order';
import { Store, select } from '@ngrx/store';
import * as salesOrderActions from '../../state/sales-order.actions';
import * as fromSalesOrder from '../../state';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './sales-order-view-shell.component.html',
  styleUrls: ['../../sales-order.component.css'] 
})

export class SalesOrderViewShellComponent implements OnInit {
    salesorder$: Observable<SalesOrder>;
    errorMessage$: Observable<string>;
    constructor(private store: Store<fromSalesOrder.State>) { }

    ngOnInit() {
        this.salesorder$ = this.store.pipe(select(fromSalesOrder.getSalesOrder));
        this.errorMessage$ = this.store.pipe(select(fromSalesOrder.getError));
    }
    getFulfilledBySalesOrder(payload: {orderid: number, fulfilledby: string}) {
        this.store.dispatch(new salesOrderActions.LoadSalesOrder(payload));
    }
}
