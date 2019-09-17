import { Component, OnInit, OnDestroy, ViewChild, Inject, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { PurchaseOrderLine } from '../../shared/class/purchase-order-line';
import { PurchaseOrder, PurchaseOrderLine } from '../../../../../shared/class/purchase-order';
import { PurchaseOrderService } from '../../../../purchase-order.service';
import { environment } from '../../../../../../environments/environment';
import { ItemList } from '../../../../../shared/class/item';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  templateUrl: './inbound-shipment-edit-line-list-shell.component.html',
})

export class InboundShipmentEditLineListShellComponent implements OnInit {
    constructor() { }

    ngOnInit() {
    }

}
