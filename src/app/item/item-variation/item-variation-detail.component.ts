
import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemList, ItemVariationListing, ItemAttribute, ItemVariation } from '../../shared/class/item';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, Sort } from '@angular/material';
import { ItemService } from '../item.service';
import { ItemVariationSelectItemComponentDialog } from '../item-variation/item-variation-select-item.component-dialog';
import { ItemVariationComponentDialog } from '../item-variation/item-variation.component-dialog';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'item-variation-detail',
  templateUrl: './item-variation-detail.component.html',
})

export class ItemVariationDetailComponent implements OnInit {
    subscriptionItemList: Subscription;
    subscriptionItemVariationListing: Subscription;
    subscriptionItemAttributes: Subscription;

    itemVariationListing: ItemVariationListing;
    errorMessage: string;
    displayedColumns = [];
    columns = [];
    dataSource: any = null;
        
    selectedItemAttributes: ItemAttribute[] = [];
    originalItemAttributes: ItemAttribute[] = [];
    variationCount: number;    
    
    private imageURL = environment.imageURL;
    isEdit: boolean = false;
    itemLists: ItemList[];
    loading: boolean = false;
    pendingSave: boolean = false;
    itemAttributes: ItemAttribute[];
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    currentPage: number;
    itemsPerPage: number;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private itemService: ItemService,
                public printDialog: MatDialog) {}
    
    ngOnInit(): void {
        this.loading = true;
        const param = this.route.snapshot.params['id'];

        if (param) {
            this.isEdit = true;
            this.subscriptionItemList = this.itemService.getItemList().subscribe(
                (itemLists: ItemList[]) => {
                    this.itemLists = itemLists;

                    this.subscriptionItemVariationListing = this.itemService.getItemVariationListing(param).subscribe(
                        (itemVariationListing: ItemVariationListing) => {
                            this.setPrimaryItem(itemVariationListing);
                            this.itemVariationListing = itemVariationListing;
                            this.loading = false;
                            
                            this.subscriptionItemAttributes = this.itemService.getItemAttributes().subscribe((itemAttributes) => {
                                this.itemAttributes = itemAttributes;
                                this.createAttributesVariationsList(itemVariationListing, itemAttributes);
                                this.createAttributesVariationsColumns(itemVariationListing);
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
            this.subscriptionItemAttributes = this.itemService.getItemAttributes().subscribe((itemattributes) => {
                this.itemAttributes = itemattributes;
                this.itemVariationListing = this.itemService.defaultVariationListingInsert();
                this.loading = false;

                this.subscriptionItemList = this.itemService.getItemList().subscribe(
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

    realIndex(index: number) {
        if (this.currentPage > 0) {
            index = index + this.currentPage * this.itemsPerPage;
        }
        return index;
    }
    openDialogSelectItem(item: ItemVariation, index: number) {
        //this.realIndex(index);
        const variationTitle = item.ItemVariationLines.map((attribute) => attribute.ItemAttributeVariationName).join(' / ');
        
        const data = {
            itemLists: [...this.itemLists],
            variationTitle: variationTitle,
            variationListing: this.itemVariationListing,
            item: item
        }
        const dialogRef = this.printDialog.open(ItemVariationSelectItemComponentDialog, {
            width: '700px',
            data: data
        });
    
        dialogRef.afterClosed().subscribe(result => {
            if (result && result.ItemID) {
                item.ItemID = result.ItemID;
                item.ItemName = result.ItemName;
                item.ItemTPIN = result.TPIN;
                item.ItemImagePath = result.ImagePath;
                item.ItemVendorSKU = result.VendorSKU;
            }
            else if (!result) {
                item.ItemID = null;
                item.ItemName = null;
                item.ItemTPIN = null;
                item.ItemImagePath = null;
                item.ItemVendorSKU = null;
                item.IsPrimary = false;
            }
        },
        (error: any) => {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: error });
        });
    }
    updateListing() {
        this.pendingSave = true;
        const noPrimaryItemSelected = this.itemVariationListing.ItemVariations.every((itemvaration) => !itemvaration.IsPrimary)
        if (noPrimaryItemSelected) this.itemVariationListing.PrimaryItemID = null;
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
        this.originalItemAttributes = [...this.selectedItemAttributes];
        this.selectedItemAttributes = this.selectedItemAttributes.filter((itemAttribute) => itemAttribute.SelectedItemAttributeVariations.length);
        
        const data = {
            selectedItemAttributes: this.selectedItemAttributes,
            itemVariationListing: this.itemVariationListing,
            isEdit: true
        }
        const dialogRef = this.printDialog.open(ItemVariationComponentDialog, {
            data: data
        });
    
        dialogRef.afterClosed().subscribe((listing: ItemVariationListing) => {
            if (!listing) return this.selectedItemAttributes = this.originalItemAttributes;
            this.itemVariationListing = listing;
            this.createAttributesVariationsColumns(this.itemVariationListing);
        });
    }
    selectPrimaryItem(itemVariation) {
        if (!itemVariation.ItemID) return;
        if (itemVariation.IsPrimary) itemVariation.IsPrimary = !itemVariation.IsPrimary;
        this.itemVariationListing.ItemVariations.forEach((variation, i) => {
            if (variation.ItemID !== itemVariation.ItemID) variation.IsPrimary = false;
        })
        this.itemVariationListing.PrimaryItemID = itemVariation.ItemID;
        this.itemVariationListing.ItemName = itemVariation.ItemName;
        this.itemVariationListing.ItemVendorSKU = itemVariation.ItemVendorSKU;
        this.itemVariationListing.ItemTPIN = itemVariation.ItemTPIN;
        this.itemVariationListing.ItemImagePath = itemVariation.ItemImagePath;
    }
    createAttributesVariationsList(itemVariationListing: ItemVariationListing, itemAttributes: ItemAttribute[]) {
        itemVariationListing.ItemVariations.forEach((itemvariation) => {
            itemvariation.ItemVariationLines.forEach((itemVariationLine) => {
                const itemAttribute = itemAttributes.find((attr) => attr.ItemAttributeID === itemVariationLine.ItemAttributeID);
                if (!itemAttribute.SelectedItemAttributeVariations) itemAttribute.SelectedItemAttributeVariations = [];
                const itemExists = itemAttribute.SelectedItemAttributeVariations.find((option)=> option.ItemAttributeVariationID === itemVariationLine.ItemAttributeVariationID);

                if (!itemExists) {
                    const itemToPush = itemAttribute.ItemAttributeVariations.find((attr) => attr.ItemAttributeVariationID === itemVariationLine.ItemAttributeVariationID);
                    itemAttribute.SelectedItemAttributeVariations.push(itemToPush);
                }
            })
        });
        const selectedItemAttributes = itemAttributes.filter((item)=> {
            if (item.SelectedItemAttributeVariations) return item;
        });
        this.selectedItemAttributes = selectedItemAttributes;
    }

    createAttributesVariationsColumns(itemVariationListing: ItemVariationListing) {
        this.displayedColumns = itemVariationListing.ItemVariations[0].ItemVariationLines.map((itemVariationLine) => itemVariationLine.ItemAttributeName);
        this.displayedColumns.unshift('PrimaryItem');
        this.displayedColumns.push('ItemName');
        let data = this.itemVariationListing.ItemVariations;
        data.forEach((itemvariation) => itemvariation.ItemVariationLines.forEach((line) => itemvariation[line.ItemAttributeName] = line.ItemAttributeVariationName));
        this.refreshDataSource(data);
    }
    setPrimaryItem(listing) {
        if (listing.PrimaryItemID && listing.PrimaryItemID != "" && listing.PrimaryItemID != 0) {
            listing.ItemVariations.forEach((itemvariation) => {
                if (listing.PrimaryItemID === itemvariation.ItemID) itemvariation.IsPrimary = true;
            })    
        }
    }
    handlePage($event) {
        this.currentPage = $event.pageIndex;
        this.itemsPerPage = $event.pageSize;
    }
    ngOnDestroy() {
        if (this.subscriptionItemList) this.subscriptionItemList.unsubscribe();
        if (this.subscriptionItemVariationListing) this.subscriptionItemVariationListing.unsubscribe();
        if (this.subscriptionItemAttributes) this.subscriptionItemAttributes.unsubscribe();
    }
}