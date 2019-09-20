import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, Inject, enableProdMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription, Observable } from 'rxjs';

import { PurchaseOrder, PurchaseOrderLine } from '../../../shared/class/purchase-order';
//import { PurchaseOrderLine } from '../../shared/class/purchase-order-line';

import { InboundShippingMethod } from '../../../shared/class/inbound-shipping-method';
import { Store, select } from '@ngrx/store';
import * as inboundShipmentActions from '../../state/inbound-shipment.actions';
import * as fromInboundShipment from '../../state';
import * as fromUser from '../../../shared/state/user-state.reducer';

@Component({
  templateUrl: './inbound-shipment-edit-shell.component.html',
})

export class InboundShipmentEditShellComponent implements OnInit {
    purchaseOrder$: Observable<PurchaseOrder>;
    isLoading$: Observable<boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromInboundShipment.State>) {}

    ngOnInit() {
        this.purchaseOrder$ = this.store.pipe(select(fromInboundShipment.getPurchaseOrder));
        this.isLoading$ = this.store.pipe(select(fromInboundShipment.getIsLoading));
        this.errorMessage$ = this.store.pipe(select(fromInboundShipment.getError));
    }
    getPurchaseOrder(id: number) {
        this.store.dispatch(new inboundShipmentActions.LoadPurchaseOrder(id));
    }
    editPurchaseOrder(payload: { purchaseOrder: PurchaseOrder, printLabel: boolean }) {
        this.store.dispatch(new inboundShipmentActions.EditPurchaseOrder(payload));
    }
    editPurchaseOrderThenPrintItemLabels(payload: { purchaseOrder: PurchaseOrder, size: string, border: string }) {
        this.store.dispatch(new inboundShipmentActions.EditPurchaseOrderThenPrintItemLabels(payload));
    }
    downloadPurchaseOrderLabel(purchaseorder: PurchaseOrder) {
        this.store.dispatch(new inboundShipmentActions.DownloadPurchaseOrderLabel(purchaseorder));
    }
    
    
}