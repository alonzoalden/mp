import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { PurchaseOrderLine, PurchaseOrderLineConfirm } from 'app/shared/class/purchase-order';

@Component({
    selector: 'inbound-shipment-edit-line-list.component-view-confirms-dialog',
    templateUrl: 'inbound-shipment-edit-line-list.component-view-confirms-dialog.html'
})

export class InboundShipmentEditLineViewConfirmsDialogComponent implements OnInit {
    dataSource: MatTableDataSource<PurchaseOrderLineConfirm>;
    displayedColumns = ['CartonNumber', 'ShippedQuantity', 'ConfirmedQuantity'];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    constructor(
        public dialogRef: MatDialogRef<InboundShipmentEditLineViewConfirmsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PurchaseOrderLineConfirm[]) {}

    ngOnInit() {
        if (this.data.length) {
            this.dataSource = new MatTableDataSource<PurchaseOrderLineConfirm>(this.data);
            this.dataSource.paginator = this.paginator;
        }
    }

    onCloseClick(): void {
        this.dialogRef.close();
    }
}
