import { Component, OnInit, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Item, ItemList, ItemUpSell, ItemUpSellInsert } from '../../../../../../shared/class/item';
import { ItemService } from '../../../../item.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
    selector: 'o-item-edit-product-relation-up-sell',
    templateUrl: './item-edit-product-relation-up-sell.component.html'
})

export class ItemEditProductRelationUpSellComponent implements OnInit, OnChanges {
    @Input() errorMessage: string;
    @Input() item: Item;
    @Input() upSellItemlist: ItemList[];
    @Input() itemUpSellsMatTable: MatTableDataSource<ItemUpSell>;
    @Output() getAllItemUpSell = new EventEmitter<ItemUpSell>();
    upSellDisplayedColumns = ['Add', 'Down', 'Position', 'Up', 'ItemName', 'SKU', 'TPIN', 'Remove'];
    upSellPendingAdd: boolean;
    currentItemUpSellIndex: number;
    formDirty = false;
    imageURL = environment.imageURL;

    constructor(private itemService: ItemService) { }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.item && changes.item.currentValue && changes.item.currentValue.ItemUpSells.length === 0) {
            this.upSellAddPendingLine();
            this.currentItemUpSellIndex = this.item.ItemUpSells.length - 1;
        }
    }
    ngOnInit(): void {
        this.upSellRemovePendingLine();
        this.upSellAddPendingLine();
        this.currentItemUpSellIndex = this.item.ItemUpSells.length - 1;
    }

    upSellAddPendingLine() {
        const _temp = new ItemUpSell(0, this.item.ItemID, null, null, null, null, null, this.item.ItemUpSells.length + 1, null, null, null, true);
        this.item.ItemUpSells.push(_temp);
    }

    upSellRemovePendingLine() {
        const foundIndex = this.item.ItemUpSells.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.item.ItemUpSells.splice(foundIndex, 1);
        }
    }

    upSellRefreshDataSource(itemUpSells: ItemUpSell[]) {
        this.itemUpSellsMatTable = new MatTableDataSource<ItemUpSell>(itemUpSells);
    }

    onAddItemUpSell(itemUpSell: ItemUpSell) {
        if (this.isUpSellRequirementValid(itemUpSell)) {
            if (!this.existUpSell(itemUpSell.UpSellItemID, true)) {
                this.upSellPendingAdd = true;
                this.upSellAddPendingLine();
                this.upSellRefreshDataSource(this.item.ItemUpSells);
            } else {
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Up-sell product already exists' });
            }
        } else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Please select an item' });
        }
    }

    isUpSellRequirementValid(itemUpSell: ItemUpSell): boolean {
        if (itemUpSell
            && itemUpSell.UpSellItemID) {
            return true;
        } else {
            return false;
        }
    }

    existUpSell(itemID: number, isNew: boolean = false) {
        let counter: number = 0;
        this.item.ItemUpSells.forEach((value, index) => {
                if (value.UpSellItemID === itemID) {
                    if (isNew || index !== this.item.ItemUpSells.length - 1) {
                        counter += 1;
                    }
                }
            }
        );
        if (counter > 1) { return true; } else { return false; }
    }

    onEditItemUpSell(index: number) {
        if (this.upSellPendingAdd) {
            this.currentItemUpSellIndex = this.item.ItemUpSells.length - 1;
            this.upSellPendingAdd = false;
        } else {
            this.currentItemUpSellIndex = index;
        }
    }

    onUpSellItemChange(index: number) {
        if (this.item.ItemUpSells[index].UpSellItemID) {
            if (!this.existUpSell(this.item.ItemUpSells[index].UpSellItemID)) {
                this.getAllItemUpSell.emit(this.item.ItemUpSells[index]);
            } else {
                this.item.ItemUpSells[index].UpSellItemID = this.item.ItemUpSells[index].PrevUpSellItemID;
                this.currentItemUpSellIndex = this.item.ItemUpSells.length - 1;
                this.upSellRefreshDataSource(this.item.ItemUpSells);
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Related product already exists' });
            }
        }
    }

    upSellMoveDownPosition(itemUpSell: ItemUpSell) {
        this.positionMove(this.item.ItemUpSells, itemUpSell, 1);
        this.item.ItemUpSells.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.upSellRefreshDataSource(this.item.ItemUpSells);
    }

    upSellMoveUpPosition(itemUpSell: ItemUpSell) {
        this.positionMove(this.item.ItemUpSells, itemUpSell, -1);
        this.item.ItemUpSells.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.upSellRefreshDataSource(this.item.ItemUpSells);
    }

    positionMove(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a, b) => a - b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    onRemoveUpSell(itemUpSell: ItemUpSell) {
        const confirmation = confirm(`Remove ${itemUpSell.UpSellItemName}?`);
        if (confirmation) {
            const foundIndex = this.item.ItemUpSells.findIndex(i => i.UpSellItemID === itemUpSell.UpSellItemID);
            if (foundIndex > -1) {
                this.item.ItemUpSells.splice(foundIndex, 1);
            }
            this.upSellRefreshDataSource(this.item.ItemUpSells);
        }
    }

    clearFields(ItemUpSellInsert: ItemUpSellInsert) {
        ItemUpSellInsert.UpSellItemID = null;
        this.formDirty = false;
    }
}

