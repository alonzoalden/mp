import { Component } from '@angular/core';
import { PurchaseOrderService } from '../../purchase-order.service';

@Component({
    templateUrl: './inbound-shipment-edit-line-shell.component.html'
})

export class InboundShipmentEditLineShellComponent  {
    constructor(private purchaseOrderService: PurchaseOrderService) { 
        this.purchaseOrderService.currentStep = 1;
    }    
}
