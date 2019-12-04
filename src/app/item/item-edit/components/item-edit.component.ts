import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item, ItemSelection } from '../../../shared/class/item';
import { VendorBrand } from '../../../shared/class/vendor-brand';
import { ItemService } from '../../item.service';
import { Member } from '../../../shared/class/member';

@Component({
  selector: 'o-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})

export class ItemEditComponent implements OnInit, OnChanges {
    private originalItem: Item;
    private currentItem: Item;
    itemName: string;
    isPM: boolean;
    @Input() vendorBrandList: VendorBrand[];
    @Input() isLoading: boolean;
    @Input() item: Item;
    @Input() userInfo: Member;
    @Input() errorMessage: string;
    @Input() pendingSave: boolean;
    @Output() getItem = new EventEmitter<number>();
    @Output() editItem = new EventEmitter<{item: Item, displayPreview: boolean, printLabel: boolean}>();
    @Output() downloadItemLabel = new EventEmitter<Item>();
    @Output() getVendorBrands = new EventEmitter<void>();
    loading: boolean;

    private dataIsValid: { [key: string]: boolean } = {};

    constructor(private route: ActivatedRoute,
        private router: Router,
        private itemService: ItemService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.item && changes.item.currentValue) {
            this.originalItem = this.item;
            this.itemName = this.item.Name;
        }
        if (changes.userInfo && changes.userInfo.currentValue) {
            this.isPM = this.userInfo.IsPM;
        }
    }

    ngOnInit() {
        this.isLoading = true;
        this.getVendorBrands.emit();
        const param = this.route.snapshot.params['id'];
        this.getItem.emit(param);
    }

    get hasChange(): boolean {
        return JSON.stringify(this.originalItem) !== JSON.stringify(this.currentItem);
    }

    cancelEdit(): void {
        this.router.navigate(['/item']);
    }

    confirmLoseChange(): void {
        this.itemService.replaceItem(this.originalItem.ItemID, this.originalItem);
    }

    saveItem(displayPreview: boolean = false, printLabel: boolean = false): void {
        if (this.isItemNameValid() && this.isSKUValid() && this.isSubmitValid()) {
            //if (this.isValid(null) && this.isShippingFeeValid() && this.isBundleValid()) {
            if (this.isValid(null) && this.isBundleValid()) {
                //this.pendingSave = true;
                const newItem = this.itemService.copyItem(this.item);

                if (newItem.ItemTierPrices) {
                    const pendingItemTierPriceIndex = newItem.ItemTierPrices.findIndex(i => i.pendingAdd === true);
                    if (pendingItemTierPriceIndex > -1) {
                        newItem.ItemTierPrices.splice(pendingItemTierPriceIndex, 1);
                    }
                }

                if (newItem.ItemRelatedProducts) {
                    const pendingItemRelatedProductIndex = newItem.ItemRelatedProducts.findIndex(i => i.pendingAdd === true);
                    if (pendingItemRelatedProductIndex > -1) {
                        newItem.ItemRelatedProducts.splice(pendingItemRelatedProductIndex, 1);
                    }
                    newItem.ItemRelatedProducts.forEach((value, i) => {
                        value.Position = i + 1;
                    });
                }

                if (newItem.ItemUpSells) {
                    const pendingItemUpSellIndex = newItem.ItemUpSells.findIndex(i => i.pendingAdd === true);
                    if (pendingItemUpSellIndex > -1) {
                        newItem.ItemUpSells.splice(pendingItemUpSellIndex, 1);
                    }
                    newItem.ItemUpSells.forEach((value, i) => {
                        value.Position = i + 1;
                    });
                }

                if (newItem.ItemCrossSells) {
                    const pendingItemCrossSellIndex = newItem.ItemCrossSells.findIndex(i => i.pendingAdd === true);
                    if (pendingItemCrossSellIndex > -1) {
                        newItem.ItemCrossSells.splice(pendingItemCrossSellIndex, 1);
                    }
                    newItem.ItemCrossSells.forEach((value, i) => {
                        value.Position = i + 1;
                    });
                }

                if (newItem.ItemAttachments) {
                    const pendingItemAttachmentIndex = newItem.ItemAttachments.findIndex(i => i.pendingAdd === true);
                    if (pendingItemAttachmentIndex > -1) {
                        newItem.ItemAttachments.splice(pendingItemAttachmentIndex, 1);
                    }
                    newItem.ItemAttachments.forEach((value, i) => {
                        value.Position = i + 1;
                    });
                }

                if (newItem.ItemVideos) {
                    const pendingItemVideoIndex = newItem.ItemVideos.findIndex(i => i.pendingAdd === true);
                    if (pendingItemVideoIndex > -1) {
                        newItem.ItemVideos.splice(pendingItemVideoIndex, 1);
                    }
                    newItem.ItemVideos.forEach((value, i) => {
                        value.Position = i + 1;
                    });
                }

                if (newItem.ItemImages) {
                    const pendingItemImageIndex = newItem.ItemImages.findIndex(i => i.pendingAdd === true);
                    if (pendingItemImageIndex > -1) {
                        newItem.ItemImages.splice(pendingItemImageIndex, 1);
                    }
                    newItem.ItemImages.forEach((value, i) => {
                        value.Position = i + 1;
                    });
                }

                if (newItem.ItemOptions) {
                    const pendingItemOptionIndex = newItem.ItemOptions.findIndex(i => i.pendingAdd === true);
                    if (pendingItemOptionIndex > -1) {
                        newItem.ItemOptions.splice(pendingItemOptionIndex, 1);
                    }
                    newItem.ItemOptions.forEach((value, i) => {
                        value.Position = i + 1;

                        if (value.ItemSelections) {
                            const pendingItemSelectionIndex = value.ItemSelections.findIndex(i => i.pendingAdd === true);
                            if (pendingItemSelectionIndex > -1) {
                                value.ItemSelections.splice(pendingItemSelectionIndex, 1);
                            }
                            value.ItemSelections.forEach((value2, i) => {
                                value2.Position = i + 1;
                            });
                        }

                    });
                }

                if (newItem.ItemSections) {
                    const pendingItemPartIndex = newItem.ItemSections.findIndex(i => i.pendingAdd === true);
                    if (pendingItemPartIndex > -1) {
                        newItem.ItemSections.splice(pendingItemPartIndex, 1);
                    }
                    newItem.ItemSections.forEach((value, i) => {
                        value.Position = i + 1;

                        if (value.ItemParts) {
                            const pendingItemSelectionIndex = value.ItemParts.findIndex(i => i.pendingAdd === true);
                            if (pendingItemSelectionIndex > -1) {
                                value.ItemParts.splice(pendingItemSelectionIndex, 1);
                            }
                            value.ItemParts.forEach((value2, i) => {
                                value2.Position = i + 1;
                            });
                        }
                    });
                }

                // if (newItem.InventoryDetailsSerialized) {
                //     const pendingItemPartIndex = newItem.InventoryDetailsSerialized.findIndex(i => i.pendingAdd === true);
                //     if (pendingItemPartIndex > -1) {
                //         newItem.InventoryDetailsSerialized.splice(pendingItemPartIndex, 1);
                //     }
                //     newItem.InventoryDetailsSerialized.forEach((value, i) => {
                //         value.Position = i + 1;

                //         if (value.ItemImageSerialized) {
                //             const pendingItemSelectionIndex = value.ItemImageSerialized.findIndex(i => i.pendingAdd === true);
                //             if (pendingItemSelectionIndex > -1) {
                //                 value.ItemImageSerialized.splice(pendingItemSelectionIndex, 1);
                //             }
                //             value.ItemImageSerialized.forEach((value2, i) => {
                //                 value2.Position = i + 1;
                //             });
                //         }
                //     });
                // }

                if (newItem.FulfilledBy === 'Toolots') {
                    newItem.MerchantQuantity = 0;
                }
                if (!this.isPM && newItem.Approval !== 'Pending') {
                    newItem.Approval = 'NotSubmitted';
                }
                if (newItem.Visibility === 'NotVisibleIndivisually') {
                    newItem.Approval = 'Approved';
                }

                this.editItem.emit({item: newItem, displayPreview: displayPreview, printLabel: printLabel});
                this.onSaveComplete(`${this.item.Name} was saved`);
            } else {
                this.itemService.sendNotification({ type: 'error', title: 'Invalid Entry', content: 'Please enter all required fields' });
            }
        }
    }

    onSaveComplete(message?: string): void {
        if (this.itemService.getCurrentItems()) {
            const foundItem = this.itemService.getCurrentItems().find(i => i.ItemID === this.item.ItemID);

            if (this.item.ItemImages) {
                const newImagePath = this.item.ItemImages.find(img => img.IsThumbnail && !img.Exclude && !img.Remove);
                foundItem.ImagePath = newImagePath ? newImagePath.FilePath : null;
            }
           switch (this.item.Approval) {
                case 'NotSubmitted': {
                    foundItem.Approval = 'Not Submitted';
                    break;
                 }
                 case 'NotApproved': {
                    foundItem.Approval = 'Not Approved';
                    break;
                 }
                 default: {
                    foundItem.Approval = this.item.Approval;
                    break;
                 }
            }
            switch (this.item.Visibility) {
                case 'NotVisibleIndivisually': {
                    foundItem.Visibility = 'Not Visible Individually';
                    break;
                 }
                 case 'CatalogAndSearch': {
                    foundItem.Visibility = 'Catalog, Search';
                    break;
                 }
                 default: {
                    foundItem.Visibility = this.item.Visibility;
                    break;
                 }
            }
            foundItem.Price = this.item.Price;
            foundItem.MerchantQuantity = this.item.MerchantQuantity;

            foundItem.QtyAvailable = this.item.QtyAvailable;
            foundItem.MerchantQtyAvailable = this.item.MerchantQtyAvailable;

            foundItem.Name = this.item.Name;
            foundItem.VendorSKU = this.item.VendorSKU;
            foundItem.FulfilledBy = this.item.FulfilledBy;

            this.itemService.replaceItem(this.item.ItemID, foundItem);
        }
    }

    // Reset the data
    // Required after a save so the data is no longer seen as dirty.
    reset(): void {
        this.dataIsValid = null;
        this.currentItem = null;
        this.originalItem = null;
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
            // tslint:disable-next-line: triple-equals
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
        const regex = /^[\w\-]*$/g;

        if (regex.test(this.item.VendorSKU)) {
            return true;
        } else {
            this.itemService.sendNotification({ type: 'error', title: 'Invalid Entry', content: 'SKU must be a comination of alphanumeric characters (space not allowed)' });
            return false;
        }
    }
    isSubmitValid(): boolean {
        if (this.originalItem.Approval !== 'Pending' && this.item.Approval === 'Pending' && this.item.ItemImages.filter(x => !x.pendingAdd).length < 1) {
            this.itemService.sendNotification({ type: 'error', title: 'Invalid Entry', content: 'An image is required' });
            return false;
        } else {
            return true;
        }
    }
    isBundleValid(): boolean {
        if (this.item.ItemType === 'bundle') {
            let _ret = true;
            this.item.ItemOptions.forEach((option, index) => {
                if (!option.pendingAdd) {
                    if (!option.ItemSelections || ( option.ItemSelections && option.ItemSelections.filter((selection: ItemSelection) =>
                        selection.ItemID).length === 0 )) {
                            this.itemService.sendNotification({ type: 'error', title: 'Invalid Entry', content: 'Selection is required for a Bundle Option "' + option.Title + '"' });
                            _ret = false;
                    }
                }
            });

            return _ret;
        } else {
            return true;
        }
    }

    validate(): void {
        // Clear the validation object
        this.dataIsValid = {};

        // 'description' tab
        //if (this.item && this.validateDescription() && this.isShippingFeeValid() && this.isShipWithinDaysValid()) {
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

    validateDescription() {
        return (this.item.Name &&
            this.item.VendorSKU &&
            this.item.ItemType &&
            this.item.Origin &&
            this.item.FulfilledBy);
    }

    validateBundle() {
        return true;
    }

    validateDimension() {
        return (this.item.ItemType !== 'simple' || (
            this.item.ProductDimensionUOM &&
            this.item.Width &&
            this.item.Height &&
            this.item.ProductWeightUOM &&
            this.item.Weight &&
            this.item.Length &&
            this.item.PackagingType &&
            this.item.PackageDimensionUOM &&
            this.item.PackageWidth &&
            this.item.PackageHeight &&
            this.item.PackageWeight &&
            this.item.PackageWeightUOM &&
            this.item.PackageWeight) );
    }

    validatePrice() {
        return (this.item.PriceType === 'Dynamic' || this.item.Price) && (this.item.FOBPrice || this.item.DropshipPrice);
        //return (this.item.Price && this.item.FOBPrice);
    }

    validateCategory() {
        return true;
    }

    onPrintLabel() {
        this.downloadItemLabel.emit(this.item);
    }

    requestActive() {
        this.item.RequestApproval = true;
        this.saveItem();
    }

    submitApproval() {
        if (this.item.ItemImages.filter(x => !x.pendingAdd).length < 1) {
            this.itemService.sendNotification({ type: 'error', title: 'Image Required', content: 'An image is required' });
        } else {
            this.item.Approval = 'Pending';
            this.saveItem();
        }
    }

    approveItem() {
        this.item.Approval = 'Approved';
        this.saveItem();
    }

    notApproveItem() {
        this.item.Approval = 'NotApproved';
        this.saveItem();
    }
}
