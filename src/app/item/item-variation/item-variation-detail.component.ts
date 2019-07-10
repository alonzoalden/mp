
import { Component, OnInit, ViewContainerRef, ViewChild, Inject, ElementRef, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemInsert, ItemList, ItemVariationListing, ItemAttribute, ItemTierPriceInsert, ItemRelatedProductInsert, ItemUpSellInsert, ItemCrossSellInsert, ItemAttachmentInsert, ItemVideoInsert } from '../../shared/class/item';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { MatDialog, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ItemService } from '../item.service';
import { Observable, Subscription } from 'rxjs';
import { ItemVariationSelectItemComponentDialog } from '../item-variation/item-variation-select-item.component-dialog';
import { ItemVariationComponentDialog } from '../item-variation/item-variation.component-dialog';

import { utf8Encode } from '@angular/compiler/src/util';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'item-variation-detail',
  templateUrl: './item-variation-detail.component.html',
})

export class ItemVariationDetailComponent implements OnInit {
    
    private subscription: Subscription;
    variationListing: ItemVariationListing;
    errorMessage: string;
    displayedColumns = [];
    columns = [];
    dataSource: any = null;
    
    
    attributesVariationsList: any[] = [];
    variationCount: number;
    
    
    private imageURL = environment.imageURL;
    isEdit: boolean = false;
    itemLists: ItemList[];
    loading: boolean = false;
    pendingSave: boolean = false;
    itemAttributes: ItemAttribute[];
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private itemService: ItemService,
                public printDialog: MatDialog) {}
    
    ngOnInit(): void {
        this.loading = true;
        const param = this.route.snapshot.params['id'];
        
        console.log(param);

        if (param) {
            this.isEdit = true;
            this.itemService.getItemList().subscribe(
                (itemLists: ItemList[]) => {
                    this.itemLists = itemLists;

                    this.itemService.getItemVariationListing(param).subscribe(
                        (listing: ItemVariationListing) => {
                            this.setPrimaryItem(listing)
                            this.variationListing = listing;
                            this.loading = false;
                            
                            this.itemService.getItemAttributes().subscribe((attributes) => {
                                //this.itemAttributes = attributes;
                                this.createAttributesVariationsList(listing, attributes)
                                this.createAttributesVariationsColumns(listing)
                            });
                        },
                        error => {
                            this.loading = false;
                            this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                            this.router.navigate(['/item/variation-listing']);                
                        }
                    )
                }
            )
        }
        else {
            this.itemService.getItemAttributes().subscribe((attributes) => {
                this.itemAttributes = attributes;
                this.variationListing = this.itemService.defaultVariationListingInsert();
                this.loading = false;

                this.itemService.getItemList().subscribe(
                    (itemList: ItemList[]) => {
                        this.itemLists = itemList;
                });

            });
            
        }
    }
    refreshDataSource(data: any[]) {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
    onUpdateItemData(list) {
        if (list && this.variationListing) {
            const selectedVariations = list.map((i) => {
                if (i.selectedVariation) return i.selectedVariation;
            });
            this.variationListing.ItemVariations.forEach((item) => {
                if (item.ItemVariationLines) {
                    let variation = item.ItemVariationLines.every((variation) => selectedVariations.indexOf(variation) !== -1);
                    if (variation) return this.viewVariationItem(item);
                }
            });
        }
    }
    viewVariationItem(item) {
        this.itemService.currentProductItemInsert.next(item);
    }

    openDialogSelectItem(row, i, item) {
        const variationItemProperties = row.map((attribute) => attribute.ItemAttributeVariationName || attribute.Name).join(' / ');
        
        const data = {
            itemLists: [...this.itemLists],
            variationTitle: variationItemProperties,
            variationListing: this.variationListing,
            item: item,
        }
        const dialogRef = this.printDialog.open(ItemVariationSelectItemComponentDialog, {
            width: '700px',
            data: data
        });
    
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                let item = this.variationListing.ItemVariations[i];
                item.ItemID = result.ItemID;
                item.ItemName = result.ItemName;
                item.ItemTPIN = result.TPIN;
                item.ItemImagePath = result.ImagePath;
                item.ItemVendorSKU = result.VendorSKU;
            }
        },
        (error: any) => {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: error });
        });
    }
    updateListing() {
        this.pendingSave = true;
        const itemMethod = this.isEdit ? 'editItemVariationListing' : 'addItemVariationListing';
            this.itemService[itemMethod](this.variationListing).subscribe(
                (listing: ItemVariationListing) => {
                    this.onSaveComplete(`${this.variationListing.Name} was saved`);
                },
                (error: any) => {
                    this.pendingSave = false;
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: <any>error });
                }
            );
    }
    onSaveComplete(message?: string) {
        this.itemService.sendNotification({ type: 'success', title: 'Successfully Saved', content: message });
        this.router.navigate(['item', 'variation-listing']);
    }

    openDialogItemVariation() {
        const data = {
            attributesVariationsList: this.attributesVariationsList,
            variationListing: this.variationListing,
            isEdit: true,
        }

        const dialogRef = this.printDialog.open(ItemVariationComponentDialog, {
            data: data
        });
    
        dialogRef.afterClosed().subscribe(listing => {
            if (!listing) return;
            this.variationListing.ItemVariations = listing.ItemVariations;
            this.displayedColumns = listing.ItemVariations[0].ItemVariationLines.map((line) => {
                if (line.ItemAttributeName) return line.ItemAttributeName
                else {
                    const attribute = this.itemAttributes.find((item) => item.ItemAttributeID === line.ItemAttributeID);
                    return attribute.Name;
                }
            });
            
            this.columns = listing.ItemVariations[0].ItemVariationLines.map((line) => { 
                return {
                    Name: this.itemAttributes.find((item) => item.ItemAttributeID === line.ItemAttributeID).Name,
                    ItemAttributeID: line.ItemAttributeID,
                    cell: (row, column) => {
                        const item = row.filter((i)=> i.ItemAttributeID === column.ItemAttributeID)[0];
                        return item.ItemAttributeVariationName || item.Name;
                    }
                }
            });
            this.displayedColumns.unshift('PrimaryItem');
            this.displayedColumns.push('ItemSelection');
            let data = this.variationListing.ItemVariations.map((itemvariation) => itemvariation.ItemVariationLines);
            this.refreshDataSource(data);
        });
    }
    selectPrimaryItem(row, index) {
        this.variationListing.ItemVariations.forEach((itemvariation, i) => {
            if (i !== index) itemvariation.IsPrimary = false;
        })
        const selectedVariation = this.variationListing.ItemVariations[index];


        this.variationListing.PrimaryItemID = selectedVariation.ItemID
        this.variationListing.ItemName = selectedVariation.ItemName
        this.variationListing.ItemVendorSKU = selectedVariation.ItemVendorSKU
        this.variationListing.ItemTPIN = selectedVariation.ItemTPIN
        this.variationListing.ItemImagePath = selectedVariation.ItemImagePath
    }
    createAttributesVariationsList(listing, attributes) {
        listing.ItemVariations.forEach((itemvariation) => {
            itemvariation.ItemVariationLines.forEach((line) => {
                const attribute = attributes.find((attr) => attr.ItemAttributeID === line.ItemAttributeID)
                if (!attribute.SelectedItemAttributeVariations) attribute.SelectedItemAttributeVariations = [];
                const itemExists = attribute.SelectedItemAttributeVariations.find((option)=> option.ItemAttributeVariationID === line.ItemAttributeVariationID);

                if (!itemExists) {
                    const itemToPush = attribute.ItemAttributeVariations.find((attr) => attr.ItemAttributeVariationID === line.ItemAttributeVariationID)
                    attribute.SelectedItemAttributeVariations.push(itemToPush);
                }
            })
        })

        const list = attributes.filter((item)=> {
            if (item.SelectedItemAttributeVariations) return item;
        })
        
        this.attributesVariationsList = list;
    }

    createAttributesVariationsColumns(listing) {
        this.displayedColumns = listing.ItemVariations[0].ItemVariationLines.map((line) => line.ItemAttributeName);
        this.columns = listing.ItemVariations[0].ItemVariationLines.map((line) => { 
            return {
                Name: line.ItemAttributeName,
                ItemAttributeID: line.ItemAttributeID,
                cell: (row, column) => row.filter((i)=> i.ItemAttributeID === column.ItemAttributeID)[0].ItemAttributeVariationName
            }
        });
        this.displayedColumns.unshift('PrimaryItem');
        this.displayedColumns.push('ItemSelection');
        let data = this.variationListing.ItemVariations.map((itemvariation) => itemvariation.ItemVariationLines);
        this.refreshDataSource(data);
    }
    setPrimaryItem(listing) {
        listing.ItemVariations.forEach((itemvariation) => {
            if (listing.PrimaryItemID === itemvariation.ItemID) itemvariation.IsPrimary = true;
        })
    }
}