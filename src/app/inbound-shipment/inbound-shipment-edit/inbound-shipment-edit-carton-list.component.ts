import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PurchaseOrder, Carton, CartonInsert, CartonLine, CartonLineInsert, PurchaseOrderLineList } from '../../shared/class/purchase-order';
import { PurchaseOrderService } from '../purchase-order.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'o-inbound-shipment-edit-carton-list',
    templateUrl: './inbound-shipment-edit-carton-list.component.html'
})

export class InboundShipmentEditCartonListComponent implements OnInit {
    //cartons: Carton[];
    errorMessage: string;
    purchaseorder: PurchaseOrder;
    purchaseorderid: number;
    pendingCopy: boolean;

    orderStatus: string;
    pendingAdd: boolean;
    currentIndex: number;

    //displayedColumns = ['Add', 'Down', 'Position', 'Up', 'CartonNumber', 'Weight', 'Dimension', 'LabelQty', 'Label', 'Copy', 'Delete'];
    //displayedColumns = ['Add', 'Down', 'Position', 'Up', 'Weight', 'Dimension', 'LabelQty', 'CartonNumber', 'TotalUnits', 'Actions'];  
    displayedColumns = ['Add', 'Position', 'Weight', 'Dimension', 'LabelQty', 'CartonNumber', 'TotalUnits', 'Actions'];  
    dataSource: any = null;

