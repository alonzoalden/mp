import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PurchaseOrder, Carton, CartonInsert, CartonLine, CartonLineInsert, PurchaseOrderLineList } from '../../../../../shared/class/purchase-order';
import { PurchaseOrderService } from '../../../../purchase-order.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: './inbound-shipment-edit-carton-list-shell.component.html'
})

export class InboundShipmentEditCartonListShellComponent implements OnInit {
    constructor() { }

    ngOnInit() {
    }

}
