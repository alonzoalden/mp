import { Component } from '@angular/core';
import { PurchaseOrderService } from '../../purchase-order.service';

@Component({
    selector: 'o-inbound-shipment-edit-line',
    templateUrl: './inbound-shipment-edit-line.component.html'
})

export class InboundShipmentEditLineComponent  {
    constructor(private purchaseOrderService: PurchaseOrderService) { 
        this.purchaseOrderService.currentStep = 1;
    }    
}
