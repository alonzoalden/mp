import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Item } from '../../../shared/class/item';
import { CustomPrintLabel } from '../../../shared/class/label';


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
    //itemLabelPrintDialog: ItemLabelPrintDialog;
    size: string = 'small';
    isCustom: boolean;
    customOptions: CustomPrintLabel;
    metric: string = 'mm';

    constructor(
        public dialogRef: MatDialogRef<ItemListComponentItemPrintDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Item) {

        }
    ngOnInit() {
        this.customOptions = new CustomPrintLabel(1, 'yes', 0, 0, 0, 0, 0, 0, 0, 0);
    }

    onCloseClick(): void {
        if (this.isCustom) {
            if (!this.isOptionsValid(this.customOptions)) {
                return;
            }
        }
        const data = {
            customOptions: this.customOptions,
            size: this.size,
            isCustom: this.isCustom
        };
        this.dialogRef.close(data);
    }

    isOptionsValid(options: CustomPrintLabel) {
        return !!(options
            && options.Quantity !== null
            && options.Border !== null
            && options.PageWidth !== null
            && options.PageHeight !== null
            && options.LabelWidth !== null
            && options.LabelHeight !== null
            && options.PageTopMargin !== null
            && options.PageLeftMargin !== null
            && options.GapDistanceX !== null
            && options.GapDistanceY !== null);
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}
