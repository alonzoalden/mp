import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PurchaseOrderLineInsert, PurchaseOrderLine } from '../../../../../shared/class/purchase-order';

//import { PurchaseOrderLineInsert, PurchaseOrderLine } from '../../shared/class/purchase-order-line';
import { ItemList } from '../../../../../shared/class/item';
import { Item } from '../../../../../shared/class/item';

import { PurchaseOrderService } from '../../../../purchase-order.service';

@Component({
    selector: 'o-inbound-shipment-edit-line-add-shell',
    templateUrl: './inbound-shipment-edit-line-add-shell.component.html'
})

export class InboundShipmentEditLineAddShellComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
