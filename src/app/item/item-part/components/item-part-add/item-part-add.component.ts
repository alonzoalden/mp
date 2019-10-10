import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemInsert, ItemTierPriceInsert, ItemRelatedProductInsert, ItemUpSellInsert, ItemCrossSellInsert, ItemAttachmentInsert, ItemVideoInsert } from '../../../../shared/class/item';
import { VendorBrand } from '../../../../shared/class/vendor-brand';

import { ItemService } from '../../../item.service';

@Component({
  selector: 'o-item-part-add',
  templateUrl: './item-part-add.component.html',
  styleUrls: ['./item-part-add.component.css']
})

export class ItemPartAddComponent {
    errorMessage: string;
    _item: ItemInsert;
    pendingAdd: boolean;

    loading: boolean;

    vendorBrandList: VendorBrand[];

    private dataIsValid: { [key: string]: boolean } = {};

    constructor(private router: Router,
                private itemService: ItemService) {

        this.item = this.itemService.defaultCurrentItemInsert();

        //Default for Item Parts
        this.item.IsPartItem = true;
        this.item.FulfilledBy = 'Toolots';
        this.item.ItemType = 'simple';
        this.item.Visibility = 'Search';
        this.item.Approval = 'Approved';

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
        if (this.isItemNameValid() && this.isSKUValid()) {
                if (this.isValid(null) && this.isShipWithinDaysValid()) {
                    this.pendingAdd = true;

                const newItem = this.itemService.copyItemInsert(this.item);

                newItem.ItemTierPrices.splice(newItem.ItemTierPrices.length - 1, 1);

                newItem.ItemImages.splice(newItem.ItemImages.length - 1, 1);
                newItem.ItemImages.forEach((value, i) => {
                    value.Position = i + 1;
                });

                this.loading = true;
                this.itemService.addPartItem(newItem)
                    .subscribe(
                        () => {
                            this.pendingAdd = false;
                            this.loading = false;
                            this.onAddComplete(`${newItem.Name} was saved`);
                        },
                        (error: any) => {
                            this.pendingAdd = false;
                            this.loading = false;
                            this.itemService.sendNotification({ type: 'error', title: 'Error', content: <any>error });
                        }
                    );
            } else {
                this.itemService.sendNotification({ type: 'error', title: 'Invalid Entry', content: 'Please enter all required fields' });
            }
        }
    }

    onAddComplete(message?: string) {
        this.itemService.sendNotification({ type: 'success', title: 'Successfully Created', content: message });
        this.router.navigate(['/item/part']);
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
        if (this.item.FulfilledBy === 'Toolots' || this.item.IsFreeShipping) {
            return true;
        } else {
            return (this.item.ShippingFee && this.item.ShippingFee > 0);
        }
    }

    isShipWithinDaysValid(): boolean {
        if (this.item.FulfilledBy === 'Toolots') {
            return true;
        } else {
            return (this.item.ShipWithinDays && this.item.ShipWithinDays >= 0);
        }
    }

    isItemNameValid(): boolean {
        if (this.item.VendorBrandID) {
            if (this.item.Name.toLowerCase().includes(this.vendorBrandList.find(x => x.VendorBrandID == Number(this.item.VendorBrandID)).BrandName.toLowerCase())) {
                this.itemService.sendNotification({ type: 'error', title: 'Invalid Entry', content: '"Brand" should not be included in "Item Name"' });
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    isSKUValid(): boolean {
        let regex = /^[\w\-]*$/g;

        if (regex.test(this.item.VendorSKU)) {
            return true;
        } else {
            this.itemService.sendNotification({ type: 'error', title: 'Invalid Entry', content: 'SKU must be a comination of alphanumeric characters (space not allowed)' });
            return false;
        }
    }

    validate(): void {
        // Clear the validation object
        this.dataIsValid = {};

        // 'description' tab
        if (this.item && this.validateDescription() && this.isShipWithinDaysValid()) {
            this.dataIsValid['description'] = true;
        } else {
            this.dataIsValid['description'] = false;
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
    }

    validateDescription() {
        return (this.item.Name &&
            this.item.VendorSKU &&
            this.item.ItemType &&
            this.item.FulfilledBy );
    }

    validateDimension() {
        return (this.item.ItemType != 'simple' || (this.item.Width &&
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

}
