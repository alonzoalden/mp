import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseOrder } from '../../../../shared/class/purchase-order';

@Component({
  selector: 'o-inbound-shipment-edit',
  templateUrl: './inbound-shipment-edit.component.html',
  styleUrls: ['./inbound-shipment-edit.component.css']
})

export class LineItemLabelPrintDialogComponent {
    constructor(
        public Size: string,
        public Border: string
    ) {}
}

@Component({
    selector: 'inbound-shipment-edit.component-item-print-dialog',
    templateUrl: 'inbound-shipment-edit.component-item-print-dialog.html',
  })

export class InboundShipmentEditItemPrintDialogComponent implements OnInit {
    lineItemLabelPrintDialog: LineItemLabelPrintDialogComponent;

    constructor(
        public dialogRef: MatDialogRef<InboundShipmentEditItemPrintDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PurchaseOrder) { }

    ngOnInit() {
        this.lineItemLabelPrintDialog = new LineItemLabelPrintDialogComponent('small', 'yes');
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}

