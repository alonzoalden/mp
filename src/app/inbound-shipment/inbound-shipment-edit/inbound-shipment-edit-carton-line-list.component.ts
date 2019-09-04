import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';

// import { Carton } from '../../shared/class/carton';
// import { CartonLine, CartonLineInsert } from '../../shared/class/carton-line';
import { PurchaseOrder, PurchaseOrderLine, PurchaseOrderLineList, Carton, CartonLine} from '../../shared/class/purchase-order';
import { PurchaseOrderService } from '../purchase-order.service';
import { InboundShipmentSelectItemComponentDialog } from './inbound-shipment-edit-carton-list.component-select-dialog';
//import { PurchaseOrderLineList } from '../../shared/class/purchase-order-line';

@Component({
    selector: 'o-inbound-shipment-edit-carton-line-list',
    templateUrl: './inbound-shipment-edit-carton-line-list.component.html',
    styleUrls: ['./inbound-shipment-edit-carton-line-list.component.css']
})

export class InboundShipmentEditCartonLineListComponent implements OnInit {
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

    //@ViewChild('linePurchaseOrderIDRef') linePurchaseOrderIDRef: ElementRef;

    @ViewChild(MatSort, { static: false }) sort: MatSort;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private purchaseOrderService: PurchaseOrderService,
                private inboundShipmentDialog: MatDialog) { }

    // get carton(): Carton | null {
    //     return this.purchaseOrderService ? this.purchaseOrderService.currentCarton : null;
    // }

    // get cartonlines(): CartonLine[] | null {

    //     this.refreshDataSource(this.purchaseOrderService.currentCartonLines);
    //     if(this.purchaseOrderService.newCartonLineIsSelected) {
    //         this.currentIndex = this.purchaseOrderService.currentCartonLines.length - 1;
    //         this.purchaseOrderService.newCartonLineIsSelected = false;
    //     }
    //     return this.purchaseOrderService.currentCartonLines;
    // }

    ngOnInit() {        
        
        
        this.purchaseorderid = this.route.snapshot.parent.parent.params['id'];
        this.purchaseorder = this.purchaseOrderService.currentPurchaseOrderEdit;
        
        this.purchaseOrderService.currentCarton.subscribe(
            (currentcarton: Carton) => {
                this.carton = currentcarton;
            },
            (error: any) => this.errorMessage = <any>error
        );
        this.purchaseOrderService.currentCartonLines.subscribe(
            (cartonlines: CartonLine[]) => {
                this.cartonlines = cartonlines;
                this.refreshDataSource(cartonlines);
                if(this.purchaseOrderService.newCartonLineIsSelected) {
                    this.currentIndex = cartonlines.length - 1;
                    this.purchaseOrderService.newCartonLineIsSelected = false;
                }
            },
            (error: any) => this.errorMessage = <any>error
        );
        this.purchaseOrderService.getPurchaseOrder(this.purchaseorderid).subscribe(
            (purchaseorder: PurchaseOrder) => {
                this.orderStatus  = purchaseorder.Status;
            },
            (error: any) => this.errorMessage = <any>error
        );        
        this.purchaseOrderService.getPurchaseOrderLineList(this.purchaseorderid).subscribe(
            (purchaseorderlinelist: PurchaseOrderLineList[]) => {
                this.purchaseorderlineList = purchaseorderlinelist;
            },
            (error: any) => this.errorMessage = <any>error
        );       
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

    refreshDataSource(cartonlines: CartonLine[]) {
        cartonlines.forEach((c) => this.purchaseOrderService.updateCartonLineRemainingQuantity(c) );

        this.dataSource = new MatTableDataSource<CartonLine>(cartonlines);
        this.dataSource.sort = this.sort;
    }

    // onItemChange(newValue: number, cartonline: CartonLine) {
    //     if(!this.existItem(newValue)) {
    //         const selectedItem = this.purchaseorderlineList.find(x => x.Value === newValue);
    //         if (selectedItem) {
    //             cartonline.ItemName = selectedItem.ItemName;
    //             cartonline.ItemVendorSKU = selectedItem.VendorSKU;
    //             cartonline.TPIN = selectedItem.TPIN;
    //         }
    //     }
    // }

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
                    this.purchaseOrderService.updateCartonLineRemainingQuantity(cartonline);
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

            // this.purchaseOrderService.deleteCartonLine(cartonline.CartonLineID).subscribe(
            //     (data) => {
            //         this.onDeleteComplete(cartonline, `${cartonline.CartonLineID} was deleted`);
            //     },
            //     (error: any) => {
            //         this.errorMessage = <any>error;
            //         this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
            //         window.location.reload();
            //     }
            // );
        }
    }

    onDeleteComplete(cartonline: CartonLine, message?: string): void {
        // this.purchaseOrderService.clearPurchaseOrderLines();
        const purchaseorderline = this.purchaseOrderService.currentPurchaseOrderLines.find(x => x.PurchaseOrderLineID === cartonline.PurchaseOrderLineID);
        purchaseorderline.CartonQuantity -= cartonline.Quantity;
        this.purchaseOrderService.replacePurchaseOrderLine(cartonline.PurchaseOrderLineID, purchaseorderline);

        this.purchaseOrderService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: message });
        this.refreshDataSource(this.cartonlines);
    }

    onEditCartonLine(index: number) {
    //onEditCartonLine(cartonline: CartonLine) {
        // this.purchaseOrderService.currentCartonLine = cartonline;
        // this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'carton', 'list', 'line', cartonline.CartonLineID, 'edit']);

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
        //form.Quantity = 1;
        //form.PurcahseOrderLineID = null;
        //this.linePurchaseOrderIDRef.nativeElement.value = "0: null";
        this.removePendingLine();
        this.addPendingLine();
    }

    openDialogSelectItem(item: PurchaseOrder, index: number) {
        // const variationTitle = item.ItemVariationLines.map((attribute) => attribute.ItemAttributeVariationName).join(' / ');
        
        const data = {
            items: this.purchaseorderlineList,
            item: item
        }
        const dialogRef = this.inboundShipmentDialog.open(InboundShipmentSelectItemComponentDialog, {
            width: '700px',
            data: data
        });
    
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        },
        (error: any) => {
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: error });
        });
    }
}
