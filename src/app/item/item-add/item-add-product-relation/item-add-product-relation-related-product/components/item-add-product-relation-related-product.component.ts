import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ItemInsert, ItemList, ItemRelatedProductInsert } from '../../../../../shared/class/item';
import { ItemService } from '../../../../item.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'o-item-add-product-relation-related-product',
  templateUrl: './item-add-product-relation-related-product.component.html'
})

export class ItemAddProductRelationRelatedProductComponent implements OnInit, OnChanges {
    @Input() errorMessage: string;
    @Input() isItemListLoading: boolean;
    @Input() item: ItemInsert;
    @Input() relatedProductItemlist: ItemList[];
    @Input() itemRelatedProductsMatTable: MatTableDataSource<ItemRelatedProductInsert>;
    @Output() getItemRelatedProduct = new EventEmitter<ItemRelatedProductInsert>();
    @Output() addNewItemRelatedProductRow = new EventEmitter<ItemRelatedProductInsert>();

    relatedProductDisplayedColumns = ['Add', 'Down', 'Position', 'Up', 'ItemName', 'SKU', 'TPIN', 'Remove'];
    relatedProductPendingAdd: boolean;
    relatedProductPendingImage: boolean;
    currentItemRelatedProductIndex: number;
    formDirty = false;

    public imageURL = environment.imageURL;

    constructor(private itemService: ItemService) { }
    ngOnChanges(changes: SimpleChanges) {
        if (changes.item && changes.item.currentValue && changes.item.currentValue.ItemRelatedProducts.length === 0) {
            const _temp = new ItemRelatedProductInsert(0, null, null, null, null, null, null, null);
            this.item.ItemRelatedProducts.push(_temp);
            this.currentItemRelatedProductIndex = this.item.ItemRelatedProducts.length - 1;
        }
    }
    ngOnInit(): void {
        this.currentItemRelatedProductIndex = this.item.ItemRelatedProducts.length - 1;
    }

    relatedProductRefreshDataSource(itemRelatedProducts: ItemRelatedProductInsert[]) {
        this.itemRelatedProductsMatTable = new MatTableDataSource<ItemRelatedProductInsert>(itemRelatedProducts);
    }
    onAddItemRelatedProduct(itemRelatedProduct: ItemRelatedProductInsert) {
        if (this.isRelatedProductRequirementValid(itemRelatedProduct)) {
            if (!this.existRelatedProduct(itemRelatedProduct.RelatedProductItemID, true)) {
                this.relatedProductPendingAdd = true;

                const _temp = new ItemRelatedProductInsert(0, null, null, null, null, null, null, null);
                this.item.ItemRelatedProducts.push(_temp);
                this.relatedProductRefreshDataSource(this.item.ItemRelatedProducts);
            } else {
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Related product already exists' });
            }
        } else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Please select an item' });
        }
    }
    onEditItemRelatedProduct(index: number) {
        if (this.relatedProductPendingAdd) {
            this.currentItemRelatedProductIndex = this.item.ItemRelatedProducts.length - 1;
            this.relatedProductPendingAdd = false;
        } else {
            this.currentItemRelatedProductIndex = index;
        }
    }

    onRelatedProductItemChange(index: number, ) {
        if (this.item.ItemRelatedProducts[index].RelatedProductItemID) {
            if (!this.existRelatedProduct(this.item.ItemRelatedProducts[index].RelatedProductItemID)) {
                this.getItemRelatedProduct.emit(this.item.ItemRelatedProducts[index]);
                this.currentItemRelatedProductIndex = this.item.ItemRelatedProducts.length - 1;
            } else {
                this.item.ItemRelatedProducts[index].RelatedProductItemID = this.item.ItemRelatedProducts[index].PrevRelatedProductItemID;
                this.currentItemRelatedProductIndex = this.item.ItemRelatedProducts.length - 1;
                this.relatedProductRefreshDataSource(this.item.ItemRelatedProducts);
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Related product already exists' });
            }
        }
    }

    isRelatedProductRequirementValid(itemRelatedProduct: ItemRelatedProductInsert): boolean {
        if (itemRelatedProduct
            && itemRelatedProduct.RelatedProductItemID) {
            return true;
        } else {
            return false;
        }
    }

    existRelatedProduct(itemID: number, isNew: boolean = false) {
        let counter: number = 0;
        this.item.ItemRelatedProducts.forEach((value, index) => {
                if (value.RelatedProductItemID === itemID) {
                    if (isNew || index !== this.item.ItemRelatedProducts.length - 1) {
                        counter += 1;
                    }
                }
            }
        );
        if (counter > 1) { return true; } else { return false; }
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
        const indexes = [index, newIndex].sort((a, b) => a - b); // Sort the indixes
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
    }
}
