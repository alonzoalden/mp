import {Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Item} from '../../../shared/class/item';

@Component({
    selector: 'o-inbound-shipment-preview-dialog',
    templateUrl: './inbound-shipment-preview-dialog.component.html',
    styleUrls: ['./inbound-shipment-preview-dialog.component.css']
})

export class InboundShipmentPreviewDialogComponent implements OnInit, OnChanges {

    generalData = new DocumentData(0, 0, 0, 0, 0, 0, 0, 0);
    error: string;
    arrDPI: any[];
    quantityList = [];
    pageData = [];
    oneRowNum: number;
    onePageNum: number;
    pageCount: number;

    constructor(
        public dialogRef: MatDialogRef<InboundShipmentPreviewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ItemPrintPreview,
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {

    }

    ngOnInit() {
        for (let i = 0; i < this.data.Quantity; i++) {
            this.quantityList.push({});
        }
        this.conversion_getDPI();
        this.checkData();
    }

    calc() {
        let wX = 1, wY = 0;
        do {
            wY = Number((this.generalData.fPageWidth - 2 - this.generalData.fPageLeftMargin - this.generalData.fLabelWidth - this.generalData.fGapDistanceX - (wX - 1) * (this.generalData.fLabelWidth + this.generalData.fGapDistanceX)).toFixed(2));
            wX++;
        } while (wY + 0.1 >= this.generalData.fLabelWidth);
        //One Row count
        this.oneRowNum = wX - 1;
        //total row count
        const totalRowNum = Math.ceil(this.data.Quantity / this.oneRowNum);
        let hX = 1, hY = 0;
        do {
            hY = Number((this.generalData.fPageHeight - 2 - this.generalData.fPageTopMargin - this.generalData.fLabelHeight - this.generalData.fGapDistanceY - (hX - 1) * (this.generalData.fLabelHeight + this.generalData.fGapDistanceY)).toFixed(2));
            hX++;
        } while (hY + 0.1 >= this.generalData.fLabelHeight);
        //one page row count
        const rowNum = hX - 1;
        //one page item count
        this.onePageNum = this.oneRowNum * rowNum;
        //total page count
        this.pageCount = Math.ceil(totalRowNum / rowNum);
        let index = 0;
        for (let i = 0; i < this.data.Quantity; i++) {
            if (i % this.onePageNum === 0) {
                this.pageData[index] = [];
                this.pageData[index].push({});
                index++;
            } else {
                this.pageData[index - 1].push({});
            }
        }
    }

    conversion_getDPI() {
        this.arrDPI = [];
        const tmpNode = document.createElement('DIV');
        tmpNode.style.cssText = 'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden';
        document.body.appendChild(tmpNode);
        this.arrDPI[0] = parseInt(String(tmpNode.offsetWidth));
        this.arrDPI[1] = parseInt(String(tmpNode.offsetHeight));
        tmpNode.parentNode.removeChild(tmpNode);
    }

    conversionPx(value): number {
        let inch = value;
        if (this.data.units === 'mm') {
            inch = value / 25.4;
        }
        return inch * this.arrDPI[0];
    }

    checkData() {
        if (this.data.PageWidth <= 0 && this.data.PageHeight <= 0) {
            this.error = 'Page size is too small';
        }
        if (this.data.LabelWidth <= 0 && this.data.LabelHeight <= 0) {
            this.error = 'Label size is too small';
        }
        if (this.data.LabelWidth > this.data.PageWidth) {
            this.error = 'Label width is too large for the page';
        }
        if (this.data.LabelHeight > this.data.PageHeight) {
            this.error = 'Label height is too large for the page';
        }
        if (this.data.LabelWidth + this.data.PageLeftMargin > this.data.PageWidth) {
            this.error = 'Label width is too large for the page';
        }
        if (this.data.LabelHeight + this.data.PageTopMargin > this.data.PageHeight) {
            this.error = 'Label height is too large for the page';
        }
        if (this.error) {
            return;
        }
        const ratio = (this.conversionPx(this.data.PageWidth) - 952) > 0 ? (952 / this.conversionPx(this.data.PageWidth)) : 1;
        this.generalData.fPageWidth = Number((this.conversionPx(this.data.PageWidth) * ratio).toFixed(2)) + 2;
        this.generalData.fPageHeight = Number((this.conversionPx(this.data.PageHeight) * ratio).toFixed(2)) + 2;
        this.generalData.fLabelWidth = Number((this.conversionPx(this.data.LabelWidth) * ratio).toFixed(2));
        this.generalData.fLabelHeight = Number((this.conversionPx(this.data.LabelHeight) * ratio).toFixed(2));
        this.generalData.fPageTopMargin = Number((this.conversionPx(this.data.PageTopMargin) * ratio).toFixed(2));
        this.generalData.fPageLeftMargin = Number((this.conversionPx(this.data.PageLeftMargin) * ratio).toFixed(2));
        this.generalData.fGapDistanceX = Number((this.conversionPx(this.data.GapDistanceX) * ratio).toFixed(2));
        this.generalData.fGapDistanceY = Number((this.conversionPx(this.data.GapDistanceY) * ratio).toFixed(2));
        this.calc();
    }
}


class DocumentData {
    constructor(
        public fPageWidth: number,
        public fPageHeight: number,
        public fLabelWidth: number,
        public fLabelHeight: number,
        public fPageTopMargin: number,
        public fPageLeftMargin: number,
        public fGapDistanceX: number,
        public fGapDistanceY: number,
    ) {
    }
}

interface ItemPrintPreview {
    Border: string;
    Item: Item;
    PageWidth: number;
    PageHeight: number;
    LabelWidth: number;
    LabelHeight: number;
    PageTopMargin: number;
    PageLeftMargin: number;
    GapDistanceX: number;
    GapDistanceY: number;
    Quantity: number;
    units: string;
}
