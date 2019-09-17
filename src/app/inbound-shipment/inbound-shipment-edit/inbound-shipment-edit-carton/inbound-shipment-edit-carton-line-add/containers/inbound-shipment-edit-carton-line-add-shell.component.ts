import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

// import { PurchaseOrderLineList, PurchaseOrderLine } from '../../shared/class/purchase-order-line';

// import { CartonLineInsert } from '../../shared/class/carton-line';
// import { Carton } from '../../shared/class/carton';

import { PurchaseOrderLineList, PurchaseOrderLine, Carton, CartonLineInsert } from '../../../../../shared/class/purchase-order';

import { PurchaseOrderService } from '../../../../purchase-order.service';

@Component({
    templateUrl: './inbound-shipment-edit-carton-line-add-shell.component.html'
})

export class InboundShipmentEditCartonLineAddShellComponent implements OnInit {
    constructor() {
    }
    ngOnInit() {
    }
}
