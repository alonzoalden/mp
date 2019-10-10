import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Item, ItemInsert, ItemCategoryAssignment, ItemOption, ItemSelection, ItemTierPrice, ItemRelatedProduct, ItemUpSell, ItemCrossSell, ItemAttachment, ItemVideo } from '../../../../shared/class/item';
import { ItemService } from '../../../item.service';
import { AppService } from '../../../../app.service';
import { environment } from '../../../../../environments/environment';


@Component({
    selector: 'o-item-part-list',
    templateUrl: './item-part-list.component.html'
})

export class ItemPartListComponent implements OnInit {
    errorMessage: string;
    items: Item[];

    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;

    duplicateItemInsert: ItemInsert;
    duplicateItemCategoryAssignments: ItemCategoryAssignment[];
    duplicateItemOptions: ItemOption[];
    duplicateItemTierPrices: ItemTierPrice[];
    duplicateItemRelatedProducts: ItemRelatedProduct[];
    duplicateItemUpSells: ItemUpSell[];
    duplicateItemCrossSells: ItemCrossSell[];
    duplicateItemAttachments: ItemAttachment[];
    duplicateItemVideos: ItemVideo[];

    displayedColumns = ['Menu', 'ItemID', 'ProductDetails', 'Price', 'UpdatedOn'];
    dataSource: any = null;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    loading: boolean;

    constructor(private router: Router,
        private itemService: ItemService,
        private appService: AppService,
        public itemPrintDialog: MatDialog,
        public itemImportDialog: MatDialog) {

        }

