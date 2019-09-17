import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

//import { PurchaseOrderLine } from '../../shared/class/purchase-order-line';
import { PurchaseOrderLine } from '../../../../../shared/class/purchase-order';
import { ItemList } from '../../../../../shared/class/item';

import { PurchaseOrderService } from '../../../../purchase-order.service';

@Component({
  templateUrl: './inbound-shipment-edit-line-edit-shell.component.html'
})

export class InboundShipmentEditLineEditShellComponent implements OnInit {
    constructor() { }

    ngOnInit() {
    }
}
