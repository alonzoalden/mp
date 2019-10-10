import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as inboundShipmentActions from '../../../state/inbound-shipment.actions';
import * as fromInboundShipment from '../../../state';
import { Observable } from 'rxjs';
import { PurchaseOrder, Carton, PurchaseOrderLineList } from '../../../../shared/class/purchase-order';

@Component({
    selector: 'o-inbound-shipment-edit-carton-shell',
    templateUrl: './inbound-shipment-edit-carton-shell.component.html'
})

export class InboundShipmentEditCartonShellComponent  implements OnInit {

    purchaseOrder$: Observable<PurchaseOrder>;
    purchaseOrderLineList$: Observable<PurchaseOrderLineList[]>;
    isLoading$: Observable<boolean>;
    errorMessage$: Observable<string>;
    selectedCarton$: Observable<Carton>;

    constructor(private store: Store<fromInboundShipment.State>) {}

    ngOnInit() {
        this.purchaseOrder$ = this.store.pipe(select(fromInboundShipment.getPurchaseOrder));
        this.purchaseOrderLineList$ = this.store.pipe(select(fromInboundShipment.getPurchaseOrderLineList));
        this.selectedCarton$ = this.store.pipe(select(fromInboundShipment.getSelectedCarton));
        this.isLoading$ = this.store.pipe(select(fromInboundShipment.getIsLoading));
        this.errorMessage$ = this.store.pipe(select(fromInboundShipment.getError));
    }
    getCartons(id: number): void {
        this.store.dispatch(new inboundShipmentActions.LoadCartons(id));
    }
    setSelectedCarton(carton: Carton): void {
        this.store.dispatch(new inboundShipmentActions.SetSelectedCarton(carton));
    }
    getPurchaseOrderLineList(id: number): void {
        this.store.dispatch(new inboundShipmentActions.LoadPurchaseOrderLineList(id));
    }
    downloadAllCartonLabel(purchaseorder: PurchaseOrder): void {
        this.store.dispatch(new inboundShipmentActions.DownloadAllCartonLabel(purchaseorder));
    }
    downloadCartonLabelCount(payload: { carton: Carton, count: number, border: string}): void {
        this.store.dispatch(new inboundShipmentActions.DownloadCartonLabelCount(payload));
    }



}
