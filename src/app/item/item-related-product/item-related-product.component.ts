import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

//import { ItemRelatedProduct, ItemRelatedProductInsert } from '../../shared/class/item-related-product';
import { Item, ItemList, ItemRelatedProduct, ItemRelatedProductInsert } from '../../shared/class/item';
import { ItemService } from '../item.service';

@Component({
    selector: 'o-item-related-product',
    templateUrl: './item-related-product.component.html',
    styleUrls: ['./item-related-product.component.css']
})

export class ItemRelatedProductComponent implements OnInit, OnDestroy  {
    subscription: Subscription;
    subscriptionList: Subscription;
    itemRelatedProduct: ItemRelatedProductInsert;

    itemlist: ItemList[];
    itemRelatedProducts: ItemRelatedProduct[];
    errorMessage: string;
    itemid: number;
    itemLabel: string;

    pendingAdd: boolean;
    pendingSave: boolean;

    displayedColumns = ['Position', 'Down', 'Up', 'ItemName', 'SKU', 'TPIN', 'Remove'];
    dataSource: any = null;

    @ViewChild(MatSort, { static: false }) sort: MatSort;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private itemService: ItemService) { }

    ngOnInit(): void {
        this.itemid = this.route.snapshot.params['id'];

        this.itemRelatedProduct = new ItemRelatedProductInsert(this.itemid, null, null, null, null, null, null);

        this.itemService.getItem(this.itemid).subscribe(
            (item: Item) => {
                this.itemLabel = item.Name + ' - ' + item.VendorSKU;
            },
            (error: any) => {
                this.errorMessage = <any>error;
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                this.router.navigate(['/item']);
            }
        );

        this.subscription = this.itemService.getItemRelatedProducts(this.itemid).subscribe(
            (itemRelatedProducts: ItemRelatedProduct[]) => {
                this.itemRelatedProducts = itemRelatedProducts;
                this.refreshDataSource(this.itemRelatedProducts);
            },
            (error: any) => this.errorMessage = <any>error
        );

        this.subscriptionList = this.itemService.getItemList().subscribe(
            (itemlist: ItemList[]) => {
                this.itemlist = itemlist;
                this.refreshDataSource(this.itemRelatedProducts);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    refreshDataSource(itemRelatedProducts: ItemRelatedProduct[]) {
        this.dataSource = new MatTableDataSource<ItemRelatedProduct>(itemRelatedProducts);
        this.dataSource.sort = this.sort;

        if(this.itemlist && this.itemlist.length > 0 && this.itemRelatedProducts)
        {
            this.itemlist = this.itemlist.filter(
                (itemlist: ItemList) => !this.itemRelatedProducts.find(
                    x => x.RelatedProductItemID === itemlist.ItemID
                )
            );
        }
    }

    onAddRelatedProduct() {
        if (this.isRequirementValid()) {           
            this.pendingAdd = true;
            this.itemRelatedProduct.Position = this.itemRelatedProducts.length + 1;

            this.itemService.addItemRelatedProduct(this.itemRelatedProduct).subscribe(
                (itemRelatedProduct: ItemRelatedProduct) => {
                    this.pendingAdd = false;
                    this.itemRelatedProducts.push(itemRelatedProduct);

                    const foundIndex = this.itemlist.findIndex(i => i.ItemID === this.itemRelatedProduct.RelatedProductItemID);
                    if (foundIndex > -1) {
                        this.itemlist.splice(foundIndex, 1);
                    }

                    this.refreshDataSource(this.itemRelatedProducts);
                    this.itemRelatedProduct = new ItemRelatedProductInsert(this.itemid, null, null, null, null, null, null);
                },
                (error: any) => {
                    this.pendingAdd = false;
                    this.errorMessage = <any>error;
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                }
            );            
        }
        else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Please enter all required fields" });
        }
    }

    isRequirementValid(): boolean {
        if (this.itemRelatedProduct
            && this.itemRelatedProduct.RelatedProductItemID) {
            return true;
        } 
        else {
            return false;
        }
    }

    moveDownPosition(itemRelatedProduct: ItemRelatedProduct) {
        this.move(this.itemRelatedProducts, itemRelatedProduct, 1);
        this.itemRelatedProducts.forEach((value, index) => {
            value.Position = index + 1;
            this.saveAttachment(value);
        });
        this.refreshDataSource(this.itemRelatedProducts);
    }

    moveUpPosition(itemRelatedProduct: ItemRelatedProduct) {
        this.move(this.itemRelatedProducts, itemRelatedProduct, -1);
        this.itemRelatedProducts.forEach((value, index) => {
            value.Position = index + 1;
            this.saveAttachment(value);
        });
        this.refreshDataSource(this.itemRelatedProducts);
    }

    move(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a,b)=>a-b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    saveAttachment(itemRelatedProduct: ItemRelatedProduct) {
        this.itemService.editItemRelatedProduct(itemRelatedProduct).subscribe(
            (data: ItemRelatedProduct) => {
                //this.onSaveComplete(`${itemAttachment.Title} was updated`);
            },
            (error: any) => {
                this.errorMessage = <any>error;
                this.itemService.sendNotification({ type: 'error', title: 'Errored', content: error.Message });
            }
        );
    }
    onSaveComplete(message?: string): void {
        this.itemService.sendNotification({ type: 'success', title: 'Successfully Updated', content: message });
        //this.router.navigate(['/item']);
    }

    onRemove(itemRelatedProduct: ItemRelatedProduct) {
        const confirmation = confirm(`Remove ${itemRelatedProduct.RelatedItemName}?`);
        if (confirmation) {
            this.itemService.deleteItemRelatedProduct(itemRelatedProduct.ItemRelatedProductID).subscribe(
                () => {                
                    const itemlist = new ItemList(itemRelatedProduct.RelatedProductItemID, itemRelatedProduct.RelatedItemVendorSKU + ' - ' + itemRelatedProduct.RelatedItemName + ' - ' + itemRelatedProduct.RelatedTPIN, 0, null, null, null);
                    this.itemlist.push(itemlist);
                    
                    const foundIndex = this.itemRelatedProducts.findIndex(i => i.ItemRelatedProductID === itemRelatedProduct.ItemRelatedProductID);
                    if (foundIndex > -1) {
                        this.itemRelatedProducts.splice(foundIndex, 1);
                    }

                    this.onDeleteComplete(`${itemRelatedProduct.RelatedItemName} was deleted`);
                },
                (error: any) => {
                    // this.errorMessage = <any>error
                    this.refreshDataSource(this.itemRelatedProducts);
                    this.errorMessage = <any>error;
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    window.location.reload();
                }
            );
        }
    }

    onDeleteComplete(message?: string): void {
        this.refreshDataSource(this.itemRelatedProducts);
        this.itemService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: message });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscriptionList.unsubscribe();
    }
}
