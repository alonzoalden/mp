import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { PurchaseOrder, Carton } from '../../../../shared/class/purchase-order';
import { Observable } from 'rxjs';
import { Member } from '../../../../shared/class/member';
import { Store, select } from '@ngrx/store';
import * as inboundShipmentActions from '../../state/inbound-shipment.actions';
import * as fromInboundShipment from '../../state';
import * as fromUser from '../../../../shared/state/user-state.reducer';

@Component({
    templateUrl: './inbound-shipment-list-shell.component.html',
})

export class InboundShipmentListShellComponent implements OnInit {
    purchaseOrdersMatTable$: Observable<MatTableDataSource<PurchaseOrder>>;
    isLoading$: Observable<Boolean>;
    pendingDelete$: Observable<Boolean>;
    errorMessage$: Observable<string>;
    userInfo$: Observable<Member>;

    constructor(private store: Store<fromInboundShipment.State>) {}

    ngOnInit() {
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.purchaseOrdersMatTable$ = this.store.pipe(select(fromInboundShipment.purchaseOrdersMatTable));
        this.pendingDelete$ = this.store.pipe(select(fromInboundShipment.getPendingDelete));
        setTimeout(() => {
            this.errorMessage$ = this.store.pipe(select(fromInboundShipment.getError));
            this.isLoading$ = this.store.pipe(select(fromInboundShipment.getIsLoading));
        });
    }
    addNewPurchaseOrder(): void {
        this.store.dispatch(new inboundShipmentActions.AddNewPurchaseOrder());
    }
    setSelectedPurchaseOrder(purchaseorder: PurchaseOrder): void {
        this.store.dispatch(new inboundShipmentActions.SetSelectedPurchaseOrder(purchaseorder));
    }
    getPurchaseOrderOverview(): void {
        this.store.dispatch(new inboundShipmentActions.LoadPurchaseOrderAllVendorOverview());
    }
    downloadPurchaseOrderLabel(purchaseorder: PurchaseOrder): void {
        this.store.dispatch(new inboundShipmentActions.DownloadPurchaseOrderLabel(purchaseorder));
    }
    deletePurchaseOrder(purchaseorder: PurchaseOrder): void {
        this.store.dispatch(new inboundShipmentActions.DeletePurchaseOrder(purchaseorder));
    }

}
