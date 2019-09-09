import { Component, OnInit, OnDestroy, ViewChild, Inject, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { PurchaseOrderLine } from '../../shared/class/purchase-order-line';
import { PurchaseOrder, PurchaseOrderLine } from '../../../../shared/class/purchase-order';
import { PurchaseOrderService } from '../../../purchase-order.service';
import { environment } from '../../../../../environments/environment';
import { ItemList } from '../../../../shared/class/item';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'o-inbound-shipment-edit-line-list',
  templateUrl: './inbound-shipment-edit-line-list.component.html',
  styleUrls: ['./inbound-shipment-edit-line-list.component.css', './inbound-shipment-edit.component.css']
})

export class InboundShipmentEditLineListComponent implements OnInit {
    errorMessage: string;
    purchaseorder: PurchaseOrder;
    purchaseorderid: number;
    //purchaseorderlines: PurchaseOrderLine[];
    orderStatus: string;
    
    private linkURL = environment.linkURL;

    //displayedColumns = ['Incomplete', 'ItemName', 'ItemVendorSKU', 'TPIN', 'FOBPrice', 'Quantity', 'CartonQuantity', 'ReceivedQty', 'Label', 'Edit', 'Delete'];
    //displayedColumns = ['Add', 'Incomplete', 'ItemName', 'ItemVendorSKU', 'TPIN', 'FOBPrice', 'Quantity', 'CartonQuantity', 'ReceivedQty', 'Label', 'Delete'];
    //displayedColumns = ['Add', 'Incomplete', 'ProductDetails', 'FOBPrice', 'Quantity', 'CartonQuantity', 'ReceivedQty', 'Label', 'Delete']
    displayedColumns = ['Add', 'Incomplete', 'ProductDetails', 'FOBPrice', 'Quantity', 'CartonQuantity', 'ReceivedQty', 'Actions'];
    dataSource: any = null;
    
    PendingAdd: boolean;
    currentIndex: number;

    itemList: ItemList[];

    formDirty = false;
    
    @ViewChild('lineItemIDRef', { static: false }) lineItemIDRef: ElementRef;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    constructor(private route: ActivatedRoute,
        private purchaseOrderService: PurchaseOrderService,
        public itemPrintDialog: MatDialog) {
    }

