import { Component, OnInit, OnChanges, ViewChild, Inject, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseOrder, PurchaseOrderLine } from '../../../../shared/class/purchase-order';
import { PurchaseOrderService } from '../../../purchase-order.service';
import { environment } from '../../../../../environments/environment';
import { ItemList } from '../../../../shared/class/item';
import { SimpleChanges } from '@angular/core';

@Component({
selector: 'o-inbound-shipment-edit-line-list',
templateUrl: './inbound-shipment-edit-line-list.component.html',
})

export class InboundShipmentEditLineListComponent implements OnInit, OnChanges {

    @Input() purchaseOrder: PurchaseOrder;
    @Input() errorMessage: string;
    @Input() isLoading: boolean;
    @Input() itemList: ItemList[];
    @Output() getSimpleItemList = new EventEmitter<void>();
    @Output() getPurchaseOrderLines = new EventEmitter<number>();
    @Output() downloadItemLabelCount = new EventEmitter<{purchaseorderline: PurchaseOrderLine, count: number, border: string}>();
    @Output() downloadItemLargeLabelCount = new EventEmitter<{purchaseorderline: PurchaseOrderLine, count: number, border: string}>();
    @Output() setSelectedPurchaseOrder = new EventEmitter<PurchaseOrder>();
    purchaseorderid: number;
    private linkURL = environment.linkURL;
    displayedColumns = ['Add', 'Incomplete', 'ProductDetails', 'FOBPrice', 'Quantity', 'CartonQuantity', 'ReceivedQty', 'Actions'];
    dataSource: any = null;

    PendingAdd: boolean;
    currentIndex: number;
    formDirty = false;

