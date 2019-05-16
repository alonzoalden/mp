import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

//import { ItemImage } from '../../shared/class/item-image';
import { Item, ItemImage } from '../../shared/class/item';
import { ItemService } from '../item.service';

@Component({
  selector: 'o-item-image',
  templateUrl: './item-image.component.html'
})

export class ItemImageComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    itemImages: ItemImage[];
    errorMessage: string;
    pendingSave: boolean;
    pendingUpload: boolean;
    private isUploadBtn: Boolean = true;
    public isLoadingData: Boolean = false;

    filesToUpload: Array<File> = [];
    selectedFileNames: string[] = [];
    res: Array<string>;

    itemid: number;
    currentItem: Item;
    itemLabel: string;

    displayedColumns = ['Position', 'Down', 'Up', 'Raw', 'Label', 'IsBaseImage', 'IsSmallImage', 'IsThumbnail', 'IsRotatorImage', 'Exclude', 'Remove'];
    dataSource: any = null;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('fileUpload') fileUploadVar: any;

    constructor(private route: ActivatedRoute,
            private router: Router,
            private itemService: ItemService) { }

    ngOnInit(): void {
        // console.log(this.fileUploadVar.nativeElement.value);
        this.itemid = this.route.snapshot.params['id'];

        this.itemService.getItem(this.itemid).subscribe(
            (item: Item) => {
                this.itemLabel = item.Name + ' - ' + item.VendorSKU;
            },
            (error: any) => {
                this.errorMessage = <any>error;
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                this.router.navigate(['/item']);
            }
        );

        this.subscription = this.itemService.getItemImages(this.itemid).subscribe(
            (itemimages: ItemImage[]) => {
                this.itemImages = itemimages;
                this.refreshDataSource(this.itemImages);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    refreshDataSource(itemImages: ItemImage[]) {
        this.dataSource = new MatTableDataSource<ItemImage>(itemImages);
        this.dataSource.sort = this.sort;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    fileChangeEvent(fileInput: any) {
        // Clear Uploaded Files result message
        this.filesToUpload = <Array<File>>fileInput.target.files;
        for (let i = 0; i < this.filesToUpload.length; i++) {
            this.selectedFileNames.push(this.filesToUpload[i].name);
        }
        // this.filesToUpload.push(fileInput.target.files[0]);
        // this.selectedFileNames.push(fileInput.target.files[0].name);
    }

    cancelUpload() {
        this.filesToUpload = [];
        this.selectedFileNames = [];
        // this.fileUploadVar.nativeElement.value = '';
    }

    upload() {
        if (this.filesToUpload.length === 0) {
            //alert('Please select at least 1 files to upload!');
            this.itemService.sendNotification({ type: 'error', title: 'Invalid Upload', content: 'Please select at least 1 files to upload!' });
        } else if (this.filesToUpload.length > 3) {
            //alert('Please select a maximum of 3 files to upload!');
            this.itemService.sendNotification({ type: 'error', title: 'Invalid Upload', content: 'Please select at least 1 files to upload!' });
        } else {
            if (this.validateImageFileOnly(this.selectedFileNames)) {
                this.uploadFiles();
            }
        }
    }

    validateImageFileOnly(filesSelected: string[]) {
        for (let i = 0; i < filesSelected.length; i++) {
            if (filesSelected[i].slice(-3).toUpperCase() !== 'JPG' && filesSelected[i].slice(-3).toUpperCase() !== 'PNG') {
                //alert('Please selecte JPG or PNG files only!');
                this.itemService.sendNotification({ type: 'error', title: 'Invalid File', content: 'File must be JPG or PNG' });
                return false;
            } else {
                return true;
            }
        }
    }

    uploadFiles() {
        if (this.filesToUpload.length > 0) {
            this.pendingUpload = true;
            this.isLoadingData = true;
            const formData: FormData = new FormData();
            for (let i = 0; i < this.filesToUpload.length; i++) {
                var reader = new FileReader();
                formData.append('uploadedFiles', this.filesToUpload[i], this.filesToUpload[i].name);
            }
            this.itemService.uploadImage(this.itemid, formData)
                .subscribe (
                    (data: ItemImage) => {
                        this.pendingUpload = false;
                        //this.errorMessage = '';
                        this.itemImages.push(data[0]);
                        this.refreshDataSource(this.itemImages);
                    },
                    err => {
                        this.pendingUpload = false;
                        //this.errorMessage = err;
                        this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                        this.isLoadingData = false;
                        this.filesToUpload = [];
                        this.selectedFileNames = [];
                    },
                    () => {
                        this.pendingUpload = false;
                        this.isLoadingData = false;
                        this.filesToUpload = [];
                        this.selectedFileNames = [];
                    }
                );
        }
    }

    moveDownPosition(image: ItemImage) {
        this.move(this.itemImages, image, 1);
        this.itemImages.forEach((value, index) => value.Position = index + 1);
        this.refreshDataSource(this.itemImages);
    }

    moveUpPosition(image: ItemImage) {
        this.move(this.itemImages, image, -1);
        this.itemImages.forEach((value, index) => value.Position = index + 1);
        this.refreshDataSource(this.itemImages);
    }

    move(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a,b)=>a-b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    isBaseImageClick(image: ItemImage) {
        this.itemImages.forEach((value, index) => value.IsBaseImage = false);
        image.IsBaseImage = true;
        this.refreshDataSource(this.itemImages);
    }

    isSmallImageClick(image: ItemImage) {
        this.itemImages.forEach((value, index) => value.IsSmallImage = false);
        image.IsSmallImage = true;
        this.refreshDataSource(this.itemImages);
    }

    isThumbnailClick(image: ItemImage) {
        this.itemImages.forEach((value, index) => value.IsThumbnail = false);
        image.IsThumbnail = true;
        this.refreshDataSource(this.itemImages);
    }

    isRotatorImageClick(image: ItemImage) {
        this.itemImages.forEach((value, index) => value.IsRotatorImage = false);
        image.IsRotatorImage = true;
        this.refreshDataSource(this.itemImages);
    }

    saveItemImage(): void {        
        if(this.itemImages && this.itemImages.length > 0) {
            this.pendingSave = true;
            this.itemService.editItemImage(this.itemImages).subscribe(
                (itemimages: ItemImage[]) => {                    
                    this.pendingSave = false;
                    this.onSaveComplete(`Saved`);
                    this.itemImages = itemimages;
                    this.refreshDataSource(this.itemImages);
                },
                (error: any) => {
                    this.pendingSave = false;
                    this.errorMessage = <any>error;
                }
            );
        }
        else {
            this.router.navigate(['/item']);
        }
    }

    onSaveComplete(message?: string): void {
        // Navigate back to the item list
        const newImagePath = this.itemImages.find(img => img.IsThumbnail && !img.Exclude && !img.Remove);        
        this.itemService.getItem(this.itemid).subscribe(
            (item: Item) => {                
                const _item = item;
                _item.ImagePath = newImagePath ? newImagePath.Raw : null;
                this.itemService.replaceItem(this.itemid, _item);
            },
            (error: any) => {
                // this.errorMessage = <any>error
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: '' });
            }
        );

        this.itemService.sendNotification({ type: 'success', title: 'Successfully Updated', content: message });
        //this.router.navigate(['/item']);
        // alert(message);
    }
}
