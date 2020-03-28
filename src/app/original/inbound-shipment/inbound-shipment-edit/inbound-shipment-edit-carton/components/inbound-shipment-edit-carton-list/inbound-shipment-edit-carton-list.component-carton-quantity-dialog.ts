import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'inbound-shipment-edit-carton-list.component-carton-quantity-dialog',
    templateUrl: 'inbound-shipment-edit-carton-list.component-carton-quantity-dialog.html',
})

export class InboundShipmentEditCartonListCartonQuantityDialogComponent {
    quantity: number = 1;

    constructor(
        public dialogRef: MatDialogRef<InboundShipmentEditCartonListCartonQuantityDialogComponent>
    ) { }
    onCloseClick(): void {
        this.dialogRef.close(this.quantity);
    }
    onCancelClick(): void {
        this.dialogRef.close();
    }
}