    formDirty = false;
    canAdd = false;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private purchaseOrderService: PurchaseOrderService,
                public cartonPrintDialog: MatDialog) { }

    ngOnInit() {
        this.purchaseorderid = this.route.parent.snapshot.params['id'];

        this.purchaseOrderService.getCurrentPurchaseOrderEdit(this.purchaseorderid).subscribe(
            (purchaseorder: PurchaseOrder) => {
                this.purchaseOrderService.currentPurchaseOrderEdit = purchaseorder;
                this.purchaseorder = this.purchaseOrderService.currentPurchaseOrderEdit;
                this.initialize();
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    initialize() {
        this.purchaseOrderService.getPurchaseOrder(this.purchaseorderid).subscribe(
            (purchaseorder: PurchaseOrder) => {
                this.orderStatus  = purchaseorder.Status;
            },
            (error: any) => this.errorMessage = <any>error
        );

        if (this.purchaseOrderService.currentPurchaseOrderEdit.PurchaseOrderLines === null) {
            this.purchaseOrderService.getCartons(this.purchaseorderid).subscribe(
                (cartons: Carton[]) => {

                    cartons.forEach((c) => {
                        c.CartonLines.forEach((cl) => {
                            cl.PrevPurchaseOrderLineID = cl.PurchaseOrderLineID;
                            this.addPendingCartonLine(c);
                        })
                    });
                    
                    this.purchaseorder.Cartons = cartons;                    
                    this.addPendingLine();                    
                    this.refreshDataSource(this.purchaseorder.Cartons);                                     
                },
                (error: any) => this.errorMessage = <any>error
            );
        } else {
            this.removePendingLine();
            this.addPendingLine();            
            this.refreshDataSource(this.purchaseorder.Cartons);
        }        

        this.currentIndex = this.purchaseorder.Cartons.length - 1;
        this.purchaseOrderService.currentCarton.next(null);
        this.purchaseOrderService.currentCartonLines.next([]);
        this.purchaseOrderService.currentCartonID = null;
    }

    getTotalQuantity(cartonLines: CartonLine[]) {
        return cartonLines.filter(c => !c.pendingAdd).map(i => i.Quantity).reduce((a,b) => a+b, 0);
    }

    addPendingLine() {
        const _temp = new Carton(null, this.purchaseorderid, null, null, null, null, null, null, null, 4, null, null, [], true);
        this.purchaseorder.Cartons.push(_temp);   
    }

    removePendingLine() {
        const foundIndex = this.purchaseorder.Cartons.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.purchaseorder.Cartons.splice(foundIndex, 1);
        }
    }

    openDialogCartonLine(carton: Carton, index: number) {
        const dialogRef = this.cartonPrintDialog.open(InboundShipmentEditCartonListComponentCartonLineDialog, {
            width: '750px',
            data: carton
          });

        dialogRef.afterClosed().subscribe(() => {
            this.onShowCartonLine(carton, index);
        });
    }

    openDialogPrintCartonLabel(carton: Carton) {
        const dialogRef = this.cartonPrintDialog.open(InboundShipmentEditCartonListComponentCartonPrintDialog, {
          width: '250px',
          data: carton
        });
    
        dialogRef.afterClosed().subscribe(result => {
            //console.log(result);
            
            if (result && result.Quantity > 0) {
                //this.onPrintLabel(carton, result.Quantity, result.Border);
                this.saveAndPrint(carton, result.Quantity, result.Border);
            }
        });
    }

    saveAndPrint(carton: Carton, quantity: number, border: string) {
        const newPurchaseOrder = this.purchaseOrderService.copyPurchaseOrder(this.purchaseorder);

        if (newPurchaseOrder.PurchaseOrderLines) {
            const pendingPurchaseOrderLineIndex = newPurchaseOrder.PurchaseOrderLines.findIndex(i => i.pendingAdd === true);
            if (pendingPurchaseOrderLineIndex > -1) {
                newPurchaseOrder.PurchaseOrderLines.splice(pendingPurchaseOrderLineIndex, 1);
            }
        }

        if (newPurchaseOrder.Cartons) {
            const pendingCartonIndex = newPurchaseOrder.Cartons.findIndex(i => i.pendingAdd === true);
            if (pendingCartonIndex > -1) {
                newPurchaseOrder.Cartons.splice(pendingCartonIndex, 1);

                newPurchaseOrder.Cartons.forEach((c, i) => {
                    c.Position = i + 1;

                    if(c.CartonLines) {
                        const pendingCartonLineIndex = c.CartonLines.findIndex(i => i.pendingAdd === true);
                        if (pendingCartonLineIndex > -1) {
                            c.CartonLines.splice(pendingCartonLineIndex, 1);
                        }
                    }
                });
            }
        }
        this.purchaseOrderService.editPurchaseOrder(newPurchaseOrder).subscribe(
            (purchaseorder: PurchaseOrder) => {
                this.purchaseOrderService.replacePurchaseOrder(purchaseorder.PurchaseOrderID, purchaseorder);
                this.purchaseOrderService.currentPurchaseOrderEdit = purchaseorder;
                this.purchaseorder = this.purchaseOrderService.currentPurchaseOrderEdit;
                this.purchaseOrderService.currentPurchaseLineIsUpdated = false;
                
                this.removePendingLine();
                this.addPendingLine();            
                this.refreshDataSource(this.purchaseorder.Cartons);
                
                this.onPrintLabel(carton, quantity, border);

                this.purchaseOrderService.sendNotification({ type: 'success', title: 'Successfully Updated', content: this.purchaseorder.PackingSlipNumber + ' was saved' });
            },
            (error: any) => {
                this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: <any>error });
            }
        );    
    }

    refreshDataSource(cartons: Carton[]) {
        this.dataSource = new MatTableDataSource<Carton>(cartons);
        this.dataSource.sort = this.sort;
    }

    addCarton() {
        this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'carton', 'list', 'add']);
    }
    
    moveDownCarton(carton: Carton) {
        this.move(this.purchaseorder.Cartons, carton, 1);
        this.purchaseorder.Cartons.forEach((value, i) => {
            value.Position = i + 1;
            //this.saveCarton(value);
        });
        this.refreshDataSource(this.purchaseorder.Cartons);
    }

    moveUpCarton(carton: Carton) {
        this.move(this.purchaseorder.Cartons, carton, -1);
        this.purchaseorder.Cartons.forEach((value, i) => {
            value.Position = i + 1;
            //this.saveCarton(value);
        });
        this.refreshDataSource(this.purchaseorder.Cartons);
    }

    move(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a,b)=>a-b); // Sort the indexes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    compare(a,b) {
        return a - b;
    }

    onAddCarton(carton: Carton, index: number) {
        if (this.isRequirementValid(carton)) {           
            this.pendingAdd = true;
            carton.pendingAdd = false;
            this.addPendingCartonLine(carton);

            this.addPendingLine();
            this.refreshDataSource(this.purchaseorder.Cartons);

            this.onShowCartonLine(carton, index);
        }        
    }

    isRequirementValid(carton: Carton)
    {
        if (carton && carton.Weight && carton.Length && carton.Width && carton.Height) {
            return true;
        } 
        else {
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: "Please enter the weight and dimension" });
            return false;
        }
    }

    addPendingCartonLine(carton: Carton) {
        const _temp = new CartonLine(null, null, this.purchaseorderid, null, null, null, null, null, 1, null, null, null, null, true);
        carton.CartonLines.push(_temp);   
    }

    onPrintAllCartonLabels() {
        this.purchaseOrderService.downloadAllCartonLabel(this.purchaseorderid, "yes").subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = 'Carton_' +  this.purchaseorderid;
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
                    a.download = 'Carton_' +  this.purchaseorderid;
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }

    onPrintLabel(carton: Carton, count: number, border: string) {
        this.purchaseOrderService.downloadCartonLabelCount(carton.CartonID, count, border).subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = carton.CartonNumber;
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
                    a.download = carton.CartonNumber;
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }
    
    onRemoveCarton(carton: Carton, index: number) {
        this.onShowCartonLine(carton, index);
        const confirmation = confirm(`Remove position ${index + 1}?`);
        if (confirmation) {

            this.purchaseorder.Cartons.splice(index, 1);
            this.refreshDataSource(this.purchaseorder.Cartons);

            this.currentIndex = this.purchaseorder.Cartons.length - 1;
            // this.purchaseOrderService.currentCarton = null;
            // this.purchaseOrderService.currentCartonLines = [];
            this.purchaseOrderService.currentCarton.next(null);
            this.purchaseOrderService.currentCartonLines.next([]);
            this.purchaseOrderService.currentCartonID = null;
            
            this.purchaseOrderService.updatePurchaseLineCartonQuantity();            
        }
    }

    onEditCarton(carton: Carton) {
        this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'carton', 'list', carton.CartonID,'edit']);
    }

    onCopyCarton(carton: Carton, index: number) {
        this.pendingCopy = true;
        
        const newCarton = new Carton(null, carton.PurchaseOrderID, carton.PackingSlipNumber, null, this.purchaseorder.Cartons.length,
            carton.Length, carton.Width, carton.Height, carton.Weight, carton.LabelQty, null, null, [], carton.pendingAdd);

        carton.CartonLines.forEach((cartonline) => {
            const newCartonLine = new CartonLine(null, null, carton.PurchaseOrderID, cartonline.PurchaseOrderLineID, cartonline.ItemName,
                cartonline.ItemVendorSKU, cartonline.TPIN, cartonline.URLKey, cartonline.Quantity, cartonline.RemainingQuantity, null, null, cartonline.PrevPurchaseOrderLineID, cartonline.pendingAdd);
            
            newCarton.CartonLines.push(newCartonLine);
        });
    
        var isValid : boolean = true;

        newCarton.CartonLines.forEach((cartonline, i) => {
            if(isValid && !this.isValidQuantity(cartonline)) {
                isValid = false;
            }

            if(i == newCarton.CartonLines.length -1 && isValid)
            {

                this.purchaseorder.Cartons.splice(this.purchaseorder.Cartons.length - 1, 0, newCarton);

                this.refreshDataSource(this.purchaseorder.Cartons);

            }
        });

        this.purchaseOrderService.updatePurchaseLineCartonQuantity();
        this.pendingCopy = false;
        
        //const cartonInsert = new CartonInsert(this.purchaseorderid, this.purchaseorder.Cartons.length + 1, carton.Length, carton.Width, carton.Height, carton.Weight, carton.LabelQty, []);
        
        // this.purchaseOrderService.addCarton(cartonInsert).subscribe(
        //     (data: Carton) => {
        //         this.pendingCopy = false;
        //         this.purchaseOrderService.currentCartonLines.forEach(cartonline => {                    
        //             const cartonLineInsert = new CartonLineInsert(data.CartonID, cartonline.PurchaseOrderLineID, cartonline.Quantity);
        //             //this.purchaseOrderService.currentCartonID = data.CartonID;
        //             this.onShowCartonLine(data, index);
        //             this.purchaseOrderService.addCartonLine(cartonLineInsert).subscribe();
        //         });

        //         //this.cartons.push(data);
        //         this.purchaseOrderService.sendNotification({ type: 'success', title: 'Successfully Copied', content: '' });
        //         //this.onShowCartonLine(carton);
        //         this.refreshDataSource(this.purchaseorder.Cartons);
        //     },
        //     (error: any) => {
        //         this.pendingCopy = false;
        //         this.errorMessage = <any>error;
        //     }
        // );
    }

    isValidQuantity(cartonline: CartonLine) {

        const foundPurchaseOrderLine = this.purchaseOrderService.currentPurchaseOrderEdit.PurchaseOrderLines.find(x => x.PurchaseOrderLineID === cartonline.PurchaseOrderLineID);

        if(foundPurchaseOrderLine)
        {
            var RemainingQuantity : number = foundPurchaseOrderLine.Quantity;
            
            this.purchaseOrderService.currentPurchaseOrderEdit.Cartons.forEach((carton, ci) => {
                carton.CartonLines.forEach((cartonline2, cli) => {
                    if(cartonline2.PurchaseOrderLineID == cartonline.PurchaseOrderLineID) {
                        RemainingQuantity = RemainingQuantity - cartonline2.Quantity;
                    }
                });
            })
        }

        if(RemainingQuantity - cartonline.Quantity < 0) {
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: "Exceeded line quantity" });
            return false;
        }
        else {
            return true;
        }        
    }

    onShowCartonLine(carton: Carton, index: number) {
        this.purchaseOrderService.currentCarton.next(null);
        if(this.pendingAdd) {
            this.currentIndex = this.purchaseorder.Cartons.length - 1;
            this.pendingAdd = false;
        }
        else {
            this.currentIndex = index;
            //this.purchaseOrderService.currentCarton = carton;
            this.purchaseOrderService.currentCarton.next(carton);

            if(this.currentIndex != this.purchaseorder.Cartons.length - 1)
            {
                const foundIndex = carton.CartonLines.findIndex(i => i.pendingAdd === true);
                if (foundIndex < 0) {
                    this.addPendingCartonLine(carton);
                }                
            }

            //this.purchaseOrderService.currentCartonLines = carton.CartonLines;
            this.purchaseOrderService.currentCartonLines.next(carton.CartonLines);
            this.purchaseOrderService.currentCartonID = carton.CartonID;

            if(!carton.CartonNumber && this.currentIndex != this.purchaseorder.Cartons.length - 1) {
                this.purchaseorder = this.purchaseOrderService.currentPurchaseOrderEdit;
                this.removePendingLine();
                this.addPendingLine();
                this.refreshDataSource(this.purchaseOrderService.currentPurchaseOrderEdit.Cartons);
            }

            this.purchaseOrderService.newCartonLineIsSelected = true;
        }         
    }

    clearFields(form) {
        this.formDirty = false;
        this.canAdd = false;
        form.Weight = '';
        form.Length = '';
        form.Width = '';
        form.Height = '';
        form.LabelQty = 1;
    }


}

