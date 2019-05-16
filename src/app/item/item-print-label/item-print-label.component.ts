import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Item, ItemPrintLabel, ItemList } from '../../shared/class/item';
import { Subscription } from 'rxjs';

import { ItemService } from '../item.service';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'o-item-print-label',
    templateUrl: './item-print-label.component.html'
})

export class ItemPrintLabelComponent implements OnInit  {
    errorMessage: string;
    itemPrintLabels: ItemPrintLabel[];
    itemList: ItemList[];

    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;

    PendingAdd: boolean;   
    currentIndex: number;

    displayedColumns = ['Add', 'ProductDetails','Quantity', 'Remove'];
    dataSource: any = null;

    formDirty = false;
    
    constructor(private route: ActivatedRoute,
        private router: Router,
        private itemService: ItemService,
        public printDialog: MatDialog) { }

    ngOnInit(): void {
        this.itemPrintLabels = [];
        this.addPendingLine();          
        this.currentIndex = 0;

        this.itemService.getItemList().subscribe(
            (itemlist: ItemList[]) => {
                this.itemList = itemlist;
                this.refreshDataSource(this.itemPrintLabels); 
            },
            (error: any) => this.errorMessage = <any>error
        );     
    }

    refreshDataSource(itemPrintLabels: ItemPrintLabel[]) {        
        this.dataSource = new MatTableDataSource<ItemPrintLabel>(itemPrintLabels);
    }

    addPendingLine() {
        const _temp = new ItemPrintLabel(null, null, null, null, null, null, 1, true);
        this.itemPrintLabels.push(_temp);   
    }

    removePendingLine() {
        const foundIndex = this.itemPrintLabels.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.itemPrintLabels.splice(foundIndex, 1);
        }
    }

    onItemChange(index: number) {      
        this.itemService.getItem(this.itemPrintLabels[index].ItemID).subscribe(
            (item: Item) => {
                this.itemPrintLabels[index].ItemName = item.Name;
                this.itemPrintLabels[index].ItemVendorSKU = item.VendorSKU;
                this.itemPrintLabels[index].TPIN = item.TPIN;
                this.itemPrintLabels[index].URLKey = item.URLKey;
                this.itemPrintLabels[index].ItemImage = item.ImagePath;
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
        this.refreshDataSource(this.itemPrintLabels);
    }

    onEditItemPrintLabel(index: number) {
        if(this.PendingAdd) {
            this.currentIndex = this.itemPrintLabels.length - 1;
            this.PendingAdd = false;
        }
        else {
            this.currentIndex = index;
        }    
    }

    onRemoveItemPrintLabel(index: number) {
        this.itemPrintLabels.splice(index, 1);
        this.refreshDataSource(this.itemPrintLabels);
    }

    clearFields() {
        this.formDirty = false;
        this.removePendingLine();
        this.addPendingLine();
        this.refreshDataSource(this.itemPrintLabels);
    }

    openDialogPrintLabel() {
        const dialogRef = this.printDialog.open(ItemPrintLabelComponentPrintDialog, {
          width: '250px'
        });
    
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if(result.Size === "small") {
                    this.onPrintLabels(result.Border);
                }
                else {
                    this.onPrintLargeLabels(result.Border);
                }
            }
        });
    }

    onPrintLabels(border: string) {
        this.itemService.downloadPrintItemLabels(this.itemPrintLabels, border).subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = String(Date.now());
                    window.navigator.msSaveOrOpenBlob(data, fileName + '.pdf'); // IE is the worst!!!
                } else {
                    // const iframe = document.createElement('iframe');
                    // iframe.style.display = 'none';
                    // iframe.src = blobUrl;
                    // document.body.appendChild(iframe);

                    // iframe.onload = (function() {
                    //     iframe.contentWindow.focus();
                    //     iframe.contentWindow.print();
                    // });
                    const fileURL = window.URL.createObjectURL(blob);
                    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
                    a.href = fileURL;
                    a.download = String(Date.now());//this.datepipe.transform(date, 'yyyyMMddhhmmss');
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }

    onPrintLargeLabels(border: string) {
        this.itemService.downloadPrintItemLargeLabels(this.itemPrintLabels, border).subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = String(Date.now());
                    window.navigator.msSaveOrOpenBlob(data, fileName + '.pdf'); // IE is the worst!!!
                } else {
                    // const iframe = document.createElement('iframe');
                    // iframe.style.display = 'none';
                    // iframe.src = blobUrl;
                    // document.body.appendChild(iframe);

                    // iframe.onload = (function() {
                    //     iframe.contentWindow.focus();
                    //     iframe.contentWindow.print();
                    // });
                    const fileURL = window.URL.createObjectURL(blob);
                    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
                    a.href = fileURL;
                    a.download = String(Date.now());
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }
}

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
//quantity: number;
    itemLabelPrintDialog: ItemLabelPrintDialog;

    constructor(
        public dialogRef: MatDialogRef<ItemPrintLabelComponentPrintDialog>) {
        
        }
    ngOnInit() {
        this.itemLabelPrintDialog = new ItemLabelPrintDialog("small", "yes");
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}


