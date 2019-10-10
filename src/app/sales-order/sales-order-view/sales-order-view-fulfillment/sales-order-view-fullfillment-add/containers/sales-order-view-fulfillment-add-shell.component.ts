import { Component, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material';
import { SalesOrder } from '../../../../../shared/class/sales-order';
import { Fulfillment, FulfillmentSalesOrderLine } from '../../../../../shared/class/fulfillment';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as salesOrderActions from '../../../../state/sales-order.actions';
import * as fromSalesOrder from '../../../../state';
import * as fromUser from '../../../../../shared/state/user-state.reducer';
import { Member } from 'app/shared/class/member';

@Component({
  templateUrl: './sales-order-view-fulfillment-add-shell.component.html'
})

export class SalesOrderFulfillmentAddShellComponent implements OnInit {
    salesOrder$: Observable<SalesOrder>;
    fulfillment$: Observable<Fulfillment>;
    errorMessage$: Observable<string>;
    isLoading$: Observable<boolean>;
    fulfillmentSalesOrderLinesMatTable$: Observable<MatTableDataSource<FulfillmentSalesOrderLine>>;

    constructor(private store: Store<fromSalesOrder.State>) { }

    ngOnInit() {
        this.salesOrder$ = this.store.pipe(select(fromSalesOrder.getSalesOrder));
        this.fulfillment$ = this.store.pipe(select(fromSalesOrder.getFulfilledByFulfillment));
        
        this.fulfillmentSalesOrderLinesMatTable$ = this.store.pipe(select(fromSalesOrder.getFulfillmentSalesOrderLinesMatTable));
        this.errorMessage$ = this.store.pipe(select(fromSalesOrder.getError));
        setTimeout(()=> {
            this.isLoading$ = this.store.pipe(select(fromSalesOrder.getIsLoading));
        });
    }
    addFulfillment(payload: { fulfillment: Fulfillment, orderid: number; fulfilledby: string }) {
        this.store.dispatch(new salesOrderActions.AddFulfillment(payload));
    }
    getFulfilledBySalesOrder(payload: { orderid: number, fulfilledby: string }) {
        this.store.dispatch(new salesOrderActions.LoadSalesOrder(payload));
    }
    getFulfilmmentSalesOrderLines(payload: number) {
        this.store.dispatch(new salesOrderActions.LoadFulfilmmentSalesOrderLines(payload));
    }
}
