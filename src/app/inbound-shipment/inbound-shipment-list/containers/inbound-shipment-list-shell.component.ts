import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuModule, MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseOrder } from '../../../shared/class/purchase-order';
import { PurchaseOrderService } from '../../purchase-order.service';
import { MatMenu } from '@angular/material/menu';
import { AppService } from '../../../app.service';

@Component({
  templateUrl: './inbound-shipment-list-shell.component.html',
})

export class InboundShipmentListShellComponent implements OnInit {
    
    constructor() { }

    ngOnInit() { }
}