    ngOnInit() {
        this.loading = true;

        this.appService.getCurrentMember()
            .subscribe(
                (data) => {
                    if (data.DefaultPageSize) {
                        this.paginator.pageSize = data.DefaultPageSize;
                    } else {
                        this.paginator.pageSize = 100;
                    }
                },
                (error: any) => {
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: error });
                }
            );

        this.itemService.getPartItems().subscribe(
            (items: Item[]) => {
                this.items = items;
                this.loading = false;
                this.refreshDataSource(items);
            },
            (error: any) => {
                this.loading = false;
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: error });
            }
        );
    }

    refreshDataSource(items: Item[]) {
        this.dataSource = new MatTableDataSource<Item>(items);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    openDialogPrintItemLabel(item: Item) {
        const dialogRef = this.itemPrintDialog.open(ItemPartListComponentItemPrintDialog, {
          width: '250px',
          data: item,
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.Quantity > 0) {
                if (result.Size === 'small') {
                    this.onPrintLabel(item, result.Quantity, result.Border);
                } else {
                    this.onPrintLargeLabel(item, result.Quantity, result.Border);
                }
            }
        });
    }

    onPrintLabel(item: Item, count: number, border: string) {
        this.itemService.downloadItemLabelCount(item.ItemID, count, border).subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = item.TPIN;
                    window.navigator.msSaveOrOpenBlob(data, fileName + '.pdf'); // IE is the worst!!!
                } else {
                    const fileURL = window.URL.createObjectURL(blob);
                    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
                    a.href = fileURL;
                    a.download = item.TPIN;
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }

    onPrintLargeLabel(item: Item, count: number, border: string) {
        this.itemService.downloadItemLargeLabelCount(item.ItemID, count, border).subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = item.TPIN + '_Large';
                    window.navigator.msSaveOrOpenBlob(data, fileName + '.pdf'); // IE is the worst!!!
                } else {
                    const fileURL = window.URL.createObjectURL(blob);
                    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
                    a.href = fileURL;
                    a.download = item.TPIN + '_Large';
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }

    onRemove(item: Item) {
        const confirmation = confirm(`Remove ${item.ItemID}: ${item.Name}?`);
        if (confirmation) {

            this.loading = true;

            this.itemService.deleteItem(item.ItemID).subscribe(
                () => {
                    this.refresh();
                    this.loading = false;
                    this.onDeleteComplete(item, `${item.Name} was deleted`);
                },
                (error: any) => {
                    this.refresh();
                    this.loading = false;
                    //this.refreshDataSource(this.items);
                    this.errorMessage = <any>error;
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                }
            );
        }
    }

    onDuplicate(itemid: number) {
        this.loading = true;

        this.itemService.getItemDuplicate(itemid).subscribe(
            (item: Item) => {
                this.duplicateItemCategoryAssignments = item.ItemCategoryAssignments;
                this.duplicateItemOptions = item.ItemOptions;
                const _pendingItemOption = new ItemOption(null, null, true, item.ItemOptions.length + 1, null, 'radio', null, null, [], true);
                this.duplicateItemOptions.forEach((itemOption) => {
                    const _pendingItemSelection = new ItemSelection(null, null, null, null, null, null, itemOption.ItemSelections.length + 1, false, 0, 0, false, null, null, true);
                    if (itemOption.ItemSelections.length === 0) {
                        _pendingItemSelection.IsDefault = true;
                    }
                    itemOption.ItemSelections.push(_pendingItemSelection);
                });
                this.duplicateItemOptions.push(_pendingItemOption);
                this.duplicateItemTierPrices = item.ItemTierPrices;
                const _pendingItemTierPrice = new ItemTierPrice(0, null, 0, 0, null, null, true);
                this.duplicateItemTierPrices.push(_pendingItemTierPrice);
                this.duplicateItemRelatedProducts = item.ItemRelatedProducts;
                const _pendingItemRelatedProduct = new ItemRelatedProduct(0, null, null, null, null, null, null, item.ItemRelatedProducts.length + 1, null, null, null, true);
                this.duplicateItemRelatedProducts.push(_pendingItemRelatedProduct);
                this.duplicateItemUpSells = item.ItemUpSells;
                const _pendingItemUpSell = new ItemUpSell(0, null, null, null, null, null, null, item.ItemUpSells.length + 1, null, null, null, true);
                this.duplicateItemUpSells.push(_pendingItemUpSell);
                this.duplicateItemCrossSells = item.ItemCrossSells;
                const _pendingItemCrossSell = new ItemCrossSell(0, null, null, null, null, null, null, item.ItemCrossSells.length + 1, null, null, null, true);
                this.duplicateItemCrossSells.push(_pendingItemCrossSell);
                this.duplicateItemAttachments = item.ItemAttachments;
                const _pendingItemAttachment = new ItemAttachment(0, null, null, null, null, null, item.ItemCrossSells.length + 1, null, null, true);
                this.duplicateItemAttachments.push(_pendingItemAttachment);
                this.duplicateItemVideos = item.ItemVideos;
                const _pendingItemVideo = new ItemVideo(0, null, null, null, null, null, null, item.ItemCrossSells.length + 1, null, null, null, null, null, true, true);
                this.duplicateItemVideos.push(_pendingItemVideo);

                this.duplicateItemInsert = new ItemInsert(item.Name, null, item.FulfilledBy, item.ItemType, item.MerchantQuantity, item.ShipWithinDays
                    , item.PriceType, item.Price, item.FOBPrice, item.DropshipPrice, item.SpecialPrice, item.SpecialFrom
                    , item.SpecialTo, item.Width, item.Height, item.Length, item.ProductDimensionUOM, item.Weight, item.ProductWeightUOM
                    , item.PackageWidth, item.PackageHeight, item.PackageLength, item.PackageDimensionUOM, item.PackageWeight, item.PackageWeightUOM, item.PackagingType, item.IsFreeShipping, item.ShippingFee, item.MetaTitle, item.MetaKeywords, item.MetaDescription
                    , item.Origin, item.Warranty, item.MerchantWarranty, item.AddProtectionPlan, null, item.Visibility, item.Description, item.ShortDescription, item.TechnicalDetail
                    , item.AdditionalInformation, item.VendorBrandID, item.Approval, item.IsPartItem, item.PartImageRaw, item.PartImageFilePath, item.PartIsNewImage, item.ExcludeGoogleShopping
                    , this.duplicateItemCategoryAssignments, this.duplicateItemOptions, this.duplicateItemTierPrices
                    , this.duplicateItemRelatedProducts, this.duplicateItemUpSells, this.duplicateItemCrossSells, [], [], [], []);

                this.itemService.duplicateItemInsert = this.duplicateItemInsert;

                this.loading = false;
                this.router.navigate(['/item', 'partadd']);
            },
            error => {
                this.loading = false;
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                this.router.navigate(['/item']);
            }
        );
    }

    onPreview(itemid: string) {
        window.open(environment.previewURL + itemid + '/options/portal/', '_blank');
    }

    onDeleteComplete(item: Item, message?: string): void {
        //this.refreshDataSource(this.items);
        this.itemService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: message });
    }

    refresh() {
        // this.itemService.refreshItems().subscribe(
        //     (items: Item[]) => {
        //         this.items = items;
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );

        this.itemService.getPartItems().subscribe(
            (items: Item[]) => {
                this.items = items;
                this.refreshDataSource(items);
            },
            (error: any) => {
                this.loading = false;
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: error });
            }
        );
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}

export class ItemLabelPrintDialog {
    constructor(
        public Size: string,
        public Quantity: number,
        public Border: string
    ) {}
}

@Component({
selector: 'item-part-list.component-item-print-dialog',
templateUrl: 'item-part-list.component-item-print-dialog.html',
})

export class ItemPartListComponentItemPrintDialog implements OnInit {
    itemLabelPrintDialog: ItemLabelPrintDialog;

    constructor(
        public dialogRef: MatDialogRef<ItemPartListComponentItemPrintDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Item) {

        }
    ngOnInit() {
        this.itemLabelPrintDialog = new ItemLabelPrintDialog('small', 1, 'yes');
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}