export class CartonLabelPrintDialog {
    constructor(
        public Quantity: number,
        public Border: string
    ) {}
}

@Component({
    selector: 'inbound-shipment-edit-carton-list.component-carton-print-dialog',
    templateUrl: 'inbound-shipment-edit-carton-list.component-carton-print-dialog.html',
  })

export class InboundShipmentEditCartonListComponentCartonPrintDialog implements OnInit {
    //quantity: number;
    cartonLabelPrintDialog: CartonLabelPrintDialog;

    constructor(
        public dialogRef: MatDialogRef<InboundShipmentEditCartonListComponentCartonPrintDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Carton) {}

    ngOnInit() {
        //this.quantity = this.data.LabelQty;
        this.cartonLabelPrintDialog = new CartonLabelPrintDialog(this.data.LabelQty, "yes");
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}


@Component({
    selector: 'inbound-shipment-edit-carton-list.component-carton-line-dialog',
    templateUrl: 'inbound-shipment-edit-carton-list.component-carton-line-dialog.html',
  })

export class InboundShipmentEditCartonListComponentCartonLineDialog implements OnInit {
    errorMessage: string;
    purchaseorder: PurchaseOrder;
    purchaseorderid: number;

    purchaseorderlineList: PurchaseOrderLineList[];

    orderStatus: string;
    pendingAdd: boolean;
    currentIndex: number;

