import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
//import { Carton } from '../../shared/class/carton';
import { Carton } from '../../../../../shared/class/purchase-order';

import { PurchaseOrderService } from '../../../../purchase-order.service';

@Component({
  templateUrl: './inbound-shipment-edit-carton-edit-shell.component.html'
})

export class InboundShipmentEditCartonEditShellComponent implements OnInit {
    
    constructor() {
    }

    ngOnInit() {
        
    }

}
