import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseOrderLine } from '../../../../shared/class/purchase-order';

export class ItemLabelPrintDialog {
    constructor(
        public Size: string,
        public Quantity: number,
        public Border: string
    ) {}
}

@Component({
selector: 'inbound-shipment-edit-line-list.component-item-print-dialog',
templateUrl: 'inbound-shipment-edit-line-list.component-item-print-dialog.html',
})

export class InboundShipmentEditLineItemPrintDialogComponent implements OnInit {
itemLabelPrintDialog: ItemLabelPrintDialog;

    constructor(
        public dialogRef: MatDialogRef<InboundShipmentEditLineItemPrintDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PurchaseOrderLine) {

        }
    ngOnInit() {
        this.itemLabelPrintDialog = new ItemLabelPrintDialog('small', this.data.Quantity, 'yes');
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}
