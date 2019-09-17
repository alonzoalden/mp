import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrderService } from '../../purchase-order.service';

@Component({
    selector: 'o-inbound-shipment-edit-carton-shell',
    templateUrl: './inbound-shipment-edit-carton-shell.component.html'
})

export class InboundShipmentEditCartonShellComponent  {
    constructor(private router: Router,
        private purchaseOrderService: PurchaseOrderService) { 
        this.purchaseOrderService.currentStep = 2;
    }

    // private isCartonHeaderVisible: boolean;
    
    get isCartonAdd(): Boolean {
        return this.router.url.endsWith('edit/carton/list/add');
    }

    get isCartonEdit(): Boolean {        
        return ( this.router.url.indexOf('/edit/carton/list/') > 0 
            && this.router.url.endsWith('edit')
            && this.router.url.indexOf('/edit/carton/list/line') === -1) ;
    }
}
