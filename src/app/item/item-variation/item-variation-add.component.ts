
import { Component, OnInit, ViewContainerRef, ViewChild, Inject, ElementRef, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ItemInsert, ItemVariationListing, ItemTierPriceInsert, ItemRelatedProductInsert, ItemUpSellInsert, ItemCrossSellInsert, ItemAttachmentInsert, ItemVideoInsert } from '../../shared/class/item';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../item.service';
import { Observable, Subscription } from 'rxjs';
import { ItemVariationComponentDialog } from '../item-variation/item-variation.component-dialog';


@Component({
  selector: 'item-variation-add',
  templateUrl: './item-variation-add.component.html',
})

export class ItemVariationAddComponent implements OnInit {
    variationListing: ItemVariationListing;
    errorMessage: string;
    test: any;
    //product: ItemVariationListing;
    attributesVariationsList: any[] = [];
    variationCount: number;
    
    //@Input() attributesVariationsList: any[] = [];

    constructor(private router: Router,
                private itemService: ItemService,
                public printDialog: MatDialog) {}
    
    ngOnInit(): void {
        //this.itemService.product.subscribe((product) => this.product = product);
        //this.variationListing = this.itemService.defaultVariationListingInsert();
        
        this.itemService.setVariationListing(this.itemService.defaultVariationListingInsert());
        this.itemService.variationListing.subscribe((listing) => this.variationListing = listing);
    }   

    onUpdateItemData(list) {
        if (list && this.variationListing) {
            const selectedVariations = list.map((i) => {
                if (i.selectedVariation) return i.selectedVariation;
            });
            this.variationListing.ItemVariations.forEach((item) => {
                let variation = item.ItemVariationLines.every((variation) => selectedVariations.indexOf(variation) !== -1);
                if (variation) return this.viewVariationItem(item);
                
                // if (item.ItemVariationItems) {
                //     let variation = item.ItemVariationItems.every((variation) => selectedVariations.indexOf(variation) !== -1);
                //     if (variation) return this.viewVariationItem(item);
                // }
            });
        }
    }
    viewVariationItem(item) {
        this.itemService.currentProductItemInsert.next(item);
    }
    onSaveComplete(message?: string): void {
        // Navigate back to the item list
        this.itemService.sendNotification({ type: 'success', title: 'Successfully Updated', content: message });
    }
    addListing() {
        //if (!this.variationListing) return;
        this.itemService.addItemVariationListing(this.variationListing)
            .subscribe((data) => {
                console.log(data);
                //return to 
            })
    }



    openDialogItemVariation() {
        const dialogRef = this.printDialog.open(ItemVariationComponentDialog, {
            data: this.attributesVariationsList
        });
    
        dialogRef.afterClosed().subscribe(result => {});
    }
}