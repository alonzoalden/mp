import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { environment } from 'environments/environment';
import { ItemInsert, ItemList, ItemCrossSellInsert } from '../../../../../shared/class/item';
import { ItemService } from '../../../../item.service';

@Component({
    selector: 'o-item-add-product-relation-cross-sell',
    templateUrl: './item-add-product-relation-cross-sell.component.html'
})

export class ItemAddProductRelationCrossSellComponent implements OnInit, OnChanges {
    @Input() errorMessage: string;
    @Input() item: ItemInsert;
    @Input() crossSellItemlist: ItemList[];
    @Input() crossSellMatTable: MatTableDataSource<ItemCrossSellInsert>;
    @Output() getAllItemList = new EventEmitter<void>();
    @Output() getAllItemCrossSell = new EventEmitter<ItemCrossSellInsert>();

    crossSellDisplayedColumns = ['Add', 'Down', 'Position', 'Up', 'ItemName', 'SKU', 'TPIN', 'Remove'];
    crossSellPendingAdd: boolean;
    currentItemCrossSellIndex: number;
    formDirty = false;
    private imageURL = environment.imageURL;

    constructor(private itemService: ItemService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.item && changes.item.currentValue && changes.item.currentValue.ItemCrossSells.length === 0) {
            const _temp = new ItemCrossSellInsert(0, null, null, null, null, null, null, null);
            this.item.ItemCrossSells.push(_temp);
            this.currentItemCrossSellIndex = this.item.ItemRelatedProducts.length - 1;
        }
    }
    ngOnInit(): void {
        this.currentItemCrossSellIndex = this.item.ItemCrossSells.length - 1;
    }

    crossSellRefreshDataSource(itemCrossSells: ItemCrossSellInsert[]) {
        this.crossSellMatTable = new MatTableDataSource<ItemCrossSellInsert>(itemCrossSells);
    }

    onAddItemCrossSell(itemCrossSell: ItemCrossSellInsert) {
        if (this.isCrossSellRequirementValid(itemCrossSell)) {
            if (!this.existCrossSell(itemCrossSell.CrossSellItemID, true)) {
                this.crossSellPendingAdd = true;
                //this.getAllItemCrossSell.emit(itemCrossSell);
                const _temp = new ItemCrossSellInsert(0, null, null, null, null, null, null, this.item.ItemCrossSells.length + 1);
                this.item.ItemCrossSells.push(_temp);
                this.crossSellRefreshDataSource(this.item.ItemCrossSells);
                this.currentItemCrossSellIndex = this.item.ItemCrossSells.length - 1;
            } else {
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Up Sell already exists' });
            }
        } else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Please select an item' });
        }
    }

    onEditItemCrossSell(index: number) {
        if (this.crossSellPendingAdd) {
            this.currentItemCrossSellIndex = this.item.ItemCrossSells.length - 1;
            this.crossSellPendingAdd = false;
        } else {
            this.currentItemCrossSellIndex = index;
        }
    }

    onCrossSellItemChange(index: number) {
        if (this.item.ItemCrossSells[index].CrossSellItemID) {
            if (!this.existCrossSell(this.item.ItemCrossSells[index].CrossSellItemID)) {

                this.getAllItemCrossSell.emit(this.item.ItemCrossSells[index]);

                // this.itemService.getAllItem(this.item.ItemCrossSells[index].CrossSellItemID).subscribe(
                //     (item: Item) => {
                //         this.item.ItemCrossSells[index].PrevCrossSellItemID = item.ItemID;
                //         this.item.ItemCrossSells[index].CrossSellItemName = item.Name;
                //         this.item.ItemCrossSells[index].CrossSellItemVendorSKU = item.VendorSKU;
                //         this.item.ItemCrossSells[index].CrossSellTPIN = item.TPIN;
                //         this.currentItemCrossSellIndex = this.item.ItemCrossSells.length - 1;
                //         this.item.ItemCrossSells[index].ImagePath = item.ImagePath;
                //     },
                //     (error: any) => {
                //         this.errorMessage = <any>error;
                //         this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                //     }
                // );
            } else {
                this.item.ItemCrossSells[index].CrossSellItemID = this.item.ItemCrossSells[index].PrevCrossSellItemID;
                this.currentItemCrossSellIndex = this.item.ItemCrossSells.length - 1;
                this.crossSellRefreshDataSource(this.item.ItemCrossSells);
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Cross-sell item already exists' });
            }
        }
    }

    isCrossSellRequirementValid(itemCrossSell: ItemCrossSellInsert): boolean {
        if (itemCrossSell
            && itemCrossSell.CrossSellItemID) {
            return true;
        } else {
            return false;
        }
    }

    existCrossSell(itemID: number, isNew: boolean = false) {
        let counter: number = 0;
        this.item.ItemCrossSells.forEach((value, index) => {
            if (value.CrossSellItemID === itemID) {
                if (isNew || index != this.item.ItemCrossSells.length - 1) {
                    counter += 1;
                }
            }
        }
        );
        if (counter > 1) { return true; } else { return false; }
    }

    crossSellMoveDownPosition(itemCrossSell: ItemCrossSellInsert) {
        this.positionMove(this.item.ItemCrossSells, itemCrossSell, 1);
        this.item.ItemCrossSells.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.crossSellRefreshDataSource(this.item.ItemCrossSells);
    }

    crossSellMoveUpPosition(itemCrossSell: ItemCrossSellInsert) {
        this.positionMove(this.item.ItemCrossSells, itemCrossSell, -1);
        this.item.ItemCrossSells.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.crossSellRefreshDataSource(this.item.ItemCrossSells);
    }


    positionMove(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0 || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a, b) => a - b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    onRemoveCrossSell(itemCrossSell: ItemCrossSellInsert) {
        const confirmation = confirm(`Remove ${itemCrossSell.CrossSellItemName}?`);
        if (confirmation) {
            const foundIndex = this.item.ItemCrossSells.findIndex(i => i.CrossSellItemID === itemCrossSell.CrossSellItemID);
            if (foundIndex > -1) {
                this.item.ItemCrossSells.splice(foundIndex, 1);
            }
            this.crossSellRefreshDataSource(this.item.ItemCrossSells);
        }
    }
    clearFields(ItemCrossSellInsert: ItemCrossSellInsert) {
        ItemCrossSellInsert.CrossSellItemID = null;
        this.formDirty = false;
    }
}
