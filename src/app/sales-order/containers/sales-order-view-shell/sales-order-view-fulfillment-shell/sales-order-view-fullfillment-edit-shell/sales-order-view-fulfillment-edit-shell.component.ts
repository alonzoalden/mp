import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as salesOrderActions from '../../../../state/sales-order.actions';
import * as fromSalesOrder from '../../../../state';
import * as fromUser from '../../../../../shared/state/user-state.reducer';
import { Member } from 'app/shared/class/member';
import { Fulfillment } from '../../../../../shared/class/fulfillment';
import { SalesOrder } from '../../../../../shared/class/sales-order';

@Component({
  templateUrl: './sales-order-view-fulfillment-edit-shell.component.html'
})

export class SalesOrderFulfillmentEditShellComponent implements OnInit {    
    salesOrder$: Observable<SalesOrder>;
    fulfillment$: Observable<Fulfillment>;
    deliveryDetail$: Observable<string>;
    errorMessage$: Observable<string>;
    
    constructor(private store: Store<fromSalesOrder.State>) { }

    ngOnInit() {
        this.salesOrder$ = this.store.pipe(select(fromSalesOrder.getSalesOrder));
        this.fulfillment$ = this.store.pipe(select(fromSalesOrder.getFulfilledByFulfillment));
        this.deliveryDetail$ = this.store.pipe(select(fromSalesOrder.getDeliveryDetail));
        this.errorMessage$ = this.store.pipe(select(fromSalesOrder.getError));
    }
    getFulfilledByFulfillment(payload: { fulfillmentid: number, fulfilledby: string }) {
        this.store.dispatch(new salesOrderActions.LoadFulfilledByFulfillment(payload));
    }
    editFulfillment(payload: Fulfillment) {
        this.store.dispatch(new salesOrderActions.EditFulfillment(payload));
    }
}
