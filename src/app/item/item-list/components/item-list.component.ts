import { Component, OnInit, ViewChild, Inject, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Item, ItemInsert, ItemCategoryAssignment, ItemOption, ItemSelection, ItemTierPrice, ItemRelatedProduct, ItemUpSell, ItemCrossSell, ItemAttachment, ItemVideo } from '../../../shared/class/item';
import { ItemService } from '../../item.service';
import { environment } from '../../../../environments/environment';
import { Member } from 'app/shared/class/member';

@Component({
    selector: 'o-item-list',
    templateUrl: './item-list.component.html'
})

export class ItemListComponent implements OnInit {
    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;
    @Input() userInfo: Member;
    @Input() itemsMatTable: MatTableDataSource<Item>;
    @Input() errorMessage: string;
    @Input() isLoading: boolean;
    @Input() pendingDelete: boolean;
    @Output() getItems = new EventEmitter<void>();
    @Output() refreshItems = new EventEmitter<void>();
    @Output() deleteItem = new EventEmitter<Item>();
    @Output() downloadItemLabelCount = new EventEmitter<{item: Item, count: number, border: string}>();
    @Output() downloadItemLargeLabelCount = new EventEmitter<{item: Item, count: number, border: string}>();
    @Output() downloadItemTemplate = new EventEmitter<void>();

    selectedItem: Item;
    currentIndex: number;

    duplicateItemInsert: ItemInsert;
    duplicateItemCategoryAssignments: ItemCategoryAssignment[];
    duplicateItemOptions: ItemOption[];
    duplicateItemTierPrices: ItemTierPrice[];
    duplicateItemRelatedProducts: ItemRelatedProduct[];
    duplicateItemUpSells: ItemUpSell[];
    duplicateItemCrossSells: ItemCrossSell[];
    duplicateItemAttachments: ItemAttachment[];
    duplicateItemVideos: ItemVideo[];

    displayedColumns = ['Menu', 'ItemID', 'ProductDetails', 'FulfilledBy', 'Price', 'Quantity', 'MerchantQuantity', 'Approval', 'Visibility', 'UpdatedOn'];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    loading: boolean;

    constructor(private router: Router,
        private itemService: ItemService,
        public itemPrintDialog: MatDialog,
        public itemImportDialog: MatDialog) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.itemsMatTable && changes.itemsMatTable.currentValue.data) {
            this.itemsMatTable.paginator = this.paginator;
            this.itemsMatTable.sort = this.sort;
        }
        if (changes.itemsMatTable && !changes.itemsMatTable.currentValue.data.length && changes.itemsMatTable.firstChange) {
            this.getItems.emit();
        }
        if (changes.userInfo && changes.userInfo.currentValue) {
            if (this.userInfo.DefaultPageSize) {
                this.paginator.pageSize = this.userInfo.DefaultPageSize;
            } else {
                this.paginator.pageSize = 100;
            }
        }
    }

    ngOnInit() {

    }

    refreshDataSource(items: Item[]) {
        this.itemsMatTable = new MatTableDataSource<Item>(items);
        this.itemsMatTable.sort = this.sort;
        this.itemsMatTable.paginator = this.paginator;
    }

    openDialogPrintItemLabel(item: Item) {
        const dialogRef = this.itemPrintDialog.open(ItemListComponentItemPrintDialog, {
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

    openDialogImport() {
        const dialogRef = this.itemPrintDialog.open(ItemListComponentImportDialog, {
            width: '320px',
            data: this.downloadItemLabelCount
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.refreshItems.emit();
            }

          });
    }

    onPrintLabel(item: Item, count: number, border: string) {
        this.downloadItemLabelCount.emit({item: item, count: count, border: border});

    }

    onPrintLargeLabel(item: Item, count: number, border: string) {
        this.downloadItemLargeLabelCount.emit({item: item, count: count, border: border});
    }

    onRemove(item: Item, index: number) {
        this.currentIndex = index;

        const confirmation = confirm(`Remove ${item.ItemID}: ${item.Name}?`);
        if (confirmation) {
            this.deleteItem.emit(item);
        }
    }

    onConvertToPart(item: Item) {
        const confirmation = confirm(`${item.ItemID}: ${item.Name} -Selected Item will be converted as a part item. Would you like to continue?`);
        if (confirmation) {

            this.loading = true;

            this.itemService.getItem(item.ItemID).subscribe(
                (item: Item) => {
                    this.selectedItem = item;

                    if (this.isValidPart(this.selectedItem)) {
                        this.selectedItem.IsPartItem = true;
                        // this.selectedItem.FulfilledBy = 'Toolots';
                        // this.selectedItem.ItemType = 'simple';
                        this.selectedItem.Visibility = 'Search';
                        this.selectedItem.Approval = 'Approved';

                        this.itemService.editItem(this.selectedItem).subscribe(
                            () => {
                                this.refresh();
                                this.loading = false;
                                this.itemService.sendNotification({ type: 'success', title: 'Successfully Updated', content: 'Converted as a part item' });
                            },
                            (error: any) => {
                                this.refresh();
                                this.loading = false;
                                this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                            }
                        );
                    } else {
                        this.loading = false;
                    }
                },
                error => {
                    this.refresh();
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    this.loading = false;
                }
            );


        }
    }

    isValidPart(item: Item): boolean {
        if (item.ItemType != 'simple') {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Item must be a \'Simple\' item' });
            return false;
        } else if (item.FulfilledBy != 'Toolots') {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Item must be fulfilled by \'Toolots\'' });
            return false;
        } else {
            return true;
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
                    , item.PackageWidth, item.PackageHeight, item.PackageLength, item.PackageDimensionUOM, item.PackageWeight, item.PackageWeightUOM, item.IsFreeShipping, item.ShippingFee, item.MetaTitle, item.MetaKeywords, item.MetaDescription
                    , item.Origin, item.Warranty, item.MerchantWarranty, item.AddProtectionPlan, null, item.Visibility, item.Description, item.ShortDescription, item.TechnicalDetail
                    , item.AdditionalInformation, item.VendorBrandID, item.Approval, item.IsPartItem, item.PartImageRaw, item.PartImageFilePath, item.PartIsNewImage, item.ExcludeGoogleShopping
                    , this.duplicateItemCategoryAssignments, this.duplicateItemOptions, this.duplicateItemTierPrices
                    , this.duplicateItemRelatedProducts, this.duplicateItemUpSells, this.duplicateItemCrossSells, [], [], [], []);

                this.itemService.duplicateItemInsert = this.duplicateItemInsert;

                this.loading = false;
                this.router.navigate(['/item', 'add']);
            },
            error => {
                //this.errorMessage = <any>error;
                this.loading = false;
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                this.router.navigate(['/item']);
            }
        );
    }

    onPreview(itemid: string) {
        window.open(environment.previewURL + itemid + '/options/portal/', '_blank');
    }


    refresh() {
        this.refreshItems.emit();
    }

    applyFilter(filterValue: string) {
        this.itemsMatTable.filter = filterValue.trim().toLowerCase();
        if (this.itemsMatTable.paginator) {
            this.itemsMatTable.paginator.firstPage();
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
selector: 'item-list.component-item-print-dialog',
templateUrl: 'item-list.component-item-print-dialog.html',
})

