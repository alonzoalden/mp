import { Component, OnInit, OnDestroy, ViewChild, Inject, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemList } from '../../../../shared/class/item';
// import { PurchaseOrderLine } from '../../shared/class/purchase-order-line';
import { Store, select } from '@ngrx/store';
import * as inboundShipmentActions from '../../../state/inbound-shipment.actions';
import * as fromInboundShipment from '../../../state';
import * as fromUser from '../../../../shared/state/user-state.reducer';
import * as fromItem from '../../../../item/state';
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
        private itemStore: Store<fromItem.State>
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
    

}
