import { Component, OnInit, OnChanges, ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { PurchaseOrder, PurchaseOrderLineList, Carton, CartonLine} from '../../../../../../shared/class/purchase-order';
import { PurchaseOrderService } from '../../../../purchase-order.service';
import { environment } from '../../../../../../../environments/environment';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
    selector: 'o-inbound-shipment-edit-carton-line-list',
    templateUrl: './inbound-shipment-edit-carton-line-list.component.html',
    styleUrls: ['./inbound-shipment-edit-carton-line-list.component.css']
})

export class InboundShipmentEditCartonLineListComponent implements OnInit, OnChanges {
    imageURL = environment.imageURL;
    linkURL = environment.linkURL;
    purchaseorderid: number;
    @Input() purchaseOrder: PurchaseOrder;
    @Input() purchaseOrderLineList: PurchaseOrderLineList[];
    @Input() carton: Carton;
    @Input() errorMessage: string;
    @Output() getPurchaseOrderLineList = new EventEmitter<number>();
    pendingAdd: boolean;
    currentIndex: number;
    displayedColumns = ['Add', 'ProductDetails', 'RemainingQuantity', 'CartonQuantity', 'Delete'];
    dataSource: any = null;
    formDirty = false;
    canAdd = false;
    cartonlines: CartonLine[];
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild('productSelectRef', { static: false }) productSelectRef: NgSelectComponent;

