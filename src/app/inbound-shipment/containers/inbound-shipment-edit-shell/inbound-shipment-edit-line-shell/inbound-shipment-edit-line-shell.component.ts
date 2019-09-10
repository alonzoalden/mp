import { Component } from '@angular/core';
import { PurchaseOrderService } from '../../../purchase-order.service';

@Component({
    selector: 'o-inbound-shipment-edit-line',
    templateUrl: './inbound-shipment-edit-line-shell.component.html'
})

export class InboundShipmentEditLineShellComponent  {
    constructor(private purchaseOrderService: PurchaseOrderService) { 
        this.purchaseOrderService.currentStep = 1;
    }    
}
