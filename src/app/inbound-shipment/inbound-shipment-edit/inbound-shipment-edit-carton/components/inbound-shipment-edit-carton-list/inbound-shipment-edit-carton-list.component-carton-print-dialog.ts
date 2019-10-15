import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Carton } from '../../../../../shared/class/purchase-order';

export class CartonLabelPrintDialog {
    constructor(
        public Quantity: number,
        public Border: string
    ) {}
}

@Component({
    selector: 'inbound-shipment-edit-carton-list.component-carton-print-dialog',
    templateUrl: 'inbound-shipment-edit-carton-list.component-carton-print-dialog.html',
  })

export class InboundShipmentEditCartonListCartonPrintDialogComponent implements OnInit {
    //quantity: number;
    cartonLabelPrintDialog: CartonLabelPrintDialog;

    constructor(
        public dialogRef: MatDialogRef<InboundShipmentEditCartonListCartonPrintDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Carton) {}

    ngOnInit() {
        //this.quantity = this.data.LabelQty;
        this.cartonLabelPrintDialog = new CartonLabelPrintDialog(this.data.LabelQty, 'yes');
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}