    //displayedColumns = ['Add', 'ItemName', 'ItemVendorSKU', 'TPIN', 'Quantity', 'Delete'];
    displayedColumns = ['Add', 'ProductDetails', 'RemainingQuantity', 'CartonQuantity', 'Delete'];
    dataSource: any = null;

    formDirty = false;
    canAdd = false;
    cartonlines: CartonLine[];
    carton: Carton;
    @ViewChild("linePurchaseOrderIDRef") linePurchaseOrderIDRef: ElementRef;

    @ViewChild(MatSort) sort: MatSort;

    // get carton(): Carton | null {
    //     return this.purchaseOrderService ? this.purchaseOrderService.currentCarton : null;
    // }

    // get cartonlines(): CartonLine[] | null {

    //     //this.refreshDataSource(this.purchaseOrderService.currentCartonLines);
    //     if(this.purchaseOrderService.newCartonLineIsSelected) {
    //         this.currentIndex = this.purchaseOrderService.currentCartonLines.length - 1;
    //         this.purchaseOrderService.newCartonLineIsSelected = false;
    //     }
    //     return this.purchaseOrderService.currentCartonLines;
    // }

    constructor(
        private purchaseOrderService: PurchaseOrderService,
        public dialogRef: MatDialogRef<InboundShipmentEditCartonListComponentCartonLineDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Carton) {
            //this.purchaseOrderService.currentCarton = data;
            //this.purchaseOrderService.currentCartonLines = data.CartonLines;
            this.purchaseOrderService.currentCarton.next(data)
            this.purchaseOrderService.currentCartonLines.next(data.CartonLines)
            
            this.removePendingLine();
            this.addPendingLine();

            this.purchaseorder = this.purchaseOrderService.currentPurchaseOrderEdit;
            this.purchaseorderid = this.purchaseorder.PurchaseOrderID;
            this.refreshDataSource(data.CartonLines);            
        }

