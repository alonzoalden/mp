import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { Item, ItemList, ItemUpSell, ItemUpSellInsert } from '../../shared/class/item';
import { ItemService } from '../item.service';

@Component({
    selector: 'o-item-edit-product-relation-up-sell',
    templateUrl: './item-edit-product-relation-up-sell.component.html'
})

export class ItemEditProductRelationUpSellComponent implements OnInit {
    errorMessage: string;
    item: Item;
    itemid: number;

    upSellItemlist: ItemList[];    
    upSellDisplayedColumns = ['Add', 'Down', 'Position', 'Up', 'ItemName', 'SKU', 'TPIN', 'Remove'];
    upSellDataSource: any = null;
    upSellPendingAdd: boolean;
    currentItemUpSellIndex: number;
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
                this.upSellItemlist = itemlist;
                this.upSellRefreshDataSource(this.item.ItemUpSells);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    initialize() {
        if (this.itemService.currentItemEdit.ItemUpSells === null) {
            this.itemService.getItemUpSells(this.itemid).subscribe(
                (itemUpSells: ItemUpSell[]) => {
                    this.item.ItemUpSells = itemUpSells;                    
                    this.upSellAddPendingLine();         
                    this.currentItemUpSellIndex = this.item.ItemUpSells.length - 1;
                    this.upSellRefreshDataSource(this.item.ItemUpSells);
                },
                (error: any) => this.errorMessage = <any>error
            );
        } else {
            this.upSellRemovePendingLine();
            this.upSellAddPendingLine();               
            this.currentItemUpSellIndex = this.item.ItemUpSells.length - 1;
            this.upSellRefreshDataSource(this.item.ItemUpSells);
        }
    }

    upSellAddPendingLine() {
        const _temp = new ItemUpSell(0, this.itemid, null, null, null, null, null, this.item.ItemUpSells.length + 1, null, null, null, true);
        this.item.ItemUpSells.push(_temp);   
    }

    upSellRemovePendingLine() {
        const foundIndex = this.item.ItemUpSells.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.item.ItemUpSells.splice(foundIndex, 1);
        }
    }

    upSellRefreshDataSource(itemUpSells: ItemUpSell[]) { 
        this.upSellDataSource = new MatTableDataSource<ItemUpSell>(itemUpSells);
    }

    onAddItemUpSell(itemUpSell: ItemUpSell) {
        if (this.isUpSellRequirementValid(itemUpSell)) { 
            if(!this.existUpSell(itemUpSell.UpSellItemID, true)) {    
                this.upSellPendingAdd = true; 

                this.itemService.getAllItem(itemUpSell.UpSellItemID).subscribe(
                    (item: Item) => {
                        itemUpSell.PrevUpSellItemID = item.ItemID;
                        itemUpSell.UpSellItemName = item.Name;
                        itemUpSell.UpSellItemVendorSKU = item.VendorSKU;
                        itemUpSell.UpSellTPIN = item.TPIN;
                        itemUpSell.pendingAdd = false;                            
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                        this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    }
                );

                this.upSellAddPendingLine();  
                this.upSellRefreshDataSource(this.item.ItemUpSells);
            }
            else {
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Up-sell product already exists" });
            }   
        }
        else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Please select an item" });
        }
    }

    isUpSellRequirementValid(itemUpSell: ItemUpSell): boolean {
        if (itemUpSell
            && itemUpSell.UpSellItemID) {
            return true;
        } 
        else {
            return false;
        }
    }

    existUpSell(itemID: number, isNew: boolean = false){
        var counter: number = 0;
        this.item.ItemUpSells.forEach((value, index) => {
                if(value.UpSellItemID === itemID) {
                    if(isNew || index != this.item.ItemUpSells.length - 1) {
                        counter += 1; 
                    }
                }
            }
        );
        if(counter > 1) { return true; }
        else { return false; }
    }

    onEditItemUpSell(index: number) {
        if(this.upSellPendingAdd) {
            this.currentItemUpSellIndex = this.item.ItemUpSells.length - 1;
            this.upSellPendingAdd = false;
        }
        else {
            this.currentItemUpSellIndex = index;
        }   
    }

    onUpSellItemChange(index: number) {
        if(this.item.ItemUpSells[index].UpSellItemID) {
            if(!this.existUpSell(this.item.ItemUpSells[index].UpSellItemID)) {
                this.itemService.getAllItem(this.item.ItemUpSells[index].UpSellItemID).subscribe(
                    (item: Item) => {
                        this.item.ItemUpSells[index].PrevUpSellItemID = item.ItemID;
                        this.item.ItemUpSells[index].UpSellItemName = item.Name;
                        this.item.ItemUpSells[index].UpSellItemVendorSKU = item.VendorSKU;
                        this.item.ItemUpSells[index].UpSellTPIN = item.TPIN;
                        this.item.ItemUpSells[index].ImagePath = item.ImagePath;
                        this.currentItemUpSellIndex = this.item.ItemUpSells.length - 1;
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                        this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    }
                );
            }
            else {
                this.item.ItemUpSells[index].UpSellItemID = this.item.ItemUpSells[index].PrevUpSellItemID;
                this.currentItemUpSellIndex = this.item.ItemUpSells.length - 1;
                this.upSellRefreshDataSource(this.item.ItemUpSells);
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Related product already exists" });
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
        const indexes = [index, newIndex].sort((a,b)=>a-b); // Sort the indixes
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
        
        //this.selectionCategoriesRef.nativeElement.value = "0: null";
    }
}

