import { Component, OnInit, OnDestroy, ViewChild , ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { Item, ItemInsert, ItemList, ItemRelatedProductInsert } from '../../../../shared/class/item';
import { ItemService } from '../../../item.service';
import { environment } from 'environments/environment';

@Component({
  templateUrl: './item-add-product-relation-related-product-shell.component.html'
})

export class ItemAddProductRelationRelatedProductShellComponent implements OnInit {
    errorMessage: string;
    item: ItemInsert;

    relatedProductItemlist: ItemList[];
    relatedProductDisplayedColumns = ['Add', 'Down', 'Position', 'Up', 'ItemName', 'SKU', 'TPIN', 'Remove'];
    relatedProductDataSource: any = null;
    relatedProductPendingAdd: boolean;
    relatedProductPendingImage: boolean;
    currentItemRelatedProductIndex: number;
    formDirty = false;
    
    private imageURL = environment.imageURL;

    //@ViewChild('selectionCategoriesRef') selectionCategoriesRef: ElementRef;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.item = this.itemService.currentItemInsert;
        
        if(this.item.ItemRelatedProducts.length === 0) {
            const _temp = new ItemRelatedProductInsert(0, null, null, null, null, null, null, null);
            this.item.ItemRelatedProducts.push(_temp);
        }

        this.currentItemRelatedProductIndex = this.item.ItemRelatedProducts.length - 1;

        this.itemService.getItemList().subscribe(
            (itemlist: ItemList[]) => {
                this.relatedProductItemlist = itemlist;
                this.relatedProductRefreshDataSource(this.item.ItemRelatedProducts);                     
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    relatedProductRefreshDataSource(itemRelatedProducts: ItemRelatedProductInsert[]) { 
        this.relatedProductDataSource = new MatTableDataSource<ItemRelatedProductInsert>(itemRelatedProducts);
    }
    onAddItemRelatedProduct(itemRelatedProduct: ItemRelatedProductInsert) {
        if (this.isRelatedProductRequirementValid(itemRelatedProduct)) { 
            if(!this.existRelatedProduct(itemRelatedProduct.RelatedProductItemID, true)) {        
                this.relatedProductPendingAdd = true;

                this.itemService.getItem(itemRelatedProduct.RelatedProductItemID).subscribe(
                    (item: Item) => {
                        itemRelatedProduct.PrevRelatedProductItemID = item.ItemID;
                        itemRelatedProduct.RelatedItemName = item.Name;
                        itemRelatedProduct.RelatedItemVendorSKU = item.VendorSKU;
                        itemRelatedProduct.RelatedTPIN = item.TPIN;
                        itemRelatedProduct.ImagePath = item.ImagePath;
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                        this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    }
                );

                const _temp = new ItemRelatedProductInsert(0, null, null, null, null, null, null, this.item.ItemRelatedProducts.length + 1);
                this.item.ItemRelatedProducts.push(_temp);
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
    onEditItemRelatedProduct(index: number) {
        if(this.relatedProductPendingAdd) {
            this.currentItemRelatedProductIndex = this.item.ItemRelatedProducts.length - 1;
            this.relatedProductPendingAdd = false;
        }
        else {
            this.currentItemRelatedProductIndex = index;
        }
    }

    onRelatedProductItemChange(index: number, ) {
        if(this.item.ItemRelatedProducts[index].RelatedProductItemID) {
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
    }

    isRelatedProductRequirementValid(itemRelatedProduct: ItemRelatedProductInsert): boolean {
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

    relatedProductMoveDownPosition(itemRelatedProduct: ItemRelatedProductInsert) {
        this.positionMove(this.item.ItemRelatedProducts, itemRelatedProduct, 1);
        this.item.ItemRelatedProducts.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.relatedProductRefreshDataSource(this.item.ItemRelatedProducts);
    }

    relatedProductMoveUpPosition(itemRelatedProduct: ItemRelatedProductInsert) {
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

    onRemoveRelatedProduct(itemRelatedProduct: ItemRelatedProductInsert) {
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