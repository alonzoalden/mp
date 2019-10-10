import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseOrder } from '../../../../shared/class/purchase-order';
import { Store, select } from '@ngrx/store';
import * as fromInboundShipment from '../../../state';

@Component({
    templateUrl: './inbound-shipment-edit-shipping-shell.component.html',
})

export class InboundShipmentEditShippingShellComponent implements OnInit {
    purchaseOrder$: Observable<PurchaseOrder>;
    isLoading$: Observable<boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromInboundShipment.State>) {}

    ngOnInit(): void {
        this.purchaseOrder$ = this.store.pipe(select(fromInboundShipment.getPurchaseOrder));
        this.isLoading$ = this.store.pipe(select(fromInboundShipment.getIsLoading));
        this.errorMessage$ = this.store.pipe(select(fromInboundShipment.getError));
    }
}