    ngOnInit() { 
        
        this.purchaseOrderService.currentCarton.subscribe(
            (currentcarton: Carton) => {
                this.carton = currentcarton;
            },
            (error: any) => this.errorMessage = <any>error
        );
        this.purchaseOrderService.currentCartonLines.subscribe(
            (cartonlines: CartonLine[]) => {
                if(this.purchaseOrderService.newCartonLineIsSelected) {
                    this.currentIndex = cartonlines.length - 1;
                    this.purchaseOrderService.newCartonLineIsSelected = false;
                }
            },
            (error: any) => this.errorMessage = <any>error
        );
        //this.currentIndex = this.purchaseOrderService.currentCarton.CartonLines.length -1;
        
        this.purchaseOrderService.getPurchaseOrderLineList(this.purchaseorderid).subscribe(
            (purchaseorderlinelist: PurchaseOrderLineList[]) => {
                this.purchaseorderlineList = purchaseorderlinelist;
            },
            (error: any) => this.errorMessage = <any>error
        );                  
    }

    refreshDataSource(cartonlines: CartonLine[]) {
        //cartonlines.forEach((c) => this.purchaseOrderService.updateCartonLineRemainingQuantity(c) );

        this.dataSource = new MatTableDataSource<CartonLine>(cartonlines);
        this.dataSource.sort = this.sort;
        
    }

    addPendingLine() {
        const _temp = new CartonLine(null, null, this.purchaseorderid, null, null, null, null, null, 1, null, null, null, null, true);
        this.cartonlines.push(_temp);   
    }

    removePendingLine() {
        const foundIndex = this.cartonlines.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.cartonlines.splice(foundIndex, 1);
        }
    }

