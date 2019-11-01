import { Component, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material';
import { SalesOrder } from '../../../../../../shared/class/sales-order';
import { Fulfillment } from '../../../../../../shared/class/fulfillment';
import * as salesOrderActions from '../../../../state/sales-order.actions';
import * as fromSalesOrder from '../../../../state/index';
import { Observable } from 'rxjs';
import { Member } from '../../../../../../shared/class/member';
import { Store, select } from '@ngrx/store';
import * as fromUser from '../../../../../../shared/state/user-state.reducer';

@Component({
  templateUrl: './sales-order-view-fulfillment-list-shell.component.html'
})

export class SalesOrderFulfillmentListShellComponent implements OnInit {
    fulfillmentsMatTable$: Observable<MatTableDataSource<Fulfillment>>;
    salesOrder$: Observable<SalesOrder>;
    userInfo$: Observable<Member>;
    errorMessage$: Observable<string>;
    pendingDelete$: Observable<boolean>;
    isLoading$: Observable<boolean>;

    constructor(private store: Store<fromSalesOrder.State>) { }

    ngOnInit() {
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.fulfillmentsMatTable$ = this.store.pipe(select(fromSalesOrder.getFulfilledByFulfillmentsMatTable));
        this.salesOrder$ = this.store.pipe(select(fromSalesOrder.getSalesOrder));
        this.errorMessage$ = this.store.pipe(select(fromSalesOrder.getError));
        this.pendingDelete$ = this.store.pipe(select(fromSalesOrder.getPendingDelete));
        setTimeout(() => {
            this.isLoading$ = this.store.pipe(select(fromSalesOrder.getIsLoading));
        });
    }
    getFulfilledBySalesOrder(payload: {orderid: number, fulfilledby: string}) {
        this.store.dispatch(new salesOrderActions.LoadSalesOrder(payload));
    }
    getFulfilledByFulfillments(payload: {orderid: number, fulfilledby: string}) {
        this.store.dispatch(new salesOrderActions.LoadFulfilledByFulfillments(payload));
    }
    getSalesOrderDelivery(payload: number) {
        this.store.dispatch(new salesOrderActions.LoadSalesOrderDelivery(payload));
    }
    setFulfillment(payload: Fulfillment) {
        this.store.dispatch(new salesOrderActions.SetFulfillment(payload));
    }
    deleteFulfillment(payload: number) {
        this.store.dispatch(new salesOrderActions.DeleteFulfillment(payload));
    }
}
