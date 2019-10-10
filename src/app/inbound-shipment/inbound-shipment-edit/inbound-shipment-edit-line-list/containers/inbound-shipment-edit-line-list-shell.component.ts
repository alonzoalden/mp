import { Component, OnInit } from '@angular/core';
import { ItemList } from '../../../../shared/class/item';
import { Store, select } from '@ngrx/store';
import * as inboundShipmentActions from '../../../state/inbound-shipment.actions';
import * as fromInboundShipment from '../../../state';
import * as itemActions from '../../../../item/state/item.actions';
import { Observable } from 'rxjs';
import { PurchaseOrder, PurchaseOrderLine } from '../../../../shared/class/purchase-order';

@Component({
    templateUrl: './inbound-shipment-edit-line-list-shell.component.html',
})

export class InboundShipmentEditLineListShellComponent implements OnInit {

    purchaseOrder$: Observable<PurchaseOrder>;
    isLoading$: Observable<boolean>;
    errorMessage$: Observable<string>;
    itemList$: Observable<ItemList[]>;

    constructor(
        private store: Store<fromInboundShipment.State>,
    ) { }

    ngOnInit() {
        this.purchaseOrder$ = this.store.pipe(select(fromInboundShipment.getPurchaseOrder));
        this.isLoading$ = this.store.pipe(select(fromInboundShipment.getIsLoading));
        this.errorMessage$ = this.store.pipe(select(fromInboundShipment.getError));
        this.itemList$ = this.store.pipe(select(fromInboundShipment.getSimpleItemList));
    }
    getPurchaseOrderLines(payload: number): void {
        this.store.dispatch(new inboundShipmentActions.LoadPurchaseOrderLines(payload));
    }
    downloadItemLabelCount(payload: { purchaseorderline: PurchaseOrderLine, count: number, border: string }): void {
        this.store.dispatch(new inboundShipmentActions.DownloadItemLabelCount(payload));
    }
    downloadItemLargeLabelCount(payload: { purchaseorderline: PurchaseOrderLine, count: number, border: string }): void {
        this.store.dispatch(new inboundShipmentActions.DownloadItemLargeLabelCount(payload));
    }
    getSimpleItemList(): void {
        this.store.dispatch(new itemActions.LoadSimpleItemList());
    }
    updatePurchaseLineCartonQuantity(purchaseorder: PurchaseOrder): void {
        this.store.dispatch(new inboundShipmentActions.UpdatePurchaseLineCartonQuantity(purchaseorder));
    }
    setSelectedPurchaseOrder(purchaseorder: PurchaseOrder): void {
        this.store.dispatch(new inboundShipmentActions.SetSelectedPurchaseOrder(purchaseorder));
    }


}
