import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { Item, ItemList, ItemRelatedProduct, ItemRelatedProductInsert } from '../../../../../shared/class/item';
import { ItemService } from '../../../../item.service';

@Component({
  templateUrl: './item-edit-product-relation-related-product-shell.component.html'
})

export class ItemEditProductRelationRelatedProductShellComponent implements OnInit {
    errorMessage: string;
    item: Item;
    itemid: number;

    relatedProductItemlist: ItemList[];    
    relatedProductDisplayedColumns = ['Add', 'Down', 'Position', 'Up', 'ItemName', 'SKU', 'TPIN', 'Remove'];
    relatedProductDataSource: any = null;
    relatedProductPendingAdd: boolean;
    currentItemRelatedProductIndex: number;
    formDirty = false;
    canAdd = false;

    @ViewChild('selectionCategoriesRef', { static: false }) selectionCategoriesRef: ElementRef;

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

        this.itemService.getItemList().subscribe(
            (itemlist: ItemList[]) => {
                this.relatedProductItemlist = itemlist;
                this.relatedProductRefreshDataSource(this.item.ItemRelatedProducts);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }        

    initialize() {
        if (this.itemService.currentItemEdit.ItemRelatedProducts === null) {
            this.itemService.getItemRelatedProducts(this.itemid).subscribe(
                (itemRelatedProducts: ItemRelatedProduct[]) => {
                    this.item.ItemRelatedProducts = itemRelatedProducts;                    
                    this.relatedProductAddPendingLine();         
                    this.currentItemRelatedProductIndex = this.item.ItemRelatedProducts.length - 1;
                    this.relatedProductRefreshDataSource(this.item.ItemRelatedProducts);
                },
                (error: any) => this.errorMessage = <any>error
            );
        } else {
            this.relatedProductRemovePendingLine();
            this.relatedProductAddPendingLine();           
            this.currentItemRelatedProductIndex = this.item.ItemRelatedProducts.length - 1;    
            this.relatedProductRefreshDataSource(this.item.ItemRelatedProducts);
        }
    }

    relatedProductAddPendingLine() {
        const _temp = new ItemRelatedProduct(0, this.itemid, null, null, null, null, null, this.item.ItemRelatedProducts.length + 1, null, null, null, true);
        this.item.ItemRelatedProducts.push(_temp);   
    }

    relatedProductRemovePendingLine() {
        const foundIndex = this.item.ItemRelatedProducts.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.item.ItemRelatedProducts.splice(foundIndex, 1);
        }
    }

    relatedProductRefreshDataSource(itemRelatedProducts: ItemRelatedProduct[]) { 
        this.relatedProductDataSource = new MatTableDataSource<ItemRelatedProduct>(itemRelatedProducts);
    }