    @ViewChild('lineItemIDRef', { static: false }) lineItemIDRef: ElementRef;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    constructor(private route: ActivatedRoute,
        private purchaseOrderService: PurchaseOrderService,
        public itemPrintDialog: MatDialog) {
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes.purchaseOrder && changes.purchaseOrder.currentValue && (!changes.purchaseOrder.currentValue.PurchaseOrderLines.length
                || changes.purchaseOrder.currentValue.PurchaseOrderLines[changes.purchaseOrder.currentValue.PurchaseOrderLines.length - 1].PurchaseOrderLineID)) {
            this.addPendingLine();
            this.currentIndex = this.purchaseOrder.PurchaseOrderLines.length - 1;
            this.refreshDataSource(this.purchaseOrder.PurchaseOrderLines);
        }
        if (changes.purchaseOrder && changes.purchaseOrder.currentValue) {

            if (!this.purchaseOrder.PurchaseOrderLines || !this.purchaseOrder.PurchaseOrderLines.length) {
                this.getPurchaseOrderLines.emit(this.route.parent.snapshot.params['id']);
            }
            if (!this.purchaseOrder.PurchaseOrderLines.length || this.purchaseOrder.PurchaseOrderLines[this.purchaseOrder.PurchaseOrderLines.length - 1].PurchaseOrderID) {
                this.refreshDataSource(this.purchaseOrder.PurchaseOrderLines);
                this.currentIndex = this.purchaseOrder.PurchaseOrderLines.length - 1;
            }
        }
        if (changes.itemList && !this.itemList.length) {
            this.getSimpleItemList.emit();
        }
    }
    ngOnInit() {
        //this.setSelectedPurchaseOrder.emit(null);
        this.purchaseorderid = this.route.parent.snapshot.params['id'];
    }
    addPendingLine() {
        const _temp = new PurchaseOrderLine(null, this.purchaseorderid, null, null, null, null, null, null, 1, 0, null, null, null, null, true);
        this.purchaseOrder.PurchaseOrderLines.push(_temp);
        this.refreshDataSource(this.purchaseOrder.PurchaseOrderLines);
    }

    removePendingLine() {
        const foundIndex = this.purchaseOrder.PurchaseOrderLines.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.purchaseOrder.PurchaseOrderLines.splice(foundIndex, 1);
        }
    }

    onAddPurchaseOrderLine(PurchaseOrderLine: PurchaseOrderLine) {
        if (this.isRequirementValid(PurchaseOrderLine)) {
            if (!this.existItem(PurchaseOrderLine.ItemID, true)) {
                this.PendingAdd = true;
                PurchaseOrderLine.pendingAdd = false;
                PurchaseOrderLine.PrevItemID = PurchaseOrderLine.ItemID;

                this.addPendingLine();
                this.refreshDataSource(this.purchaseOrder.PurchaseOrderLines);

                this.purchaseOrderService.currentPurchaseLineIsUpdated = true;
            } else {
                this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: 'Item already exists' });
            }
        }
    }

    isRequirementValid(PurchaseOrderLine: PurchaseOrderLine): boolean {
        if (PurchaseOrderLine && PurchaseOrderLine.ItemID) {
            if (PurchaseOrderLine.Quantity > 0) {
                return true;
            } else {
                this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: 'Please enter quantity' });
                return false;
            }
        } else {
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: 'Please select an item' });
            return false;
        }
    }

    onEditPurchaseOrderLine(index: number) {
        if (this.PendingAdd) {
            this.currentIndex = this.purchaseOrder.PurchaseOrderLines.length - 1;
            this.PendingAdd = false;
        } else {
            this.currentIndex = index;
        }
    }

    refreshDataSource(purchaseorderlines: PurchaseOrderLine[]) {
        this.dataSource = new MatTableDataSource<PurchaseOrderLine>(purchaseorderlines);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    onItemChange(purchaseorderline: PurchaseOrderLine, index: number) {
        if (!this.existItem(purchaseorderline.ItemID)) {
            const selectedItem = this.itemList.find(x => x.ItemID === purchaseorderline.ItemID);
            if (selectedItem) {
                purchaseorderline.ItemName = selectedItem.ItemName;
                purchaseorderline.ItemVendorSKU = selectedItem.VendorSKU;
                purchaseorderline.TPIN = selectedItem.TPIN;
                purchaseorderline.FOBPrice = selectedItem.FOBPrice;

                if (index != this.purchaseOrder.PurchaseOrderLines.length - 1) {
                    this.purchaseOrderService.currentPurchaseLineIsUpdated = true;
                }
            }
        } else {
            purchaseorderline.ItemID = purchaseorderline.PrevItemID;
            this.currentIndex = this.purchaseOrder.PurchaseOrderLines.length - 1;
            this.refreshDataSource(this.purchaseOrder.PurchaseOrderLines);
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: 'Item already exists' });
        }
    }

    existItem(itemID: number, isNew: boolean = false) {
        let counter: number = 0;
        this.purchaseOrder.PurchaseOrderLines.forEach((value, index) => {
                if (value.ItemID === itemID) {
                    if (isNew || index != this.purchaseOrder.PurchaseOrderLines.length - 1) {
                        counter += 1;
                    }
                }
            }
        );
        if (counter > 1) { return true; } else { return false; }
    }

    openDialogPrintItemLabel(purchaseorderline: PurchaseOrderLine) {
        const dialogRef = this.itemPrintDialog.open(InboundShipmentEditLineComponentItemPrintDialog, {
          width: '250px',
          data: purchaseorderline
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.Quantity > 0) {
                if (result.Size === 'small') {
                    this.onPrintLabel(purchaseorderline, result.Quantity, result.Border);
                } else {
                    this.onPrintLargeLabel(purchaseorderline, result.Quantity, result.Border);
                }
            }
        });
    }

    onPrintLabel(purchaseorderline: PurchaseOrderLine, count: number, border: string) {
        this.downloadItemLabelCount.emit({purchaseorderline, count, border});
    }

    onPrintLargeLabel(purchaseorderline: PurchaseOrderLine, count: number, border: string) {
        this.downloadItemLargeLabelCount.emit({purchaseorderline, count, border});
    }
    scrollToElement($element): void {
        $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }
    onRemovePurchaseOrderLine(purchaseorderline: PurchaseOrderLine, index: number) {
        const confirmation = confirm(`Remove ${purchaseorderline.ItemName}?`);
        if (confirmation) {
            this.purchaseOrder.PurchaseOrderLines.splice(index, 1);
            this.refreshDataSource(this.purchaseOrder.PurchaseOrderLines);

            this.purchaseOrderService.currentPurchaseLineIsUpdated = true;
        }
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    clearFields(form) {
        form.ItemID = null;
        this.formDirty = false;
        form.FOBPrice = '';
        form.Quantity = 1;
    }
}

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

export class InboundShipmentEditLineComponentItemPrintDialog implements OnInit {
itemLabelPrintDialog: ItemLabelPrintDialog;

    constructor(
        public dialogRef: MatDialogRef<InboundShipmentEditLineComponentItemPrintDialog>,
        @Inject(MAT_DIALOG_DATA) public data: PurchaseOrderLine) {

        }
    ngOnInit() {
        this.itemLabelPrintDialog = new ItemLabelPrintDialog('small', this.data.Quantity, 'yes');
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}
