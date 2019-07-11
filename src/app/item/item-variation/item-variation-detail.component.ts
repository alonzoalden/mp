
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
    itemVariationListing: ItemVariationListing;
    errorMessage: string;
    displayedColumns = [];
    columns = [];
    dataSource: any = null;
        
    selectedItemAttributes: ItemAttribute[] = [];
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
                        (itemVariationListing: ItemVariationListing) => {
                            this.setPrimaryItem(itemVariationListing)
                            this.itemVariationListing = itemVariationListing;
                            this.loading = false;
                            
                            this.itemService.getItemAttributes().subscribe((itemAttributes) => {
                                this.itemAttributes = itemAttributes;
                                this.createAttributesVariationsList(itemVariationListing, itemAttributes)
                                this.createAttributesVariationsColumns(itemVariationListing)
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
                this.itemVariationListing = this.itemService.defaultVariationListingInsert();
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
        if (list && this.itemVariationListing) {
            const selectedVariations = list.map((i) => {
                if (i.selectedVariation) return i.selectedVariation;
            });
            this.itemVariationListing.ItemVariations.forEach((item) => {
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
            variationListing: this.itemVariationListing,
            item: item,
        }
        const dialogRef = this.printDialog.open(ItemVariationSelectItemComponentDialog, {
            width: '700px',
            data: data
        });
    
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                let item = this.itemVariationListing.ItemVariations[i];
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

        console.log(this.itemVariationListing);

        const itemMethod = this.isEdit ? 'editItemVariationListing' : 'addItemVariationListing';
            this.itemService[itemMethod](this.itemVariationListing).subscribe(
                (listing: ItemVariationListing) => {
                    this.pendingSave = false;
                    this.onSaveComplete(`${this.itemVariationListing.Name} was saved`);
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
            selectedItemAttributes: this.selectedItemAttributes,
            itemVariationListing: this.itemVariationListing,
            isEdit: true,
        }

        const dialogRef = this.printDialog.open(ItemVariationComponentDialog, {
            data: data
        });
    
        dialogRef.afterClosed().subscribe(listing => {
            if (!listing) return;
            this.itemVariationListing.ItemVariations = listing.ItemVariations;
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
            let data = this.itemVariationListing.ItemVariations.map((itemvariation) => itemvariation.ItemVariationLines);
            this.refreshDataSource(data);
        });
    }
    selectPrimaryItem(row, index) {
        this.itemVariationListing.ItemVariations.forEach((itemvariation, i) => {
            if (i !== index) itemvariation.IsPrimary = false;
        })
        const selectedVariation = this.itemVariationListing.ItemVariations[index];

        this.itemVariationListing.PrimaryItemID = selectedVariation.ItemID
        this.itemVariationListing.ItemName = selectedVariation.ItemName
        this.itemVariationListing.ItemVendorSKU = selectedVariation.ItemVendorSKU
        this.itemVariationListing.ItemTPIN = selectedVariation.ItemTPIN
        this.itemVariationListing.ItemImagePath = selectedVariation.ItemImagePath
    }
    createAttributesVariationsList(itemVariationListing: ItemVariationListing, itemAttributes: ItemAttribute[]) {
        itemVariationListing.ItemVariations.forEach((itemvariation) => {
            itemvariation.ItemVariationLines.forEach((itemVariationLine) => {
                const itemAttribute = itemAttributes.find((attr) => attr.ItemAttributeID === itemVariationLine.ItemAttributeID)
                if (!itemAttribute.SelectedItemAttributeVariations) itemAttribute.SelectedItemAttributeVariations = [];
                const itemExists = itemAttribute.SelectedItemAttributeVariations.find((option)=> option.ItemAttributeVariationID === itemVariationLine.ItemAttributeVariationID);

                if (!itemExists) {
                    const itemToPush = itemAttribute.ItemAttributeVariations.find((attr) => attr.ItemAttributeVariationID === itemVariationLine.ItemAttributeVariationID)
                    itemAttribute.SelectedItemAttributeVariations.push(itemToPush);
                }
            })
        })

        const selectedItemAttributes = itemAttributes.filter((item)=> {
            if (item.SelectedItemAttributeVariations) return item;
        })
        
        this.selectedItemAttributes = selectedItemAttributes;
    }

    createAttributesVariationsColumns(itemVariationListing: ItemVariationListing) {
        this.displayedColumns = itemVariationListing.ItemVariations[0].ItemVariationLines.map((itemVariationLine) => itemVariationLine.ItemAttributeName);
        this.columns = itemVariationListing.ItemVariations[0].ItemVariationLines.map((itemVariationLine) => { 
            return {
                Name: itemVariationLine.ItemAttributeName,
                ItemAttributeID: itemVariationLine.ItemAttributeID,
                cell: (row, column) => row.filter((i)=> i.ItemAttributeID === column.ItemAttributeID)[0].ItemAttributeVariationName
            }
        });
        this.displayedColumns.unshift('PrimaryItem');
        this.displayedColumns.push('ItemSelection');
        let data = this.itemVariationListing.ItemVariations.map((itemvariation) => itemvariation.ItemVariationLines);
        this.refreshDataSource(data);
    }
    setPrimaryItem(listing) {
        if(listing.PrimaryItemID && listing.PrimaryItemID != "" && listing.PrimaryItemID != 0)
        {
            listing.ItemVariations.forEach((itemvariation) => {
                if (listing.PrimaryItemID === itemvariation.ItemID) itemvariation.IsPrimary = true;
            })    
        }
    }
}