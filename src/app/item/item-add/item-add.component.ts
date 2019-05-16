import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemInsert, ItemTierPriceInsert, ItemRelatedProductInsert, ItemUpSellInsert, ItemCrossSellInsert, ItemAttachmentInsert, ItemVideoInsert } from '../../shared/class/item';
import { VendorBrand } from '../../shared/class/vendor-brand';

import { ItemService } from '../item.service';

@Component({
  selector: 'o-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})

export class ItemAddComponent {
    errorMessage: string;
    _item: ItemInsert;
    pendingAdd: boolean;

    loading: boolean;

    vendorBrandList: VendorBrand[]; 

    private dataIsValid: { [key: string]: boolean } = {};

    constructor(private router: Router,
                private itemService: ItemService) {
        this.item = this.itemService.defaultCurrentItemInsert();

        this.itemService.getVendorBrands().subscribe(
            (vendorBrands: VendorBrand[]) => {
                this.vendorBrandList = vendorBrands;
            },
            (error: any) => {
                this.errorMessage = <any>error;                
            }
        ); 
    }

    get item(): ItemInsert {
        return this._item;
    }

    set item(value: ItemInsert) {
        this._item = value;
        this.itemService.currentItemInsert = value;
    }

    reset() {
        this.dataIsValid = null;
        this.item = this.itemService.defaultCurrentItemInsert();
    }

    onAddItem() {
        if(this.isItemNameValid() && this.isSKUValid()) {
            //if (this.isValid(null) && this.isShippingFeeValid() && this.isShipWithinDaysValid() && this.isBundleValid()) {
                if (this.isValid(null) && this.isShipWithinDaysValid() && this.isBundleValid()) {
                    this.pendingAdd = true;
                            
                const newItem = this.itemService.copyItemInsert(this.item);

                newItem.ItemTierPrices.splice(newItem.ItemTierPrices.length-1, 1);
                newItem.ItemRelatedProducts.splice(newItem.ItemRelatedProducts.length-1, 1);
                newItem.ItemRelatedProducts.forEach((value, i) => {
                    value.Position = i + 1;
                });
                newItem.ItemUpSells.splice(newItem.ItemUpSells.length-1, 1);
                newItem.ItemUpSells.forEach((value, i) => {
                    value.Position = i + 1;
                });
                newItem.ItemCrossSells.splice(newItem.ItemCrossSells.length-1, 1);
                newItem.ItemCrossSells.forEach((value, i) => {
                    value.Position = i + 1;
                });
                newItem.ItemAttachments.splice(newItem.ItemAttachments.length-1, 1);
                newItem.ItemAttachments.forEach((value, i) => {
                    value.Position = i + 1;
                });
                newItem.ItemVideos.splice(newItem.ItemVideos.length-1, 1);
                newItem.ItemVideos.forEach((value, i) => {
                    value.Position = i + 1;
                });
                newItem.ItemImages.splice(newItem.ItemImages.length-1, 1);
                newItem.ItemImages.forEach((value, i) => {
                    value.Position = i + 1;
                });
                newItem.ItemOptions.splice(newItem.ItemOptions.length-1, 1);
                newItem.ItemOptions.forEach((value, i) => {
                    value.Position = i + 1;

                    value.ItemSelections.splice(value.ItemSelections.length-1, 1);
                    value.ItemSelections.forEach((value, i) => {
                        value.Position = i + 1;
                    })
                });            

                newItem.ItemParts.splice(newItem.ItemParts.length-1, 1);
                newItem.ItemParts.forEach((value, i) => {
                    value.Position = i + 1;
                });

                this.loading = true; 
                this.itemService.addItem(newItem)
                    .subscribe(
                        () => {
                            this.pendingAdd = false;
                            this.loading = false;
                            this.onAddComplete(`${newItem.Name} was saved`);
                        },
                        (error: any) => {
                            this.pendingAdd = false;
                            this.loading = false;

                            // const _pendingItemTierPrice = new ItemTierPriceInsert(0, 0, 0);
                            // this.item.ItemTierPrices.push(_pendingItemTierPrice);
                            // const _pendingRelatedProduct = new ItemRelatedProductInsert(0, null, null, null, null, null, null);
                            // this.item.ItemRelatedProducts.push(_pendingRelatedProduct);
                            // const _pendingUpSell = new ItemUpSellInsert(0, null, null, null, null, null, null);
                            // this.item.ItemUpSells.push(_pendingUpSell);
                            // const _pendingCrossSell = new ItemCrossSellInsert(0, null, null, null, null, null, null);
                            // this.item.ItemCrossSells.push(_pendingCrossSell);
                            // const _pendingItemAttachment = new ItemAttachmentInsert(null, null, null, null, null, null);
                            // this.item.ItemAttachments.push(_pendingItemAttachment);
                            // const _pendingItemVideo = new ItemVideoInsert(null, null, null, null, null, null, null, null);
                            // this.item.ItemAttachments.push(_pendingItemAttachment);

                            this.itemService.sendNotification({ type: 'error', title: 'Error', content: <any>error });
                        }
                    );
            } else {
                //alert('Please enter all required fields');
                this.itemService.sendNotification({ type: 'error', title: 'Invalid Entry', content: 'Please enter all required fields' });
            }
        }        
    }

    onAddComplete(message?: string) {
        this.itemService.sendNotification({ type: 'success', title: 'Successfully Created', content: message });
        this.router.navigate(['/item']);
    }

    isValid(path: string): boolean {
        this.validate();
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
    }

    isShippingFeeValid(): boolean {
        if(this.item.FulfilledBy === 'Toolots' || this.item.IsFreeShipping) {            
            return true;
        }
        else {
            return (this.item.ShippingFee && this.item.ShippingFee > 0);
        }        
    }

    isShipWithinDaysValid(): boolean {
        if(this.item.FulfilledBy === 'Toolots') {
            return true;
        }
        else {
            return (this.item.ShipWithinDays && this.item.ShipWithinDays >= 0);
        }
    }

    isItemNameValid(): boolean {      
        if(this.item.VendorBrandID) {
            if(this.item.Name.toLowerCase().includes(this.vendorBrandList.find(x => x.VendorBrandID == Number(this.item.VendorBrandID)).BrandName.toLowerCase())) {
                this.itemService.sendNotification({ type: 'error', title: 'Invalid Entry', content: '"Brand" should not be included in "Item Name"' });
                return false;    
            }
            else {
                return true;
            }            
        }  
        else {
            return true;
        }
    }

    isSKUValid(): boolean { 
        var regex = /^[\w\-]*$/g;
        
        if(regex.test(this.item.VendorSKU)) {
            return true;
        }
        else {
            this.itemService.sendNotification({ type: 'error', title: 'Invalid Entry', content: 'SKU must be a comination of alphanumeric characters (space not allowed)' });                
            return false;
        }
    }

    isBundleValid(): boolean {
        if (this.item.ItemType == "bundle") {
            var _ret = true;
            this.item.ItemOptions.forEach((option, index) => {
                if ( (!option.ItemSelections || option.ItemSelections.length === 1) && index != this.item.ItemOptions.length - 1) {
                    this.itemService.sendNotification({ type: 'error', title: 'Invalid Entry', content: 'Selection is required for a Bundle Option "' + option.Title + '"' });
                    _ret = false;
                }                                
            });    

            return _ret;
        }
        else
        {
            return true;
        }
    }

    validate(): void {
        // Clear the validation object
        this.dataIsValid = {};

        // 'description' tab
        // if (this.item && this.validateDescription() && this.isShippingFeeValid() && this.isShipWithinDaysValid()) {
        if (this.item && this.validateDescription() && this.isShipWithinDaysValid()) {
            this.dataIsValid['description'] = true;
        } else {
            this.dataIsValid['description'] = false;
        }

        // 'bundle' tab
        if (this.item && this.validateBundle()) {
            this.dataIsValid['bundle'] = true;
        } else {
            this.dataIsValid['bundle'] = false;
        }

        // 'dimension' tab
        if (this.item && this.validateDimension()) {
            this.dataIsValid['dimension'] = true;
        } else {
            this.dataIsValid['dimension'] = false;
        }

        // 'Price' tab
        if (this.item && this.validatePrice()) {
            this.dataIsValid['price'] = true;
        } else {
            this.dataIsValid['price'] = false;
        }

        // 'Category' tab
        if (this.item && this.validateCategory()) {
            this.dataIsValid['category'] = true;
        } else {
            this.dataIsValid['category'] = false;
        }
    }

    validateBundle() {
        return true;        
    }

    validateDescription() {            
        return (this.item.Name &&
            this.item.VendorSKU &&
            this.item.ItemType &&
            this.item.FulfilledBy );
    }

    validateDimension() {
        return (this.item.ItemType != "simple" || (this.item.Width &&
            this.item.Height &&
            this.item.Weight &&
            this.item.Length &&
            this.item.PackageWidth &&
            this.item.PackageHeight &&
            this.item.PackageWeight &&
            this.item.PackageWeight) );
    }

    validatePrice() {
        return (this.item.PriceType === 'Dynamic' || this.item.Price) && (this.item.FOBPrice || this.item.DropshipPrice);
        //return (this.item.Price && this.item.FOBPrice);
    }

    validateCategory() {
        return true;
    }
}
