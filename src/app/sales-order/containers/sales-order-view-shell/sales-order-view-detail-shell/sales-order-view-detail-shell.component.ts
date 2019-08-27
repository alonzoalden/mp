import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatMenuModule, MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SalesOrderLine } from '../../../../shared/class/sales-order-line';
import { SalesOrder } from '../../../../shared/class/sales-order';

import { SalesOrderService } from '../../../sales-order.service';
import { AppService } from '../../../../app.service';

import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Member } from 'app/shared/class/member';
import { select, Store } from '@ngrx/store';
import * as salesOrderActions from '../../../state/sales-order.actions';
import * as fromSalesOrder from '../../../state';
import * as fromUser from '../../../../shared/state/user-state.reducer';
@Component({
  templateUrl: './sales-order-view-detail-shell.component.html',
  styleUrls: ['../../../sales-order.component.css'] 
})

export class SalesOrderViewDetailShellComponent implements OnInit {
    salesOrderLinesMatTable$: Observable<MatTableDataSource<SalesOrderLine>>;
    salesOrder$: Observable<SalesOrder>;
    deliveryDetail$: Observable<string>;
    userInfo$: Observable<Member>;
    errorMessage$: Observable<string>;

    isMerchant: boolean;
    orderID: number;
    fulfilledby

    constructor(private store: Store<fromSalesOrder.State>) { }

    ngOnInit() {
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.salesOrderLinesMatTable$ = this.store.pipe(select(fromSalesOrder.getSalesOrderLinesMatTable));
        this.salesOrder$ = this.store.pipe(select(fromSalesOrder.getSalesOrder));
        this.deliveryDetail$ = this.store.pipe(select(fromSalesOrder.getDeliveryDetail));
        this.errorMessage$ = this.store.pipe(select(fromSalesOrder.getError));
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
    downloadSalesOrderPackingSlip(payload: SalesOrder) {
        this.store.dispatch(new salesOrderActions.DownloadSalesOrderPackingSlip(payload));
    }
}
