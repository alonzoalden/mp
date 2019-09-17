import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

//import { PurchaseOrderLineList, PurchaseOrderLine } from '../../shared/class/purchase-order-line';

//import { Carton, CartonInsert } from '../../shared/class/carton';
import { Carton, CartonInsert, PurchaseOrderLineList, PurchaseOrderLine } from '../../../../../shared/class/purchase-order';

import { PurchaseOrderService } from '../../../../purchase-order.service';

@Component({
    templateUrl: './inbound-shipment-edit-carton-add-shell.component.html'
})

export class InboundShipmentEditCartonAddShellComponent implements OnInit {
    
    constructor() {
    }
    ngOnInit() {
    }
}
