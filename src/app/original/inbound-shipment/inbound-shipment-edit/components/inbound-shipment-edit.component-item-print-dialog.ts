import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CustomPrintLabel } from '../../../../shared/class/label';
import { PurchaseOrder } from 'app/shared/class/purchase-order';
import { InboundShipmentPreviewDialogComponent } from '../../inbound-shipment-preview/inbound-shipment-preview-dialog.component';

@Component({
    selector: 'inbound-shipment-edit.component-item-print-dialog',
    templateUrl: 'inbound-shipment-edit.component-item-print-dialog.html',
})

export class InboundShipmentEditItemPrintDialogComponent implements OnInit {
    size: string = 'small';
    isCustom: boolean;
    customOptions: CustomPrintLabel;
    units: string = 'mm';

    constructor(
        public itemPrintDialog: MatDialog,
        public dialogRef: MatDialogRef<InboundShipmentEditItemPrintDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: PurchaseOrder) { }
    ngOnInit() {
        this.customOptions = new CustomPrintLabel(1, 'yes', 0, 0, 0, 0, 0, 0, 0, 0, []);
    }

    onCloseClick(): void {
        if (this.isCustom) {
            if (!this.isOptionsValid(this.customOptions)) {
                return;
            }
        }
        const updatedData = this.millimeterToInches(this.customOptions);
        const data = {
            customOptions: updatedData,
            size: this.size,
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
            && options.Quantity !== null
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
        const dialogRef = this.itemPrintDialog.open(InboundShipmentPreviewDialogComponent, {
            width: '1000px',
            height: '1000px',
            data: {...this.customOptions, units: this.units}
        });
    }
}