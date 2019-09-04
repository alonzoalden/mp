import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Item, ItemSelection } from '../../shared/class/item';
import { VendorBrand } from '../../shared/class/vendor-brand';

import { ItemService } from '../item.service';
import { AppService } from '../../app.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'o-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})

export class ItemEditComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    
    private originalItem: Item;
    private currentItem: Item;
    itemName: string;
    isPM: boolean;
    
    errorMessage: string;
    pendingSave: boolean;
    
    loading: boolean;

    vendorBrandList: VendorBrand[]; 
    
    private dataIsValid: { [key: string]: boolean } = {};

    constructor(private route: ActivatedRoute,
        private router: Router,
        private itemService: ItemService,
        private appService: AppService) { }

    ngOnInit() {
        const param = this.route.snapshot.params['id'];
        
        this.loading = true;

        this.subscription = this.itemService.getItem(param).subscribe(
            (item: Item) => {
                this.itemService.currentItemEdit = item;
                this.itemName = item.Name;
                this.item = this.itemService.currentItemEdit;

                this.loading = false;
            },
            error => {
                //this.errorMessage = <any>error;
                this.loading = false;
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                this.router.navigate(['/item']);                
            }
        );

        this.itemService.getVendorBrands().subscribe(
            (vendorBrands: VendorBrand[]) => {
                this.vendorBrandList = vendorBrands;
            },
            (error: any) => {
                this.errorMessage = <any>error;                
            }
        ); 

        this.appService.getCurrentMember().subscribe(
            (data) => {
                this.appService.currentMember = data;
                this.isPM = data.IsPM;
            },
            (error: any) => {
                this.errorMessage = <any>error;
            }
        );
    }

    get item(): Item {
        return this.currentItem;
    }
    set item(value: Item) {
        this.currentItem = value;
        // Clone the object to retain a copy
        this.originalItem = Object.assign({}, value);
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
        if(this.isItemNameValid() && this.isSKUValid() && this.isSubmitValid()) {
            //if (this.isValid(null) && this.isShippingFeeValid() && this.isBundleValid()) {
            if (this.isValid(null) && this.isBundleValid()) {
                this.pendingSave = true;

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

                if(newItem.ItemCrossSells) {
                    const pendingItemCrossSellIndex = newItem.ItemCrossSells.findIndex(i => i.pendingAdd === true);
                    if (pendingItemCrossSellIndex > -1) {
                        newItem.ItemCrossSells.splice(pendingItemCrossSellIndex, 1);
                    }
                    newItem.ItemCrossSells.forEach((value, i) => {
                        value.Position = i + 1;
                    });
                }

                if(newItem.ItemAttachments) {
                    const pendingItemAttachmentIndex = newItem.ItemAttachments.findIndex(i => i.pendingAdd === true);
                    if (pendingItemAttachmentIndex > -1) {
                        newItem.ItemAttachments.splice(pendingItemAttachmentIndex, 1);
                    }
                    newItem.ItemAttachments.forEach((value, i) => {
                        value.Position = i + 1;
                    });
                }
                
                if(newItem.ItemVideos) {
                    const pendingItemVideoIndex = newItem.ItemVideos.findIndex(i => i.pendingAdd === true);
                    if (pendingItemVideoIndex > -1) {
                        newItem.ItemVideos.splice(pendingItemVideoIndex, 1);
                    }
                    newItem.ItemVideos.forEach((value, i) => {
                        value.Position = i + 1;
                    });
                }

                if(newItem.ItemImages) {
                    const pendingItemImageIndex = newItem.ItemImages.findIndex(i => i.pendingAdd === true);
                    if (pendingItemImageIndex > -1) {
                        newItem.ItemImages.splice(pendingItemImageIndex, 1);
                    }
                    newItem.ItemImages.forEach((value, i) => {
                        value.Position = i + 1;
                    });
                }

                if(newItem.ItemOptions) {
                    const pendingItemOptionIndex = newItem.ItemOptions.findIndex(i => i.pendingAdd === true);
                    if (pendingItemOptionIndex > -1) {
                        newItem.ItemOptions.splice(pendingItemOptionIndex, 1);
                    }
                    newItem.ItemOptions.forEach((value, i) => {
                        value.Position = i + 1;

                        if(value.ItemSelections) {
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

                if(newItem.ItemSections) {
                    const pendingItemPartIndex = newItem.ItemSections.findIndex(i => i.pendingAdd === true);
                    if (pendingItemPartIndex > -1) {
                        newItem.ItemSections.splice(pendingItemPartIndex, 1);
                    }
                    newItem.ItemSections.forEach((value, i) => {
                        value.Position = i + 1;
                    });
                }

                if (newItem.FulfilledBy === 'Toolots') {
                    newItem.MerchantQuantity = 0;                    
                }            
                if (!this.isPM && newItem.Approval != "Pending") {
                    newItem.Approval = "NotSubmitted";                    
                }
                if(newItem.Visibility == 'NotVisibleIndivisually') {
                    newItem.Approval = "Approved";
                }

                this.loading = true;            
                this.itemService.editItem(newItem).subscribe(
                    (updatedItem: Item) => {
                        this.pendingSave = false;
                        this.loading = false;

                        this.item.FulfilledBy = updatedItem.FulfilledBy;
                        this.item.MerchantQuantity = updatedItem.MerchantQuantity;
                        this.item.Approval = updatedItem.Approval;

                        this.item.ItemImages = updatedItem.ItemImages;

                        this.item.QtyOnHand = updatedItem.QtyOnHand;
                        this.item.QtyAvailable = updatedItem.QtyAvailable;
                        this.item.QtyOnOrder = updatedItem.QtyOnOrder;
                        this.item.QtyBackOrdered = updatedItem.QtyBackOrdered;
                        this.item.MerchantQtyOnHand = updatedItem.MerchantQtyOnHand;
                        this.item.MerchantQtyAvailable = updatedItem.MerchantQtyAvailable;
                        this.item.MerchantQtyOnOrder = updatedItem.MerchantQtyOnOrder;

                        this.originalItem = this.item;
                        
                        this.onSaveComplete(`${this.item.Name} was saved`);                                               

                        if(displayPreview) {
                            window.open(environment.previewURL + this.item.ItemID + "/options/portal", "_blank");
                        }

                        if(printLabel) {
                            this.onPrintLabel();
                        }
                    },
                    (error: any) => {
                        this.pendingSave = false;
                        this.loading = false;
                        this.itemService.sendNotification({ type: 'error', title: 'Error', content: <any>error });
                    }
                );
            } else {
                this.itemService.sendNotification({ type: 'error', title: 'Invalid Entry', content: 'Please enter all required fields' });
            }
        }
    }

    onSaveComplete(message?: string): void {
        // if(this.item.ItemImages)
        // {
        //     const newImagePath = this.item.ItemImages.find(img => img.IsThumbnail && !img.Exclude && !img.Remove);        
        //     // this.itemService.getItem(this.item.ItemID).subscribe(
        //     //     (item: Item) => {                
        //     //         const _item = item;
        //     //         _item.ImagePath = newImagePath ? newImagePath.Raw : null;
        //     //         this.itemService.replaceItem(this.item.ItemID, _item);
        //     //     },
        //     //     (error: any) => {
        //     //         // this.errorMessage = <any>error
        //     //         this.itemService.sendNotification({ type: 'error', title: 'Error', content: '' });
        //     //     }
        //     // );

        //     if(this.itemService.getCurrentItems()){
        //         const foundItem = this.itemService.getCurrentItems().find(i => i.ItemID === this.item.ItemID);
        //         foundItem.ImagePath = newImagePath ? newImagePath.FilePath : null;                
        //         this.itemService.replaceItem(this.item.ItemID, foundItem);
        //     }
        // }

        if(this.itemService.getCurrentItems()){
            const foundItem = this.itemService.getCurrentItems().find(i => i.ItemID === this.item.ItemID);

            if(this.item.ItemImages)
            {
                const newImagePath = this.item.ItemImages.find(img => img.IsThumbnail && !img.Exclude && !img.Remove);
                foundItem.ImagePath = newImagePath ? newImagePath.FilePath : null;  
            }
           switch(this.item.Approval) {
                case "NotSubmitted": { 
                    foundItem.Approval = "Not Submitted"
                    break; 
                 } 
                 case "NotApproved": { 
                    foundItem.Approval = "Not Approved"
                    break; 
                 } 
                 default: { 
                    foundItem.Approval = this.item.Approval
                    break; 
                 } 
            }
            switch(this.item.Visibility) {
                case "NotVisibleIndivisually": { 
                    foundItem.Visibility = "Not Visible Individually"
                    break; 
                 } 
                 case "CatalogAndSearch": { 
                    foundItem.Visibility = "Catalog, Search"
                    break; 
                 } 
                 default: { 
                    foundItem.Visibility = this.item.Visibility
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

        //this.reset();
        this.itemService.sendNotification({ type: 'success', title: 'Successfully Updated', content: message });
        // Navigate back to the item list
        //this.router.navigate(['/item']);
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
    isSubmitValid(): boolean {      
        // console.log(this.originalItem.Approval);
        // console.log(this.item.Approval);
        // console.log(this.item.ItemImages.filter(x => !x.pendingAdd));

        if(this.originalItem.Approval != "Pending" && this.item.Approval == "Pending" && this.item.ItemImages.filter(x => !x.pendingAdd).length < 1) {
            this.itemService.sendNotification({ type: 'error', title: 'Invalid Entry', content: 'An image is required' });
            return false;    
        }
        else {
            return true;
        }      
    }
    isBundleValid(): boolean {
        if (this.item.ItemType == "bundle") {
            var _ret = true;
            this.item.ItemOptions.forEach((option, index) => {              
                if(!option.pendingAdd)
                {
                    if ( !option.ItemSelections || ( option.ItemSelections && option.ItemSelections.filter(
                            (selection: ItemSelection) => selection.ItemID
                        ).length === 0 )
                    ) {
                        this.itemService.sendNotification({ type: 'error', title: 'Invalid Entry', content: 'Selection is required for a Bundle Option "' + option.Title + '"' });
                        _ret = false;
                    }                                                
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
        return (this.item.ItemType != "simple" || (
            this.item.ProductDimensionUOM &&
            this.item.Width &&
            this.item.Height &&
            this.item.ProductWeightUOM &&
            this.item.Weight &&
            this.item.Length &&
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
        this.itemService.downloadItemLabel(this.item.ItemID).subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = this.item.TPIN;
                    window.navigator.msSaveOrOpenBlob(data, fileName + '.pdf'); // IE is the worst!!!
                } else {
                    // const iframe = document.createElement('iframe');
                    // iframe.style.display = 'none';
                    // iframe.src = blobUrl;
                    // document.body.appendChild(iframe);

                    // iframe.onload = (function() {
                    //     iframe.contentWindow.focus();
                    //     iframe.contentWindow.print();
                    // });
                    const fileURL = window.URL.createObjectURL(blob);
                    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
                    a.href = fileURL;
                    a.download = this.item.TPIN;
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }

    requestActive() {
        this.item.RequestApproval = true;
        this.saveItem();
    }

    submitApproval() {
        // console.log(this.item.ItemImages);
        // console.log(this.item.ItemImages.filter(x => !x.pendingAdd));

        if(this.item.ItemImages.filter(x => !x.pendingAdd).length < 1) {
            this.itemService.sendNotification({ type: 'error', title: 'Image Required', content: 'An image is required' });
        }
        else
        {
            this.item.Approval = "Pending";
            this.saveItem();    
        }
    }

    approveItem() {
        this.item.Approval = "Approved";
        this.saveItem();
    }

    notApproveItem() {
        this.item.Approval = "NotApproved";
        this.saveItem();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
