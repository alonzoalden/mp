import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as inboundShipmentActions from '../../../state/inbound-shipment.actions';
import * as fromInboundShipment from '../../../state';
import { Observable } from 'rxjs';
import { PurchaseOrder } from '../../../../shared/class/purchase-order';

@Component({
    selector: 'o-inbound-shipment-edit-carton-shell',
    templateUrl: './inbound-shipment-edit-carton-shell.component.html'
})

export class InboundShipmentEditCartonShellComponent  implements OnInit {

    purchaseOrder$: Observable<PurchaseOrder>;
    isLoading$: Observable<boolean>;
    errorMessage$: Observable<string>;
    
    constructor(private store: Store<fromInboundShipment.State>) {}


    ngOnInit() {
        this.purchaseOrder$ = this.store.pipe(select(fromInboundShipment.getPurchaseOrder));
        this.isLoading$ = this.store.pipe(select(fromInboundShipment.getIsLoading));
        this.errorMessage$ = this.store.pipe(select(fromInboundShipment.getError));
    }
    getCartons(id: number): void {
        this.store.dispatch(new inboundShipmentActions.LoadCartons(id));
    }
}