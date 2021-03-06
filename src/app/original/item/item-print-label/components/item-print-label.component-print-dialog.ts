import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { CustomPrintLabel } from 'app/shared/class/label';
import { InboundShipmentPreviewDialogComponent } from '../../../inbound-shipment/inbound-shipment-preview/inbound-shipment-preview-dialog.component';

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
    size: string = 'small';
    isCustom: boolean;
    customOptions: CustomPrintLabel;
    units: string = 'mm';

    constructor(
        public itemPrintDialog: MatDialog,
        public dialogRef: MatDialogRef<ItemPrintLabelComponentPrintDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
    ngOnInit() {
        this.itemLabelPrintDialog = new ItemLabelPrintDialog('small', 'yes');
        this.customOptions = new CustomPrintLabel(0, null, 0, 0, 0, 0, 0, 0, 0, 0, []);
    }
    onCloseClick(): void {
        if (this.isCustom) {
            this.customOptions.Border = this.itemLabelPrintDialog.Border;
            if (!this.isOptionsValid(this.customOptions)) {
                return;
            }
        }
        const updatedData = this.millimeterToInches(this.customOptions);
        const data = {
            customOptions: updatedData,
            size: this.itemLabelPrintDialog.Size,
            Border: this.itemLabelPrintDialog.Border,
            isCustom: this.isCustom
        };
        this.dialogRef.close(data);
    }
    millimeterToInches(data: CustomPrintLabel): CustomPrintLabel {
        const dataCopy: CustomPrintLabel = Object.assign({}, data);
        if (this.units === 'mm') {
            const num = 25.4;
            dataCopy.PageWidth = dataCopy.PageWidth / num;
            dataCopy.PageHeight = dataCopy.PageHeight / num;
            dataCopy.LabelWidth = dataCopy.LabelWidth / num;
            dataCopy.LabelHeight = dataCopy.LabelHeight / num;
            dataCopy.PageTopMargin = dataCopy.PageTopMargin / num;
            dataCopy.PageLeftMargin  = dataCopy.PageLeftMargin / num;
            dataCopy.GapDistanceX = dataCopy.GapDistanceX / num;
            dataCopy.GapDistanceY = dataCopy.GapDistanceY / num;
        }
        return dataCopy;
    }
    isOptionsValid(options: CustomPrintLabel) {
        return !!(options
            // && options.Quantity !== null
            && options.Border !== null
            && options.PageWidth !== null
            && options.PageHeight !== null
            && options.LabelWidth !== null
            && options.LabelHeight !== null
            && options.PageTopMargin !== null
            && options.PageLeftMargin !== null
            && options.GapDistanceX !== null
            && options.GapDistanceY !== null
        );
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
    openPreviewDialog() {
        this.customOptions.Quantity = this.data.Quantity;
        const dialogRef = this.itemPrintDialog.open(InboundShipmentPreviewDialogComponent, {
            width: '1000px',
            height: '1000px',
            data: {...this.customOptions, units: this.units}
        });
    }
}