    constructor(private route: ActivatedRoute,
                private purchaseOrderService: PurchaseOrderService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.carton && changes.carton.currentValue && !changes.carton.currentValue.CartonLines) {
            this.addPendingLine();
        }
        if (changes.carton && changes.carton.currentValue && changes.carton.currentValue.CartonLines.length > 0) {
            this.refreshDataSource(changes.carton.currentValue.CartonLines);
            this.currentIndex = changes.carton.currentValue.CartonLines.length - 1;
            this.cartonlines = changes.carton.currentValue.CartonLines;
        }
    }

    ngOnInit() {
        this.purchaseorderid = this.route.snapshot.parent.params['id'];
        this.getPurchaseOrderLineList.emit(this.purchaseorderid);
    }

    addPendingLine() {
        const _temp = new CartonLine(null, null, this.purchaseorderid, null, null, null, null, null, 1, null, null, null, null, true);
        this.cartonlines.push(_temp);
    }

    removePendingLine() {
        const foundIndex = this.carton.CartonLines.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.carton.CartonLines.splice(foundIndex, 1);
        }
    }

    refreshDataSource(cartonlines: CartonLine[]) {
        cartonlines.forEach((c) => this.purchaseOrderService.updateCartonLineRemainingQuantity(c, this.purchaseOrder) );

        this.dataSource = new MatTableDataSource<CartonLine>(cartonlines);
        this.dataSource.sort = this.sort;
    }

    onItemChange(cartonline: CartonLine, index: number) {
        if (index === this.cartonlines.length - 1) {
            this.canAdd = true;
        }
        if (!this.existItem(cartonline.PurchaseOrderLineID)) {
            const selectedItem = this.purchaseOrderLineList.find(x => x.Value === cartonline.PurchaseOrderLineID);
            if (selectedItem) {
                cartonline.ItemName = selectedItem.ItemName;
                cartonline.ItemVendorSKU = selectedItem.VendorSKU;
                cartonline.TPIN = selectedItem.TPIN;
                if (this.isValidQuantity(cartonline)) {
                    this.purchaseOrderService.updatePurchaseLineCartonQuantity(this.purchaseOrder);
                    this.purchaseOrderService.updateCartonLineRemainingQuantity(cartonline, this.purchaseOrder);
                }
            }
        } else {
            cartonline.PurchaseOrderLineID = cartonline.PrevPurchaseOrderLineID;
            this.currentIndex = this.cartonlines.length - 1;
            this.refreshDataSource(this.cartonlines);
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: 'Item already exists' });
        }
    }
    overflowFix(bool: Boolean): void {
        const container = document.getElementsByClassName('ibox-content')[0];
        bool ? container.classList.add('overflow-visible') : container.classList.remove('overflow-visible');
    }

    existItem(purchaseorderlineID: number, isNew: boolean = false) {
        let counter: number = 0;
        this.carton.CartonLines.forEach((value, index) => {
                if (value.PurchaseOrderLineID === purchaseorderlineID) {
                    if (isNew || index !== this.cartonlines.length - 1) {
                        counter += 1;
                    }
                }
            }
        );
        if (counter > 1) { return true; } else { return false; }
    }

    quantityChange(cartonline: CartonLine) {
        if (this.isValidQuantity(cartonline)) {
            this.purchaseOrderService.updatePurchaseLineCartonQuantity(this.purchaseOrder);
            this.purchaseOrderService.updateCartonLineRemainingQuantity(cartonline, this.purchaseOrder);
        }
    }

    isValidQuantity(cartonline: CartonLine, isPendingAdd: boolean = false) {
        const foundPurchaseOrderLine = this.purchaseOrder.PurchaseOrderLines.find(x => x.PurchaseOrderLineID === cartonline.PurchaseOrderLineID);
        if (foundPurchaseOrderLine) {
            let _remainingQuantity: number = foundPurchaseOrderLine.Quantity;
            this.purchaseOrder.Cartons.forEach((carton) => {
                carton.CartonLines.forEach((cartonline2) => {
                    if (isPendingAdd) {
                        if (cartonline2.PurchaseOrderLineID === cartonline.PurchaseOrderLineID) {
                            _remainingQuantity = _remainingQuantity - cartonline2.Quantity;
                        }
                    } else {
                        if (!cartonline2.pendingAdd) {
                            if (cartonline2.PurchaseOrderLineID === cartonline.PurchaseOrderLineID) {
                                _remainingQuantity = _remainingQuantity - cartonline2.Quantity;
                            }
                        }
                    }
                });
            });
            if (_remainingQuantity < 0) {
                this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: 'Exceeded line quantity' });
                cartonline.Quantity = 0;
                return false;
            } else {
                return true;
            }
        }
    }

    onAddCartonLine(cartonline: CartonLine) {
        if (this.isRequirementValid(cartonline)) {
            if (!this.existItem(cartonline.PurchaseOrderLineID, true)) {
                this.pendingAdd = true;
                cartonline.PrevPurchaseOrderLineID = cartonline.PurchaseOrderLineID;
                cartonline.pendingAdd = false;

                this.addPendingLine();
                this.refreshDataSource(this.cartonlines);
                this.purchaseOrderService.updatePurchaseLineCartonQuantity(this.purchaseOrder);
            } else {
                this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: 'Product already exists' });
            }
        }
    }

    isRequirementValid(cartonline: CartonLine) {
        if (cartonline && cartonline.PurchaseOrderLineID) {
            if (cartonline.Quantity > 0 && this.isValidQuantity(cartonline, true)) {
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

    onRemoveCartonLine(cartonline: CartonLine, index: number) {
        const confirmation = confirm(`Remove ${cartonline.ItemVendorSKU}?`);
        if (confirmation) {
            this.cartonlines.splice(index, 1);
            this.refreshDataSource(this.cartonlines);
            this.purchaseOrderService.updatePurchaseLineCartonQuantity(this.purchaseOrder);

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
        if (this.pendingAdd) {
            this.currentIndex = this.cartonlines.length - 1;
            this.pendingAdd = false;
        } else {
            this.purchaseOrderService.updatePurchaseLineCartonQuantity(this.purchaseOrder);
            this.currentIndex = index;
        }
    }

    clearFields(cartonline: CartonLine) {
        this.formDirty = false;
        this.canAdd = false;
        cartonline.ItemName = null;
        cartonline.ItemVendorSKU = null;
        cartonline.TPIN = null;
        cartonline.RemainingQuantity = 0;
        cartonline.Quantity = 1;
        this.productSelectRef.clearModel();
    }

    scrollToElement($element): void {
        $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }
}
