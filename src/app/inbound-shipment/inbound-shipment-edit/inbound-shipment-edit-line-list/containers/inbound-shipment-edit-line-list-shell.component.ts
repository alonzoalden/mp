import { Component, OnInit } from '@angular/core';
import { ItemList } from '../../../../shared/class/item';
import { Store, select } from '@ngrx/store';
import * as inboundShipmentActions from '../../../state/inbound-shipment.actions';
import * as fromInboundShipment from '../../../state';
import { Observable } from 'rxjs';
import { PurchaseOrder, PurchaseOrderLine } from '../../../../shared/class/purchase-order';
import { CustomPrintLabel } from 'app/shared/class/label';

@Component({
    templateUrl: './inbound-shipment-edit-line-list-shell.component.html',
})

export class InboundShipmentEditLineListShellComponent implements OnInit {
    purchaseOrder$: Observable<PurchaseOrder>;
    isLoading$: Observable<boolean>;
    isSimpleItemListLoading$: Observable<boolean>;
    errorMessage$: Observable<string>;
    itemList$: Observable<ItemList[]>;

    constructor(
        private store: Store<fromInboundShipment.State>,
    ) { }

    ngOnInit() {
        this.purchaseOrder$ = this.store.pipe(select(fromInboundShipment.getPurchaseOrder));
        this.errorMessage$ = this.store.pipe(select(fromInboundShipment.getError));
        this.itemList$ = this.store.pipe(select(fromInboundShipment.getSimpleItemList));
        setTimeout(() => {
            this.isLoading$ = this.store.pipe(select(fromInboundShipment.getIsLoading));
            this.isSimpleItemListLoading$ = this.store.pipe(select(fromInboundShipment.getIsSimpleItemListLoading));
        });
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

    downloadItemLabelCountCustom(payload: {purchaseorderline: PurchaseOrderLine, options: CustomPrintLabel }): void {
        this.store.dispatch(new inboundShipmentActions.DownloadItemLabelCountCustom(payload));
    }
    downloadItemLargeLabelCountCustom(payload: {purchaseorderline: PurchaseOrderLine, options: CustomPrintLabel }): void {
        this.store.dispatch(new inboundShipmentActions.DownloadItemLargeLabelCountCustom(payload));
    }

    getSimpleItemList(): void {
        this.store.dispatch(new inboundShipmentActions.LoadSimpleItemList());
    }
    setSelectedPurchaseOrder(purchaseorder: PurchaseOrder): void {
        this.store.dispatch(new inboundShipmentActions.SetSelectedPurchaseOrder(purchaseorder));
    }
}