export class ItemListComponentItemPrintDialog implements OnInit {
//quantity: number;
    itemLabelPrintDialog: ItemLabelPrintDialog;

    constructor(
        public dialogRef: MatDialogRef<ItemListComponentItemPrintDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Item) {

        }
    ngOnInit() {
        this.itemLabelPrintDialog = new ItemLabelPrintDialog('small', 1, 'yes');
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}


@Component({
selector: 'item-list.component-import-dialog',
templateUrl: 'item-list.component-import-dialog.html',
})

export class ItemListComponentImportDialog implements OnInit {
    filesToUpload: Array<File> = [];
    selectedFiles: Array<File> = [];
    selectedFileNames: string[] = [];

    loading: boolean;
    updated: boolean;

    @ViewChild('fileUpload', { static: true }) fileUploadVar: any;

    constructor(
        public dialogRef: MatDialogRef<ItemListComponentImportDialog>,
        private itemService: ItemService,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
        this.updated = false;
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = [];
        this.selectedFileNames = [];

        this.selectedFiles = <Array<File>>fileInput.target.files;
        for (let i = 0; i < this.selectedFiles.length; i++) {
            this.filesToUpload.push(this.selectedFiles[i]);
            this.selectedFileNames.push(this.selectedFiles[i].name);
        }
    }

    removeFile(index: number) {
        this.filesToUpload.splice(index, 1);
        this.selectedFileNames.splice(index, 1);
    }

    onImportClick() {
        const formData: FormData = new FormData();
        this.loading = true;
        formData.append('uploadedFiles', this.filesToUpload[0], this.filesToUpload[0].name);
        this.itemService.importItemFile(formData).subscribe (
            (data: string) => {
                this.loading = false;
                this.updated = true;
                this.dialogRef.close(this.updated);
            },
            (error: any) => {
                this.loading = false;
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: error });
                this.dialogRef.close();
            });
    }

    onTemplateClick() {
        //this.downloadItemTemplate.emit();

        this.itemService.downloadItemTemplate().subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = 'Item_Template';
                    window.navigator.msSaveOrOpenBlob(data, fileName + '.xlsx'); // IE is the worst!!!
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
                    a.download = 'Item_Template';
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }

    cancelUpload() {
        this.filesToUpload = [];
        this.selectedFileNames = [];
    }
}
