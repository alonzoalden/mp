import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {SalesOrder} from '../../../../shared/class/sales-order';
import * as salesOrderActions from '../../state/sales-order.actions';
import * as fromSalesOrder from '../../state';
import * as fromUser from '../../../../shared/state/user-state.reducer';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Member} from 'app/shared/class/member';

@Component({
    templateUrl: './sales-order-list-shell.component.html'
})

export class SalesOrderListShellComponent implements OnInit {
    salesOrdersMatTable$: Observable<MatTableDataSource<SalesOrder>>;
    userInfo$: Observable<Member>;
    isLoading$: Observable<boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromSalesOrder.State>) {
    }

    ngOnInit() {
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.salesOrdersMatTable$ = this.store.pipe(select(fromSalesOrder.getSalesOrdersListMatTable));
        this.errorMessage$ = this.store.pipe(select(fromSalesOrder.getError));
        setTimeout(() => {
            this.isLoading$ = this.store.pipe(select(fromSalesOrder.getIsLoading));
        });
    }

    getSalesOrderByVendor(payload: { fulfilledby: string, status: string, check: boolean }) {
        if (payload.check === true) {
            this.store.dispatch(new salesOrderActions.LoadMyVendorsSalesOrders({fulfilledby: payload.fulfilledby, status: payload.status}));
            return;
        }
        this.store.dispatch(new salesOrderActions.LoadVendorsSalesOrders({fulfilledby: payload.fulfilledby, status: payload.status}));
    }

    setSalesOrder(payload: SalesOrder) {
        this.store.dispatch(new salesOrderActions.SetSalesOrder(payload));
    }

    downloadSalesOrderPackingSlip(payload: { salesorder: SalesOrder, orderid: number }) {
        this.store.dispatch(new salesOrderActions.DownloadSalesOrderPackingSlip(payload));
    }
}
