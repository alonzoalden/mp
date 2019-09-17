import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PurchaseOrder } from '../../../../shared/class/purchase-order';
import { InboundShippingMethod } from '../../../../shared/class/inbound-shipping-method';
import { PurchaseOrderService } from '../../../purchase-order.service';

@Component({
  templateUrl: './inbound-shipment-edit-shipping-shell.component.html',
})

export class InboundShipmentEditShippingShellComponent implements OnInit {

    constructor() { 
    }
    ngOnInit(): void {
    }
}
