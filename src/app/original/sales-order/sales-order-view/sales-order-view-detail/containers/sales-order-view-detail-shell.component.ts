import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SalesOrderLine } from '../../../../../shared/class/sales-order-line';
import { SalesOrder } from '../../../../../shared/class/sales-order';
import { Observable } from 'rxjs';
import { Member } from '../../../../../shared/class/member';
import { BOLRequest } from '../../../../../shared/class/bol-request';
import { select, Store } from '@ngrx/store';
import * as salesOrderActions from '../../../state/sales-order.actions';
import * as fromSalesOrder from '../../../state';
import * as fromUser from '../../../../../shared/state/user-state.reducer';

@Component({
    templateUrl: './sales-order-view-detail-shell.component.html',
    styleUrls: ['../../../sales-order.component.css']
})

export class SalesOrderViewDetailShellComponent implements OnInit {
    salesOrderLinesMatTable$: Observable<MatTableDataSource<SalesOrderLine>>;
    salesOrder$: Observable<SalesOrder>;
    userInfo$: Observable<Member>;
    isLoading$: Observable<boolean>;
    isSalesOrderLinesLoading$: Observable<boolean>;
    isBOLRequestLoading$: Observable<boolean>;
    BOLRequest$: Observable<BOLRequest>;
    errorMessage$: Observable<string>;
    isMerchant: boolean;
    orderID: number;
    constructor(private store: Store<fromSalesOrder.State>) { }

    ngOnInit() {
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.salesOrderLinesMatTable$ = this.store.pipe(select(fromSalesOrder.getSalesOrderLinesMatTable));
        this.salesOrder$ = this.store.pipe(select(fromSalesOrder.getSalesOrder));
        this.BOLRequest$ = this.store.pipe(select(fromSalesOrder.getBOLRequest));
        this.errorMessage$ = this.store.pipe(select(fromSalesOrder.getError));
        setTimeout(() => {
            this.isLoading$ = this.store.pipe(select(fromSalesOrder.getIsLoading));
            this.isSalesOrderLinesLoading$ = this.store.pipe(select(fromSalesOrder.getIsSalesOrderLinesLoading));
            this.isBOLRequestLoading$ = this.store.pipe(select(fromSalesOrder.getIsBOLRequestLoading));
        });
    }
    getFulfilledBySalesOrder(payload: {orderid: number, fulfilledby: string}) {
        this.store.dispatch(new salesOrderActions.LoadSalesOrder(payload));
    }
    getSalesOrderLineByVendor(payload: {orderid: number, fulfilledby: string}) {
        this.store.dispatch(new salesOrderActions.LoadSalesOrderLines(payload));
    }
    downloadSalesOrderPackingSlip(payload: {salesorder: SalesOrder, orderid: number}) {
        this.store.dispatch(new salesOrderActions.DownloadSalesOrderPackingSlip(payload));
    }
    addBOLRequest(payload: BOLRequest) {
        this.store.dispatch(new salesOrderActions.AddBOLRequest(payload));
    }
    getBOLRequest(payload: number) {
        this.store.dispatch(new salesOrderActions.LoadBOLRequest(payload));
    }
}
