import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Item, ItemList, ItemCrossSell, ItemCrossSellInsert } from '../../../../../../shared/class/item';
import { ItemService } from '../../../../item.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'o-item-edit-product-relation-cross-sell',
  templateUrl: './item-edit-product-relation-cross-sell.component.html'
})

export class ItemEditProductRelationCrossSellComponent implements OnInit, OnChanges {
    @Input() errorMessage: string;
    @Input() item: Item;
    @Input() crossSellItemlist: ItemList[];
    @Input() crossSellMatTable: MatTableDataSource<ItemCrossSell>;
    @Output() getAllItemList = new EventEmitter<void>();
    @Output() getAllItemCrossSell = new EventEmitter<ItemCrossSell>();
    crossSellDisplayedColumns = ['Add', 'Down', 'Position', 'Up', 'ItemName', 'SKU', 'TPIN', 'Remove'];
    crossSellPendingAdd: boolean;
    currentItemCrossSellIndex: number;
    formDirty = false;
    imageURL = environment.imageURL;

    @ViewChild('selectionCategoriesRef', { static: false }) selectionCategoriesRef: ElementRef;

    constructor(private itemService: ItemService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.item && changes.item.currentValue && changes.item.currentValue.ItemCrossSells.length === 0) {
            this.crossSellAddPendingLine();
            this.currentItemCrossSellIndex = this.item.ItemRelatedProducts.length - 1;
        }
        if (changes.item && changes.item.currentValue && changes.item.currentValue.ItemCrossSells.length) {
            if (this.item.ItemCrossSells[this.item.ItemCrossSells.length - 1].CrossSellItemID) {
                this.crossSellAddPendingLine();
            }
        }
    }
    ngOnInit(): void {
        this.currentItemCrossSellIndex = this.item.ItemCrossSells.length - 1;
    }

    initialize() {
        if (this.itemService.currentItemEdit.ItemCrossSells === null) {
            this.itemService.getItemCrossSells(this.item.ItemID).subscribe(
                (itemCrossSells: ItemCrossSell[]) => {
                    this.item.ItemCrossSells = itemCrossSells;
                    this.crossSellAddPendingLine();
                    this.currentItemCrossSellIndex = this.item.ItemCrossSells.length - 1;
                    this.crossSellRefreshDataSource(this.item.ItemCrossSells);
                },
                (error: any) => this.errorMessage = <any>error
            );
        } else {
            this.crossSellRemovePendingLine();
            this.crossSellAddPendingLine();
            this.currentItemCrossSellIndex = this.item.ItemCrossSells.length - 1;
            this.crossSellRefreshDataSource(this.item.ItemCrossSells);
        }
    }

    crossSellAddPendingLine() {
        const _temp = new ItemCrossSell(0, this.item.ItemID, null, null, null, null, null, this.item.ItemCrossSells.length + 1, null, null, null, true);
        this.item.ItemCrossSells.push(_temp);
    }

    crossSellRemovePendingLine() {
        const foundIndex = this.item.ItemCrossSells.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.item.ItemCrossSells.splice(foundIndex, 1);
        }
    }

    crossSellRefreshDataSource(itemCrossSells: ItemCrossSell[]) {
        this.crossSellMatTable = new MatTableDataSource<ItemCrossSell>(itemCrossSells);
    }

    onAddItemCrossSell(itemCrossSell: ItemCrossSell) {
        if (this.isCrossSellRequirementValid(itemCrossSell)) {
            if (!this.existCrossSell(itemCrossSell.CrossSellItemID, true)) {
                this.crossSellPendingAdd = true;
                this.crossSellAddPendingLine();
                this.crossSellRefreshDataSource(this.item.ItemCrossSells);
                this.currentItemCrossSellIndex = this.item.ItemCrossSells.length - 1;
            } else {
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Cross sell product already exists' });
            }
        } else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Please select an item' });
        }
    }

    isCrossSellRequirementValid(itemCrossSell: ItemCrossSell): boolean {
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
                    if (isNew || index !== this.item.ItemCrossSells.length - 1) {
                        counter += 1;
                    }
                }
            }
        );
        if (counter > 1) { return true; } else { return false; }
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
            } else {
                this.item.ItemCrossSells[index].CrossSellItemID = this.item.ItemCrossSells[index].PrevCrossSellItemID;
                this.currentItemCrossSellIndex = this.item.ItemCrossSells.length - 1;
                this.crossSellRefreshDataSource(this.item.ItemCrossSells);
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Related product already exists' });
            }
        }
    }

    crossSellMoveDownPosition(itemCrossSell: ItemCrossSell) {
        this.positionMove(this.item.ItemCrossSells, itemCrossSell, 1);
        this.item.ItemCrossSells.forEach((value, index) => {
            value.Position = index + 1;
        });
        this.crossSellRefreshDataSource(this.item.ItemCrossSells);
    }

    crossSellMoveUpPosition(itemCrossSell: ItemCrossSell) {
        this.positionMove(this.item.ItemCrossSells, itemCrossSell, -1);
        this.item.ItemCrossSells.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.crossSellRefreshDataSource(this.item.ItemCrossSells);
    }

    positionMove(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a, b) => a - b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    onRemoveCrossSell(itemCrossSell: ItemCrossSell) {
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
