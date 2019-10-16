import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Item } from '../../../shared/class/item';

export class ItemLabelPrintDialog {
    constructor(
        public Size: string,
        public Quantity: number,
        public Border: string
    ) {}
}

@Component({
selector: 'item-list.component-item-print-dialog',
templateUrl: 'item-list.component-item-print-dialog.html',
})

export class ItemListComponentItemPrintDialog implements OnInit {
    itemLabelPrintDialog: ItemLabelPrintDialog;

    constructor(
        public dialogRef: MatDialogRef<ItemListComponentItemPrintDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Item) {

        }
    ngOnInit() {
        this.itemLabelPrintDialog = new ItemLabelPrintDialog('small', 1, 'yes');
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}

