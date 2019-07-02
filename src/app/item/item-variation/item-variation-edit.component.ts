
import { Component, OnInit, ViewContainerRef, ViewChild, Inject, ElementRef, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ItemInsert, ItemVariationListing, ItemTierPriceInsert, ItemRelatedProductInsert, ItemUpSellInsert, ItemCrossSellInsert, ItemAttachmentInsert, ItemVideoInsert } from '../../shared/class/item';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { MatDialog, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ItemService } from '../item.service';
import { Observable, Subscription } from 'rxjs';
import { ItemVariationComponentDialog } from '../item-variation/item-variation.component-dialog';


@Component({
  selector: 'item-variation-edit',
  templateUrl: './item-variation-edit.component.html',
})

export class ItemVariationEditComponent implements OnInit {
    variationListing: ItemVariationListing;
    errorMessage: string;
    displayedColumns = [];
    dataSource: any = null;
    //product: ItemInsert[];
    attributesVariationsList: any[] = [];
    variationCount: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    columns = [
        { Name: 'Color', ItemAttributeID: 1,  cell: (row, column) => row.filter((i)=> i.ItemAttributeID === column.ItemAttributeID)[0].Name },
        { Name: 'Size',  ItemAttributeID: 2,  cell: (row, column) => row.filter((i)=> i.ItemAttributeID === column.ItemAttributeID)[0].Name },
      ];
      
    data: any[] = [
        [ { Name: 'Red', ItemAttributeID: 1 }, { Name: 'Small', ItemAttributeID: 2 } ],
        [ { Name: 'Red', ItemAttributeID: 1 }, { Name: 'Medium', ItemAttributeID: 2 } ],
        [ { Name: 'Black', ItemAttributeID: 1 }, { Name: 'Small', ItemAttributeID: 2 } ],
        [ { Name: 'Black', ItemAttributeID: 1 }, { Name: 'Medium', ItemAttributeID: 2 } ],
    ];

    //   public ItemAttributeID: number,
    //     public VendorID: number,
    //     public Name: string,        
    //     public UpdatedOn: string,
    //     public CreatedOn: string,
    //     public ItemVariations: Array<ItemVariation>

    //     public ItemVariationID: number,
    //     public ItemAttributeID: number,
    //     public Name: string,        
    //     public UpdatedOn: string,
    //     public CreatedOn: string,    
    
    //@Input() attributesVariationsList: any[] = [];

    constructor(private router: Router,
                private itemService: ItemService,
                public printDialog: MatDialog) {}
    
    ngOnInit(): void {
        //this.itemService.product.subscribe((product) => this.product = product);
        //this.variationGroup = new ItemVariationGroup(null, null, null, []);
        this.variationListing = this.itemService.defaultVariationListingInsert();
        this.displayedColumns = this.columns.map(x => x.Name);
        
        this.displayedColumns.push('ItemSelection')
        this.refreshDataSource(this.data);
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
    onSaveComplete(message?: string): void {
        // Navigate back to the item list
        this.itemService.sendNotification({ type: 'success', title: 'Successfully Updated', content: message });
    }
    addGroup() {
        
    }

    openDialogItemVariation() {
        const dialogRef = this.printDialog.open(ItemVariationComponentDialog, {
            data: this.attributesVariationsList
        });
    
        dialogRef.afterClosed().subscribe(result => {});
    }
}