    ngOnInit() {
        this.purchaseorderid = this.route.parent.parent.snapshot.params['id'];

        this.purchaseOrderService.getCurrentPurchaseOrderEdit(this.purchaseorderid).subscribe(
            (purchaseorder: PurchaseOrder) => {
                this.purchaseOrderService.currentPurchaseOrderEdit = purchaseorder;
                this.purchaseorder = this.purchaseOrderService.currentPurchaseOrderEdit;
                this.initialize();
            },
            (error: any) => this.errorMessage = <any>error
        );

        // this.purchaseOrderService.getPurchaseOrderLines(this.purchaseorderid).subscribe(
        //     (purchaseorderlines: PurchaseOrderLine[]) => {
        //         this.purchaseorderlines = purchaseorderlines;
        //         this.refreshDataSource(this.purchaseorderlines);
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );
        // this.purchaseOrderService.getPurchaseOrder(this.purchaseorderid).subscribe(
        //     (purchaseorder: PurchaseOrder) => {
        //         this.orderStatus  = purchaseorder.Status;
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );
    }

    initialize() {
        this.purchaseOrderService.getPurchaseOrder(this.purchaseorderid).subscribe(
            (purchaseorder: PurchaseOrder) => {
                this.orderStatus  = purchaseorder.Status;
            },
            (error: any) => this.errorMessage = <any>error
        );

        this.purchaseOrderService.getSimpleItemList().subscribe(
            (itemlist: ItemList[]) => {
                this.itemList = itemlist;
            },
            (error: any) => this.errorMessage = <any>error
        );
        if (this.purchaseOrderService.currentPurchaseOrderEdit.PurchaseOrderLines === null) {
            this.purchaseOrderService.getPurchaseOrderLines(this.purchaseorderid).subscribe(
                (purchaseorderlines: PurchaseOrderLine[]) => {
                    this.purchaseorder.PurchaseOrderLines = purchaseorderlines;  
                    
                    this.purchaseorder.PurchaseOrderLines.forEach((value) => {
                        value.PrevItemID = value.ItemID;
                    });
                    
                    this.addPendingLine();      
                    this.currentIndex = this.purchaseorder.PurchaseOrderLines.length - 1;              
                    this.refreshDataSource(this.purchaseorder.PurchaseOrderLines);                    
                },
                (error: any) => this.errorMessage = <any>error
            );
        } else {
            this.purchaseOrderService.updatePurchaseLineCartonQuantity();
            this.purchaseorder.PurchaseOrderLines.forEach((value) => {
                value.PrevItemID = value.ItemID;
            });

            this.removePendingLine();
            this.addPendingLine();          
            this.currentIndex = this.purchaseorder.PurchaseOrderLines.length - 1;  
            this.refreshDataSource(this.purchaseorder.PurchaseOrderLines);
        }        
    }

    addPendingLine() {
        const _temp = new PurchaseOrderLine(null, this.purchaseorderid, null, null, null, null, null, null, 1, 0, null, null, null, null, true);
        this.purchaseorder.PurchaseOrderLines.push(_temp);   
    }

    removePendingLine() {
        const foundIndex = this.purchaseorder.PurchaseOrderLines.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.purchaseorder.PurchaseOrderLines.splice(foundIndex, 1);
        }
    }

    onAddPurchaseOrderLine(PurchaseOrderLine: PurchaseOrderLine) {
        if (this.isRequirementValid(PurchaseOrderLine)) { 
            if(!this.existItem(PurchaseOrderLine.ItemID, true)) {        
                this.PendingAdd = true;
                PurchaseOrderLine.pendingAdd = false;
                PurchaseOrderLine.PrevItemID = PurchaseOrderLine.ItemID;
                
                this.addPendingLine();
                this.refreshDataSource(this.purchaseorder.PurchaseOrderLines);

                this.purchaseOrderService.currentPurchaseLineIsUpdated = true;
            }
            else {
                this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: "Item already exists" });
            }   
        }
    }

    isRequirementValid(PurchaseOrderLine: PurchaseOrderLine): boolean {
        if (PurchaseOrderLine && PurchaseOrderLine.ItemID) {
            if(PurchaseOrderLine.Quantity > 0) {
                return true;
            }
            else {
                this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: "Please enter quantity" });
                return false;
            }
        } 
        else {
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: "Please select an item" });
            return false;
        }
    }

    onEditPurchaseOrderLine(index: number) {
        if(this.PendingAdd) {
            this.currentIndex = this.purchaseorder.PurchaseOrderLines.length - 1;
            this.PendingAdd = false;
        }
        else {
            this.currentIndex = index;
        }    
    }
    
    refreshDataSource(purchaseorderlines: PurchaseOrderLine[]) {
        this.dataSource = new MatTableDataSource<PurchaseOrderLine>(purchaseorderlines);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    // onItemChange(newValue: number, purchaseorderline: PurchaseOrderLine) {
    //     const selectedItem = this.itemList.find(x => x.ItemID === newValue);
    //     if (selectedItem) {
    //         purchaseorderline.ItemName = selectedItem.ItemName;
    //         purchaseorderline.ItemVendorSKU = selectedItem.VendorSKU;
    //         purchaseorderline.TPIN = selectedItem.TPIN;
    //         purchaseorderline.FOBPrice = selectedItem.FOBPrice;
    //     }
    // }

    onItemChange(purchaseorderline: PurchaseOrderLine, index: number) {        
        if(!this.existItem(purchaseorderline.ItemID)) {
            const selectedItem = this.itemList.find(x => x.ItemID === purchaseorderline.ItemID);
            if (selectedItem) {
                purchaseorderline.ItemName = selectedItem.ItemName;
                purchaseorderline.ItemVendorSKU = selectedItem.VendorSKU;
                purchaseorderline.TPIN = selectedItem.TPIN;
                purchaseorderline.FOBPrice = selectedItem.FOBPrice;
                
                if(index != this.purchaseorder.PurchaseOrderLines.length - 1) {
                    this.purchaseOrderService.currentPurchaseLineIsUpdated = true;
                }
            }
        }        
        else {
            purchaseorderline.ItemID = purchaseorderline.PrevItemID;
            // const selectedItem = this.itemList.find(x => x.ItemID === purchaseorderline.ItemID);
            // if (selectedItem) {
            //     purchaseorderline.ItemName = selectedItem.ItemName;
            //     purchaseorderline.ItemVendorSKU = selectedItem.VendorSKU;
            //     purchaseorderline.TPIN = selectedItem.TPIN;
            //     purchaseorderline.FOBPrice = selectedItem.FOBPrice;
            // }                

            this.currentIndex = this.purchaseorder.PurchaseOrderLines.length - 1;
            this.refreshDataSource(this.purchaseorder.PurchaseOrderLines);
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: "Item already exists" });
        }
    }

    existItem(itemID: number, isNew: boolean = false){
        var counter: number = 0;
        this.purchaseorder.PurchaseOrderLines.forEach((value, index) => {
                if(value.ItemID === itemID) {
                    if(isNew || index != this.purchaseorder.PurchaseOrderLines.length - 1) {
                        counter += 1; 
                    }
                }
            }
        );
        if(counter > 1) { return true; }
        else { return false; }
    }

    openDialogPrintItemLabel(purchaseorderline: PurchaseOrderLine) {
        const dialogRef = this.itemPrintDialog.open(InboundShipmentEditLineComponentItemPrintDialog, {
          width: '250px',
          data: purchaseorderline          
        });
    
        dialogRef.afterClosed().subscribe(result => {
            if (result && result.Quantity > 0) {
                if(result.Size === "small") {
                    this.onPrintLabel(purchaseorderline, result.Quantity, result.Border);
                }
                else {
                    this.onPrintLargeLabel(purchaseorderline, result.Quantity, result.Border);
                }
            }
        });
    }

    onPrintLabel(purchaseorderline: PurchaseOrderLine, count: number, border: string) {
        this.purchaseOrderService.downloadItemLabelCount(purchaseorderline.ItemID, count, border).subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = purchaseorderline.TPIN;
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
                    a.download = purchaseorderline.TPIN;
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }

    onPrintLargeLabel(purchaseorderline: PurchaseOrderLine, count: number, border: string) {
        this.purchaseOrderService.downloadItemLargeLabelCount(purchaseorderline.ItemID, count, border).subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = purchaseorderline.TPIN;
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
                    a.download = purchaseorderline.TPIN;
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }
    scrollToElement($element): void {
        $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
    // onRemovePurchaseOrderLine(purchaseorderline: PurchaseOrderLine) {
    //     const confirmation = confirm(`Remove ${purchaseorderline.ItemName}?`);
    //     if (confirmation) {
    //         this.purchaseOrderService.deletePurchaseOrderLine(purchaseorderline.PurchaseOrderLineID).subscribe(
    //             () => {
    //                 this.onDeleteComplete(purchaseorderline, `${purchaseorderline.PurchaseOrderLineID} was deleted`);
    //             },
    //             (error: any) => {
    //                 this.errorMessage = <any>error;
    //                 this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
    //                 window.location.reload();
    //             }
    //         );
    //     }
    // }

    onRemovePurchaseOrderLine(purchaseorderline: PurchaseOrderLine, index: number) {
        const confirmation = confirm(`Remove ${purchaseorderline.ItemName}?`);
        if (confirmation) {
            this.purchaseorder.PurchaseOrderLines.splice(index, 1);
            this.refreshDataSource(this.purchaseorder.PurchaseOrderLines);

            this.purchaseOrderService.currentPurchaseLineIsUpdated = true;
        }        
    }

    // onDeleteComplete(purchaseorderline: PurchaseOrderLine, message?: string): void {
    //     // this.purchaseorderlines.splice(this.purchaseorderlines.indexOf(purchaseorderline), 1);
    //     this.refreshDataSource(this.purchaseorder.PurchaseOrderLines);
    //     this.purchaseOrderService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: message });
    // }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    clearFields(form) {
        form.ItemID = null;
        this.formDirty = false;
        
        //this.lineItemIDRef.nativeElement.value = "0: null";
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
//quantity: number;
itemLabelPrintDialog: ItemLabelPrintDialog;

    constructor(
        public dialogRef: MatDialogRef<InboundShipmentEditLineComponentItemPrintDialog>,
        @Inject(MAT_DIALOG_DATA) public data: PurchaseOrderLine) {
        
        }
    ngOnInit() {
        this.itemLabelPrintDialog = new ItemLabelPrintDialog("small", this.data.Quantity, "yes");
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}
