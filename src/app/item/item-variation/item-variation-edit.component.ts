
import { Component, OnInit, ViewContainerRef, ViewChild, Inject, ElementRef, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemInsert, ItemList, ItemVariationListing, ItemTierPriceInsert, ItemRelatedProductInsert, ItemUpSellInsert, ItemCrossSellInsert, ItemAttachmentInsert, ItemVideoInsert } from '../../shared/class/item';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { MatDialog, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ItemService } from '../item.service';
import { Observable, Subscription } from 'rxjs';
import { ItemVariationSelectItemComponentDialog } from '../item-variation/item-variation-select-item.component-dialog';
import { utf8Encode } from '@angular/compiler/src/util';


@Component({
  selector: 'item-variation-edit',
  templateUrl: './item-variation-edit.component.html',
})

export class ItemVariationEditComponent implements OnInit {
    private subscription: Subscription;

    variationListing: ItemVariationListing;
    errorMessage: string;
    displayedColumns = [];
    columns = [];
    dataSource: any = null;
    //product: ItemInsert[];
    attributesVariationsList: any[] = [];
    variationCount: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    itemList: ItemList[];
    loading: boolean = false;
    pendingSave: boolean = false;
    // columns = [
    //     { Name: 'Color', ItemAttributeID: 1,  cell: (row, column) => row.filter((i)=> i.ItemAttributeID === column.ItemAttributeID)[0].Name },
    //     { Name: 'Size',  ItemAttributeID: 2,  cell: (row, column) => row.filter((i)=> i.ItemAttributeID === column.ItemAttributeID)[0].Name },
    //   ];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private itemService: ItemService,
                public printDialog: MatDialog) {}
    
    ngOnInit(): void {
        this.loading = true;
        const param = this.route.snapshot.params['id'];
        
        this.itemService.getItemList().subscribe(
            (itemList: ItemList[]) => {
                this.itemList = itemList;
                this.subscription = this.itemService.getItemVariationListing(param).subscribe(
                    (listing: ItemVariationListing) => {
                        listing.ItemVariations.forEach((item) => {
                            if (item.ItemID && !item.ItemName) {
                                const itemlistItem = itemList.find((itemlistItem) => item.ItemID === itemlistItem.ItemID);
                                item.ItemName = itemlistItem.ItemName;
                                item.ItemTPIN = itemlistItem.TPIN;
                                item.ItemVendorSKU = itemlistItem.VendorSKU;
                            }
                        })
                        this.variationListing = listing;
                        this.displayedColumns = listing.ItemVariations[0].ItemVariationLines.map((line) => line.ItemAttributeName);
                        this.columns = listing.ItemVariations[0].ItemVariationLines.map((line) => { 
                            return {
                                Name: line.ItemAttributeName,
                                ItemAttributeID: line.ItemAttributeID,
                                cell: (row, column) => row.filter((i)=> i.ItemAttributeID === column.ItemAttributeID)[0].ItemAttributeVariationName
                            }
                        });
                        this.displayedColumns.push('ItemSelection');
                        let data = this.variationListing.ItemVariations.map((itemvariation) => itemvariation.ItemVariationLines);
                        this.refreshDataSource(data);
                        this.loading = false;
                    },
                    error => {
                        //this.errorMessage = <any>error;
                        this.loading = false;
                        this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                        this.router.navigate(['/item/variation-listing']);                
                    }
                );


            },
            (error: any) => this.errorMessage = <any>error
        );
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
        const variationItemProperties = row.map((attribute) => attribute.ItemAttributeVariationName).join(' / ');
        
        const data = {
            itemList: this.itemList,
            variationItem: variationItemProperties,
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
                item.ItemURLKey = result.ItemURLKey;
                item.ItemVendorSKU = result.VendorSKU;
            }
        },
        (error: any) => {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: error });
        });
    }
    updateListing() {
        this.pendingSave = true;
        console.log(this.variationListing);
            this.itemService.editItemVariationListing(this.variationListing).subscribe(
                (listing: ItemVariationListing) => {
                    this.onSaveComplete(`${this.variationListing.Name} was saved`);                                               
                    console.log(listing);
                    // if(displayPreview) {
                    //     window.open(environment.previewURL + this.item.ItemID + "/options/portal", "_blank");
                    // }

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
}