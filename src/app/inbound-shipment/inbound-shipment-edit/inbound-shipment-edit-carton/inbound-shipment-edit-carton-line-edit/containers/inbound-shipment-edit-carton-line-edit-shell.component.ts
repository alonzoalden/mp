import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

//import { CartonLine } from '../../shared/class/carton-line';
//import { PurchaseOrderLineList } from '../../shared/class/purchase-order-line';
import { CartonLine, PurchaseOrderLineList } from '../../../../../shared/class/purchase-order';

import { PurchaseOrderService } from '../../../../purchase-order.service';

@Component({
  templateUrl: './inbound-shipment-edit-carton-line-edit-shell.component.html'
})

export class InboundShipmentEditCartonLineEditShellComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}
