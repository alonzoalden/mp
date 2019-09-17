import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';

// import { Carton } from '../../shared/class/carton';
// import { CartonLine, CartonLineInsert } from '../../shared/class/carton-line';
import { PurchaseOrder, PurchaseOrderLine, PurchaseOrderLineList, Carton, CartonLine} from '../../../../../shared/class/purchase-order';
import { PurchaseOrderService } from '../../../../purchase-order.service';

//import { PurchaseOrderLineList } from '../../shared/class/purchase-order-line';

@Component({
    templateUrl: './inbound-shipment-edit-carton-line-list-shell.component.html',
})

export class InboundShipmentEditCartonLineListShellComponent implements OnInit {
    
    constructor() { }
    ngOnInit() { }
}
