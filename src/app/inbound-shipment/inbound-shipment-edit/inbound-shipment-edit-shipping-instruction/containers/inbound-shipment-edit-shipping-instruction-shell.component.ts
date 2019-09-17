import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseOrderService } from '../../../purchase-order.service';
import { PurchaseOrder, Carton, CartonInsert, CartonLine, CartonLineInsert } from '../../../../shared/class/purchase-order';

@Component({
    templateUrl: './inbound-shipment-edit-shipping-instruction-shell.component.html',		
})

export class InboundShipmentEditShippingInstructionShellComponent implements OnInit {
    constructor() { }
    ngOnInit() { }    
}

