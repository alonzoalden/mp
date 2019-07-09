
import { Component, OnInit, ViewContainerRef, ViewChild, Inject, ElementRef, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemInsert, ItemVariationListing, ItemAttributeVariation, ItemTierPriceInsert, ItemRelatedProductInsert, ItemUpSellInsert, ItemCrossSellInsert, ItemAttachmentInsert, ItemVideoInsert } from '../../shared/class/item';
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
    loading: boolean = false;
    isEdit: boolean = false;
    //@Input() attributesVariationsList: any[] = [];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private itemService: ItemService,
                public printDialog: MatDialog) {}
    
    ngOnInit(): void {
        //this.itemService.product.subscribe((product) => this.product = product);
        //this.variationListing = this.itemService.defaultVariationListingInsert();
        
        //this.itemService.setVariationListing(this.itemService.defaultVariationListingInsert());
        //this.itemService.variationListing.subscribe((listing) => this.variationListing = listing);
        this.variationListing = this.itemService.defaultVariationListingInsert();

        const param = this.route.snapshot.params['id'];
        if (param) {
            this.isEdit = true;
            this.loading = true;
            this.itemService.getItemVariationListing(param).subscribe(
                (listing: ItemVariationListing) => {
                    this.variationListing = listing;
                    this.loading = false;
                    
                    this.itemService.getItemAttributes().subscribe((attributes) => {
                        listing.ItemVariations.forEach((itemvariation) => {
                            itemvariation.ItemVariationLines.forEach((line) => {
                                const attrib = attributes.find((attr) => attr.ItemAttributeID === line.ItemAttributeID)
                                if (!attrib.SelectedItemAttributeVariations) attrib.SelectedItemAttributeVariations = [];
                                const itemExists = attrib.SelectedItemAttributeVariations.find((option)=> option.ItemAttributeVariationID === line.ItemAttributeVariationID);

                                if (!itemExists) {
                                    const itemToPush = attrib.ItemAttributeVariations.find((attr) => attr.ItemAttributeVariationID === line.ItemAttributeVariationID)
                                    attrib.SelectedItemAttributeVariations.push(itemToPush);
                                }
                            })
                            console.log(attributes);
                            const list = attributes.filter((item)=> {
                                if (item.SelectedItemAttributeVariations) {
                                    return item;
                                }
                            })
                            console.log(list);
                            this.attributesVariationsList = list;
                        })
                    }
                    )


                },
                error => {
                    //this.errorMessage = <any>error;
                    this.loading = false;
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    this.router.navigate(['/item/variation-listing']);                
                }
            ) 
        }
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
    addListing(viewListing) {
        if (!this.variationListing) return;
        this.loading = true;

        const itemMethod = this.isEdit ? 'editItemVariationListing' : 'addItemVariationListing';

        this.itemService[itemMethod](this.variationListing).subscribe(
            (data) => {
                this.loading = false;
                this.itemService.sendNotification({ type: 'success', title: 'Successfully Saved'});

                if (data.ItemVariationListingID && viewListing) {
                    this.router.navigate(['item', 'variation-listing', data.ItemVariationListingID ]);
                }
                else {
                    this.router.navigate(['/item/variation-listing']);
                }
                
                
                
            }),
            (error: any) => {
                
                this.loading = false;
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: <any>error });
            }
    }



    openDialogItemVariation() {
        const data = {
            attributesVariationsList: this.attributesVariationsList,
            variationListing: this.variationListing,
            isEdit: this.isEdit
        }

        const dialogRef = this.printDialog.open(ItemVariationComponentDialog, {
            data: data
        });
    
        dialogRef.afterClosed().subscribe(listing => {
            if (!listing) return;
            this.variationListing.ItemVariations = listing.ItemVariations;
            
        });
    }
}
