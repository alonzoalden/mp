import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

export class ItemLabelPrintDialog {
    constructor(
        public Size: string,
        public Border: string
    ) {}
}

@Component({
    selector: 'item-print-label.component-print-dialog',
    templateUrl: 'item-print-label.component-print-dialog.html',
    })

export class ItemPrintLabelComponentPrintDialog implements OnInit {
    itemLabelPrintDialog: ItemLabelPrintDialog;

    constructor(
        public dialogRef: MatDialogRef<ItemPrintLabelComponentPrintDialog>
    ) { }
    ngOnInit() {
        this.itemLabelPrintDialog = new ItemLabelPrintDialog('small', 'yes');
    }
    onCancelClick(): void {
        this.dialogRef.close();
    }
}