    onAddItemRelatedProduct(itemRelatedProduct: ItemRelatedProduct) {
        if (this.isRelatedProductRequirementValid(itemRelatedProduct)) { 
            if(!this.existRelatedProduct(itemRelatedProduct.RelatedProductItemID, true)) {    
                this.relatedProductPendingAdd = true; 

                this.itemService.getItem(itemRelatedProduct.RelatedProductItemID).subscribe(
                    (item: Item) => {
                        itemRelatedProduct.PrevRelatedProductItemID = item.ItemID;
                        itemRelatedProduct.RelatedItemName = item.Name;
                        itemRelatedProduct.RelatedItemVendorSKU = item.VendorSKU;
                        itemRelatedProduct.RelatedTPIN = item.TPIN;
                        itemRelatedProduct.pendingAdd = false;                            
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                        this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    }
                );

                this.relatedProductAddPendingLine();  
                this.relatedProductRefreshDataSource(this.item.ItemRelatedProducts);
            }
            else {
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Related product already exists" });
            }   
        }
        else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Please select an item" });
        }
    }

    isRelatedProductRequirementValid(itemRelatedProduct: ItemRelatedProduct): boolean {
        if (itemRelatedProduct
            && itemRelatedProduct.RelatedProductItemID) {
            return true;
        } 
        else {
            return false;
        }
    }

    existRelatedProduct(itemID: number, isNew: boolean = false){
        var counter: number = 0;
        this.item.ItemRelatedProducts.forEach((value, index) => {
                if(value.RelatedProductItemID === itemID) {
                    if(isNew || index != this.item.ItemRelatedProducts.length - 1) {
                        counter += 1; 
                    }
                }
            }
        );
        if(counter > 1) { return true; }
        else { return false; }
    }

    onEditItemRelatedProduct(index: number) {
        if(this.relatedProductPendingAdd) {
            this.currentItemRelatedProductIndex = this.item.ItemRelatedProducts.length - 1;
            this.relatedProductPendingAdd = false;
        }
        else {
            this.currentItemRelatedProductIndex = index;
        }    
    }

    onRelatedProductItemChange(index: number) {      
        if(!this.existRelatedProduct(this.item.ItemRelatedProducts[index].RelatedProductItemID)) {
            this.itemService.getItem(this.item.ItemRelatedProducts[index].RelatedProductItemID).subscribe(
                (item: Item) => {
                    this.item.ItemRelatedProducts[index].PrevRelatedProductItemID = item.ItemID;
                    this.item.ItemRelatedProducts[index].RelatedItemName = item.Name;
                    this.item.ItemRelatedProducts[index].RelatedItemVendorSKU = item.VendorSKU;
                    this.item.ItemRelatedProducts[index].RelatedTPIN = item.TPIN;
                    this.item.ItemRelatedProducts[index].ImagePath = item.ImagePath;
                    this.currentItemRelatedProductIndex = this.item.ItemRelatedProducts.length - 1;
                },
                (error: any) => {
                    this.errorMessage = <any>error;
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                }
            );
        }
        else {
            this.item.ItemRelatedProducts[index].RelatedProductItemID = this.item.ItemRelatedProducts[index].PrevRelatedProductItemID;
            this.currentItemRelatedProductIndex = this.item.ItemRelatedProducts.length - 1;
            this.relatedProductRefreshDataSource(this.item.ItemRelatedProducts);
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Related product already exists" });
        }
    }

    relatedProductMoveDownPosition(itemRelatedProduct: ItemRelatedProduct) {
        this.positionMove(this.item.ItemRelatedProducts, itemRelatedProduct, 1);
        this.item.ItemRelatedProducts.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.relatedProductRefreshDataSource(this.item.ItemRelatedProducts);
    }

    relatedProductMoveUpPosition(itemRelatedProduct: ItemRelatedProduct) {
        this.positionMove(this.item.ItemRelatedProducts, itemRelatedProduct, -1);
        this.item.ItemRelatedProducts.forEach((value, index) => {
            value.Position = index + 1;                        
        });

        this.relatedProductRefreshDataSource(this.item.ItemRelatedProducts);
    }

    positionMove(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a,b)=>a-b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    onRemoveRelatedProduct(itemRelatedProduct: ItemRelatedProduct) {
        const confirmation = confirm(`Remove ${itemRelatedProduct.RelatedItemName}?`);
        if (confirmation) {
            const foundIndex = this.item.ItemRelatedProducts.findIndex(i => i.RelatedProductItemID === itemRelatedProduct.RelatedProductItemID);
            if (foundIndex > -1) {
                this.item.ItemRelatedProducts.splice(foundIndex, 1);
            }            
            this.relatedProductRefreshDataSource(this.item.ItemRelatedProducts);
        }
    }

    clearFields(itemRelatedProduct: ItemRelatedProductInsert) {
        itemRelatedProduct.RelatedProductItemID = null;
        this.formDirty = false;
        //this.selectionCategoriesRef.nativeElement.value = "0: null";
    }
}