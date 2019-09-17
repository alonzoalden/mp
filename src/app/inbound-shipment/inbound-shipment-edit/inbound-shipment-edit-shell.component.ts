import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, Inject, enableProdMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

import { PurchaseOrder, PurchaseOrderLine } from '../../shared/class/purchase-order';
//import { PurchaseOrderLine } from '../../shared/class/purchase-order-line';

import { PurchaseOrderService } from '../purchase-order.service';
import { InboundShippingMethod } from '../../shared/class/inbound-shipping-method';

@Component({
  templateUrl: './inbound-shipment-edit-shell.component.html',
})

export class InboundShipmentEditShellComponent implements OnInit {
   
    constructor() {
    }

    ngOnInit() {
    }

}

