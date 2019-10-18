import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as salesOrderActions from '../../../../state/sales-order.actions';
import * as fromSalesOrder from '../../../../state';
import { Fulfillment } from '../../../../../shared/class/fulfillment';
import { SalesOrder } from '../../../../../shared/class/sales-order';

@Component({
    templateUrl: './sales-order-view-fulfillment-edit-shell.component.html'
})

export class SalesOrderFulfillmentEditShellComponent implements OnInit {
    salesOrder$: Observable<SalesOrder>;
    fulfillment$: Observable<Fulfillment>;
    isLoading$: Observable<boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromSalesOrder.State>) { }

    ngOnInit() {
        this.salesOrder$ = this.store.pipe(select(fromSalesOrder.getSalesOrder));
        this.fulfillment$ = this.store.pipe(select(fromSalesOrder.getFulfilledByFulfillment));
        this.errorMessage$ = this.store.pipe(select(fromSalesOrder.getError));
        setTimeout(() => {
            this.isLoading$ = this.store.pipe(select(fromSalesOrder.getIsLoading));
        });
    }
    getFulfilledByFulfillment(payload: { fulfillmentid: number, fulfilledby: string }) {
        this.store.dispatch(new salesOrderActions.LoadFulfilledByFulfillment(payload));
    }
    editFulfillment(payload: { fulfillment: Fulfillment, orderid: number; fulfilledby: string }) {
        this.store.dispatch(new salesOrderActions.EditFulfillment(payload));
    }





}
