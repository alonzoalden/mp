import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Item, ItemPrintLabel, ItemList } from '../../../../shared/class/item';
import { ItemService } from '../../item.service';
import { environment } from '../../../../../environments/environment';
import { Member } from '../../../../shared/class/member';
import { ItemPrintLabelComponentPrintDialog } from './item-print-label.component-print-dialog';

@Component({
    selector: 'o-item-print-label',
    templateUrl: './item-print-label.component.html'
})

export class ItemPrintLabelComponent implements OnInit, OnChanges {
    @Input() userInfo: Member;
    @Input() itemPrintLabelsMatTable: MatTableDataSource<ItemPrintLabel>;
    @Input() itemList: ItemList[];
    @Input() errorMessage: string;
    @Input() isLoading: boolean;
    @Output() getItemList = new EventEmitter<void>();
    @Output() downloadPrintItemLabels = new EventEmitter<{labels: ItemPrintLabel[], border: string}>();
    @Output() downloadPrintItemLargeLabels = new EventEmitter<{labels: ItemPrintLabel[], border: string}>();
    imageURL = environment.imageURL;
    linkURL = environment.linkURL;
    PendingAdd: boolean;
    currentIndex: number;
    displayedColumns = ['Add', 'ProductDetails', 'Quantity', 'Remove'];
    formDirty = false;

    constructor(
        private itemService: ItemService,
        public printDialog: MatDialog) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.itemPrintLabelsMatTable && !changes.itemPrintLabelsMatTable.currentValue.data.length) {
            this.addPendingLine();
        }
    }

    ngOnInit(): void {
        this.currentIndex = 0;
        this.getItemList.emit();

    }

    refreshDataSource(itemPrintLabels: ItemPrintLabel[]) {
        this.itemPrintLabelsMatTable = new MatTableDataSource<ItemPrintLabel>(itemPrintLabels);
    }

    addPendingLine() {
        const _temp = new ItemPrintLabel(null, null, null, null, null, null, 1, true);
        this.itemPrintLabelsMatTable.data.push(_temp);
    }

    removePendingLine() {
        const foundIndex = this.itemPrintLabelsMatTable.data.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.itemPrintLabelsMatTable.data.splice(foundIndex, 1);
        }
    }

    onItemChange(index: number) {
        this.itemService.getItem(this.itemPrintLabelsMatTable.data[index].ItemID).subscribe(
            (item: Item) => {
                this.itemPrintLabelsMatTable.data[index].ItemName = item.Name;
                this.itemPrintLabelsMatTable.data[index].ItemVendorSKU = item.VendorSKU;
                this.itemPrintLabelsMatTable.data[index].TPIN = item.TPIN;
                this.itemPrintLabelsMatTable.data[index].URLKey = item.URLKey;
                this.itemPrintLabelsMatTable.data[index].ItemImage = item.ImagePath;
            },
            (error: any) => {
                this.errorMessage = <any>error;
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
            }
        );
    }

    onAddItemPrintLabel(itemPrintLabel: ItemPrintLabel) {
        this.PendingAdd = true;
        itemPrintLabel.pendingAdd = false;

        this.addPendingLine();
        this.refreshDataSource(this.itemPrintLabelsMatTable.data);
    }

    onEditItemPrintLabel(index: number) {
        if (this.PendingAdd) {
            this.currentIndex = this.itemPrintLabelsMatTable.data.length - 1;
            this.PendingAdd = false;
        } else {
            this.currentIndex = index;
        }
    }

    onRemoveItemPrintLabel(index: number) {
        this.itemPrintLabelsMatTable.data.splice(index, 1);
        this.refreshDataSource(this.itemPrintLabelsMatTable.data);
    }

    clearFields() {
        this.formDirty = false;
        this.removePendingLine();
        this.addPendingLine();
        this.refreshDataSource(this.itemPrintLabelsMatTable.data);
    }

    openDialogPrintLabel() {
        const dialogRef = this.printDialog.open(ItemPrintLabelComponentPrintDialog, {
          width: '250px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (result.Size === 'small') {
                    this.onPrintLabels(result.Border);
                } else {
                    this.onPrintLargeLabels(result.Border);
                }
            }
        });
    }

    onPrintLabels(border: string) {
        this.downloadPrintItemLabels.emit({labels: this.itemPrintLabelsMatTable.data, border: border});
    }

    onPrintLargeLabels(border: string) {
        this.downloadPrintItemLargeLabels.emit({labels: this.itemPrintLabelsMatTable.data, border: border});
    }
}