    onItemChange(cartonline: CartonLine, index: number) {

        if (index === this.cartonlines.length - 1) {
            this.canAdd = true;
        }
        if(!this.existItem(cartonline.PurchaseOrderLineID)) {
            const selectedItem = this.purchaseorderlineList.find(x => x.Value === cartonline.PurchaseOrderLineID);
            if (selectedItem) {
                cartonline.ItemName = selectedItem.ItemName;
                cartonline.ItemVendorSKU = selectedItem.VendorSKU;
                cartonline.TPIN = selectedItem.TPIN;

                if(this.isValidQuantity(cartonline))
                {
                    this.purchaseOrderService.updatePurchaseLineCartonQuantity();
                    //this.purchaseOrderService.updateCartonLineRemainingQuantity(cartonline);    
                }                
            }
        }
        else {
            cartonline.PurchaseOrderLineID = cartonline.PrevPurchaseOrderLineID;
            this.currentIndex = this.cartonlines.length - 1;
            this.refreshDataSource(this.cartonlines);
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: "Item already exists" });
        }
                    
    }

    existItem(purchaseorderlineID: number, isNew: boolean = false){
        var counter: number = 0;
        this.cartonlines.forEach((value, index) => {
                if(value.PurchaseOrderLineID === purchaseorderlineID) {
                    if(isNew || index != this.cartonlines.length - 1) {
                        counter += 1; 
                    }
                }
            }
        );
        if(counter > 1) { return true; }
        else { return false; }
    }

    quantityChange(cartonline: CartonLine) {
        if(this.isValidQuantity(cartonline)) {
            this.purchaseOrderService.updatePurchaseLineCartonQuantity();
        }
    }

    isValidQuantity(cartonline: CartonLine, isPendingAdd: boolean = false) {

        const foundPurchaseOrderLine = this.purchaseOrderService.currentPurchaseOrderEdit.PurchaseOrderLines.find(x => x.PurchaseOrderLineID === cartonline.PurchaseOrderLineID);

        if(foundPurchaseOrderLine)
        {
            var RemainingQuantity : number = foundPurchaseOrderLine.Quantity;
            
            this.purchaseOrderService.currentPurchaseOrderEdit.Cartons.forEach((carton, ci) => {
                carton.CartonLines.forEach((cartonline2, cli) => {
                    if(isPendingAdd) {
                        if(cartonline2.PurchaseOrderLineID == cartonline.PurchaseOrderLineID) {
                            RemainingQuantity = RemainingQuantity - cartonline2.Quantity;
                        }
                    }
                    else {
                        if(!cartonline2.pendingAdd) {
                            if(cartonline2.PurchaseOrderLineID == cartonline.PurchaseOrderLineID) {
                                RemainingQuantity = RemainingQuantity - cartonline2.Quantity;
                            }
                        }
                    }
                });
            })
        }

        if(RemainingQuantity < 0) {
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: "Exceeded line quantity" });
            cartonline.Quantity = 0;    
            return false;
        }
        else {
            return true;
        }        
    }

    onAddCartonLine(cartonline: CartonLine) {
        if (this.isRequirementValid(cartonline)) {   
            if(!this.existItem(cartonline.PurchaseOrderLineID, true)) {                
                this.pendingAdd = true;
                cartonline.PrevPurchaseOrderLineID = cartonline.PurchaseOrderLineID;
                cartonline.pendingAdd = false;
                
                this.addPendingLine();
                this.refreshDataSource(this.cartonlines);
                this.purchaseOrderService.updatePurchaseLineCartonQuantity();
            } else {
                this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: "Product already exists" });
            }

        }
    }

    isRequirementValid(cartonline: CartonLine)
    {
        if (cartonline && cartonline.PurchaseOrderLineID) {
            if(cartonline.Quantity > 0 && this.isValidQuantity(cartonline, true)) {
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

    onRemoveCartonLine(cartonline: CartonLine, index: number) {
        const confirmation = confirm(`Remove ${cartonline.ItemVendorSKU}?`);
        if (confirmation) {

            this.cartonlines.splice(index, 1);
            this.refreshDataSource(this.cartonlines);

            this.purchaseOrderService.updatePurchaseLineCartonQuantity();
        }
    }

    onDeleteComplete(cartonline: CartonLine, message?: string): void {
        const purchaseorderline = this.purchaseOrderService.currentPurchaseOrderLines.find(x => x.PurchaseOrderLineID === cartonline.PurchaseOrderLineID);
        purchaseorderline.CartonQuantity -= cartonline.Quantity;
        this.purchaseOrderService.replacePurchaseOrderLine(cartonline.PurchaseOrderLineID, purchaseorderline);

        this.purchaseOrderService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: message });
        this.refreshDataSource(this.cartonlines);
    }

    onEditCartonLine(index: number) {
        if(this.pendingAdd) {
            this.currentIndex = this.cartonlines.length - 1;
            this.pendingAdd = false;
        }
        else {
            this.purchaseOrderService.updatePurchaseLineCartonQuantity();
            this.currentIndex = index;
        } 
    }

    clearFields(form) {
        this.formDirty = false;
        this.canAdd = false;
        this.removePendingLine();
        this.addPendingLine();
    }

    onBackClick(): void {
        this.dialogRef.close();
    }
    scrollToElement($element): void {
        $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
}
