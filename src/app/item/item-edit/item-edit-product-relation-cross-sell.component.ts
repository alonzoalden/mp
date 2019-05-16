import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { Item, ItemList, ItemRelatedProduct, ItemUpSell, ItemCrossSell, ItemCrossSellInsert } from '../../shared/class/item';
import { ItemService } from '../item.service';

@Component({
  selector: 'o-item-edit-product-relation-cross-sell',
  templateUrl: './item-edit-product-relation-cross-sell.component.html'
})


export class ItemEditProductRelationCrossSellComponent implements OnInit {
    errorMessage: string;
    item: Item;
    itemid: number;

    crossSellItemlist: ItemList[];    
    crossSellDisplayedColumns = ['Add', 'Down', 'Position', 'Up', 'ItemName', 'SKU', 'TPIN', 'Remove'];
    crossSellDataSource: any = null;
    crossSellPendingAdd: boolean;
    currentItemCrossSellIndex: number;
    formDirty = false;

    @ViewChild('selectionCategoriesRef') selectionCategoriesRef: ElementRef;

    constructor(private route: ActivatedRoute,
        private itemService: ItemService) { }

    ngOnInit(): void {
        this.itemid = this.route.parent.snapshot.params['id'];
        this.itemService.getCurrentItemEdit(this.itemid).subscribe(
            (item: Item) => {
                this.itemService.currentItemEdit = item;
                this.item = this.itemService.currentItemEdit;

                this.initialize();
            },
            (error: any) => this.errorMessage = <any>error
        );

        this.itemService.getAllItemList().subscribe(
            (itemlist: ItemList[]) => {
                this.crossSellItemlist = itemlist;
                this.crossSellRefreshDataSource(this.item.ItemCrossSells);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    initialize() {
        if (this.itemService.currentItemEdit.ItemCrossSells === null) {
            this.itemService.getItemCrossSells(this.itemid).subscribe(
                (itemCrossSells: ItemCrossSell[]) => {
                    this.item.ItemCrossSells = itemCrossSells;                    
                    this.crossSellAddPendingLine();         
                    this.currentItemCrossSellIndex = this.item.ItemCrossSells.length -1;
                    this.crossSellRefreshDataSource(this.item.ItemCrossSells);
                },
                (error: any) => this.errorMessage = <any>error
            );
        } else {
            this.crossSellRemovePendingLine();
            this.crossSellAddPendingLine();             
            this.currentItemCrossSellIndex = this.item.ItemCrossSells.length -1;  
            this.crossSellRefreshDataSource(this.item.ItemCrossSells);
        }
    }

    crossSellAddPendingLine() {
        const _temp = new ItemCrossSell(0, this.itemid, null, null, null, null, null, this.item.ItemCrossSells.length + 1, null, null, true);
        this.item.ItemCrossSells.push(_temp);   
    }

    crossSellRemovePendingLine() {
        const foundIndex = this.item.ItemCrossSells.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.item.ItemCrossSells.splice(foundIndex, 1);
        }
    }

    crossSellRefreshDataSource(itemCrossSells: ItemCrossSell[]) { 
        this.crossSellDataSource = new MatTableDataSource<ItemCrossSell>(itemCrossSells);
    }

    onAddItemCrossSell(itemCrossSell: ItemCrossSell) {
        if (this.isCrossSellRequirementValid(itemCrossSell)) { 
            if(!this.existCrossSell(itemCrossSell.CrossSellItemID, true)) {    
                this.crossSellPendingAdd = true; 

                this.itemService.getAllItem(itemCrossSell.CrossSellItemID).subscribe(
                    (item: Item) => {
                        itemCrossSell.PrevCrossSellItemID = item.ItemID;
                        itemCrossSell.CrossSellItemName = item.Name;
                        itemCrossSell.CrossSellItemVendorSKU = item.VendorSKU;
                        itemCrossSell.CrossSellTPIN = item.TPIN;
                        itemCrossSell.pendingAdd = false;                            
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                        this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    }
                );

                this.crossSellAddPendingLine();  
                this.crossSellRefreshDataSource(this.item.ItemCrossSells);
            }
            else {
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Cross sell product already exists" });
            }   
        }
        else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Please select an item" });
        }
    }

    isCrossSellRequirementValid(itemCrossSell: ItemCrossSell): boolean {
        if (itemCrossSell
            && itemCrossSell.CrossSellItemID) {
            return true;
        } 
        else {
            return false;
        }
    }

    existCrossSell(itemID: number, isNew: boolean = false){
        var counter: number = 0;
        this.item.ItemCrossSells.forEach((value, index) => {
                if(value.CrossSellItemID === itemID) {
                    if(isNew || index != this.item.ItemCrossSells.length - 1) {
                        counter += 1; 
                    }
                }
            }
        );
        if(counter > 1) { return true; }
        else { return false; }
    }

    onEditItemCrossSell(index: number) {
        if(this.crossSellPendingAdd) {
            this.currentItemCrossSellIndex = this.item.ItemCrossSells.length - 1;
            this.crossSellPendingAdd = false;
        }
        else {
            this.currentItemCrossSellIndex = index;
        }    
    }

    onCrossSellItemChange(index: number) {
        if(this.item.ItemCrossSells[index].CrossSellItemID) {
            if(!this.existCrossSell(this.item.ItemCrossSells[index].CrossSellItemID)) {
                this.itemService.getAllItem(this.item.ItemCrossSells[index].CrossSellItemID).subscribe(
                    (item: Item) => {
                        this.item.ItemCrossSells[index].PrevCrossSellItemID = item.ItemID;
                        this.item.ItemCrossSells[index].CrossSellItemName = item.Name;
                        this.item.ItemCrossSells[index].CrossSellItemVendorSKU = item.VendorSKU;
                        this.item.ItemCrossSells[index].CrossSellTPIN = item.TPIN;
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                        this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    }
                );
            }
            else {
                this.item.ItemCrossSells[index].CrossSellItemID = this.item.ItemCrossSells[index].PrevCrossSellItemID;
                this.currentItemCrossSellIndex = this.item.ItemCrossSells.length - 1;
                this.crossSellRefreshDataSource(this.item.ItemCrossSells);
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Related product already exists" });
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
        const indexes = [index, newIndex].sort((a,b)=>a-b); // Sort the indixes
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
        
        //this.selectionCategoriesRef.nativeElement.value = "0: null";
    }
}