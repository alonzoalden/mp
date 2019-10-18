import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseOrderService } from '../../../purchase-order.service';
import { PurchaseOrder } from '../../../../shared/class/purchase-order';

export class CartonAllLabelPrintDialog {
    constructor(
        public Border: string
    ) {}
}

@Component({
    selector: 'inbound-shipment-edit-shipping-instruction.component-carton-print-dialog',
    templateUrl: 'inbound-shipment-edit-shipping-instruction.component-carton-print-dialog.html',
  })

export class InboundShipmentEditShippingInstructionCartonPrintDialogComponent implements OnInit {
    cartonLabelPrintDialog: CartonAllLabelPrintDialog;

    constructor(
        public dialogRef: MatDialogRef<InboundShipmentEditShippingInstructionCartonPrintDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PurchaseOrder) {
        }

    ngOnInit() {
        this.cartonLabelPrintDialog = new CartonAllLabelPrintDialog('yes');
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}

