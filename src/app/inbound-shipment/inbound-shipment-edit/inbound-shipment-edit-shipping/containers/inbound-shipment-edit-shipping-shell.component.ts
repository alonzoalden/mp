import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { PurchaseOrder } from '../../../../shared/class/purchase-order';
import { InboundShippingMethod } from '../../../../shared/class/inbound-shipping-method';
import { PurchaseOrderService } from '../../../purchase-order.service';
import { Store, select } from '@ngrx/store';
import * as inboundShipmentActions from '../../../state/inbound-shipment.actions';
import * as fromInboundShipment from '../../../state';
import * as fromUser from '../../../../shared/state/user-state.reducer';

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
