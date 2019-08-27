import { Component, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material';
import { SalesOrderLine } from '../../../../shared/class/sales-order-line';
import { SalesOrder } from '../../../../shared/class/sales-order';
import { Member } from 'app/shared/class/member';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as salesOrderActions from '../../../state/sales-order.actions';
import * as fromSalesOrder from '../../../state';
import * as fromUser from '../../../../shared/state/user-state.reducer';

@Component({
  templateUrl: './sales-order-view-cancel-shell.component.html',
  styleUrls: ['../../../sales-order.component.css'] 
})

export class SalesOrderViewCancelShellComponent implements OnInit {
    displayedColumns = ['ItemImage', 'ProductDetails', 'ProductInfo', 'CancellationReason'];
    fulfilledby: string;
    salesOrderLinesMatTable$: Observable<MatTableDataSource<SalesOrderLine>>;
    salesOrder$: Observable<SalesOrder>;
    currentSalesOrderID$: Observable<number>;
    deliveryDetail$: Observable<string>;
    userInfo$: Observable<Member>;
    errorMessage$: Observable<string>;
    pendingDelete$: Observable<boolean>;
    
    constructor(private store: Store<fromSalesOrder.State>) { }
    
    ngOnInit() {
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.salesOrderLinesMatTable$ = this.store.pipe(select(fromSalesOrder.getSalesOrderLinesMatTable));
        this.salesOrder$ = this.store.pipe(select(fromSalesOrder.getSalesOrder));
        //this.currentSalesOrderID$ = this.store.pipe(select(fromSalesOrder.getCurrentSalesOrderID));
        this.deliveryDetail$ = this.store.pipe(select(fromSalesOrder.getDeliveryDetail));
        this.errorMessage$ = this.store.pipe(select(fromSalesOrder.getError));
        this.pendingDelete$ = this.store.pipe(select(fromSalesOrder.getPendingDelete));
    }
    getFulfilledBySalesOrder(payload: {orderid: number, fulfilledby: string}) {
        this.store.dispatch(new salesOrderActions.LoadSalesOrder(payload));
    }
    getSalesOrderLineByVendor(payload: {orderid: number, fulfilledby: string}) {
        this.store.dispatch(new salesOrderActions.LoadSalesOrderLines(payload));
    }
    getFulfilledBySalesOrderDelivery(payload: {orderid: number, fulfilledby: string}) {
        this.store.dispatch(new salesOrderActions.LoadFulfilledBySalesOrderDelivery(payload));
    }
    cancelSalesOrderLines(payload: SalesOrderLine[]) {
        this.store.dispatch(new salesOrderActions.CancelSalesOrderLines(payload));
    }
    setSalesOrderID(payload: number) {
        this.store.dispatch(new salesOrderActions.SetSalesOrderID(payload));
    }
}
