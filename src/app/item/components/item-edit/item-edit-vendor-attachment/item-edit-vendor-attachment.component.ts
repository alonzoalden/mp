import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { Item, ItemList, ItemAttachment } from '../../../../shared/class/item';
import { ItemService } from '../../../item.service';
import { VendorAttachmentList, VendorAttachment } from '../../../../shared/class/vendor-attachment';

import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'o-item-edit-vendor-attachment',
    templateUrl: './item-edit-vendor-attachment.component.html'
})

export class ItemEditVendorAttachmentComponent implements OnInit {
    errorMessage: string;
    item: Item;
    itemid: number;
    private fileURL = environment.fileURL;

    vendorattachmentlist: VendorAttachmentList[];    
    displayedColumns = ['Add', 'Down', 'Position', 'Up', 'View', 'AttachmentID', 'Title', 'FileName', 'Remove'];
    dataSource: any = null;
    pendingAdd: boolean;
    currentIndex: number;

    formDirty = false;
    canAdd = false;

    @ViewChild('selectionCategoriesRef', { static: false }) selectionCategoriesRef: ElementRef;

    constructor(private route: ActivatedRoute,
        private itemService: ItemService) { }

    ngOnInit(): void {
        this.itemid = this.route.parent.snapshot.params['id'];
        this.itemService.getCurrentItemEdit(this.itemid).subscribe(
            (item: Item) => {
                this.itemService.currentItemEdit = item;
                this.item = this.itemService.currentItemEdit;
                this.initialize();
            },
            (error: any) => this.errorMessage = <any>error
        );

        this.itemService.getAttachmentList().subscribe(
            (vendorattachmentlist: VendorAttachmentList[]) => {
                this.vendorattachmentlist = vendorattachmentlist;
                this.refreshDataSource(this.item.ItemAttachments);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    initialize() {
        if (this.itemService.currentItemEdit.ItemAttachments === null) {
            this.itemService.getItemAttachments(this.itemid).subscribe(
                (itemAttachments: ItemAttachment[]) => {
                    this.item.ItemAttachments = itemAttachments;                    
                    this.addPendingLine();      
                    this.currentIndex = this.item.ItemAttachments.length - 1;   
                    this.refreshDataSource(this.item.ItemAttachments);
                },
                (error: any) => this.errorMessage = <any>error
            );
        } else {
            this.removePendingLine();
            this.addPendingLine();        
            this.currentIndex = this.item.ItemAttachments.length - 1;       
            this.refreshDataSource(this.item.ItemAttachments);
        }
    }

    addPendingLine() {
        const _temp = new ItemAttachment(0, null, null, null, null, this.itemid, this.item.ItemAttachments.length + 1, null, null, true);
        this.item.ItemAttachments.push(_temp);   
    }

    removePendingLine() {
        const foundIndex = this.item.ItemAttachments.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.item.ItemAttachments.splice(foundIndex, 1);
        }
    }

    refreshDataSource(itemAttachments: ItemAttachment[]) { 
        this.dataSource = new MatTableDataSource<ItemAttachment>(itemAttachments);
    }

    onAddItemAttachment(itemAttachment: ItemAttachment) {
        if (this.isRequirementValid(itemAttachment)) { 
            if(!this.existAttachment(itemAttachment.VendorAttachmentID, true)) {        
                this.pendingAdd = true;

                this.itemService.getAttachment(itemAttachment.VendorAttachmentID).subscribe(
                    (attachment: VendorAttachment) => {
                        itemAttachment.Title = attachment.Title;
                        if(attachment.UploadedFile) {
                            itemAttachment.FileName = attachment.UploadedFile.substring(5);
                        }
                        itemAttachment.UploadedFile = attachment.UploadedFile;
                        itemAttachment.pendingAdd = false; 
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                        this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    }
                );

                this.addPendingLine(); 
                this.refreshDataSource(this.item.ItemAttachments);
            }
            else {
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Attachment already exists" });
            }   
        }
        else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Please select an attachment" });
        }
    }

    onEditItemAttachment(index: number) {
        if(this.pendingAdd) {
            this.currentIndex = this.item.ItemAttachments.length - 1;
            this.pendingAdd = false;
        }
        else {
            this.currentIndex = index;
        }
    }

    isRequirementValid(itemAttachment: ItemAttachment): boolean {
        if (itemAttachment
            && itemAttachment.VendorAttachmentID) {
            return true;
        } 
        else {
            return false;
        }
    }

    existAttachment(vendorAttachmentID: number, isNew: boolean = false){
        var counter: number = 0;
        this.item.ItemAttachments.forEach((value, index) => {
                if(value.VendorAttachmentID === vendorAttachmentID) {
                    if(isNew || index != this.item.ItemRelatedProducts.length - 1) {
                        counter += 1; 
                    }
                }
            }
        );
        if(counter > 1) { return true; }
        else { return false; }
    }

    moveDownPosition(itemAttachment: ItemAttachment) {
        this.positionMove(this.item.ItemAttachments, itemAttachment, 1);
        this.item.ItemAttachments.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.refreshDataSource(this.item.ItemAttachments);
    }
    moveUpPosition(itemAttachment: ItemAttachment) {
        this.positionMove(this.item.ItemAttachments, itemAttachment, -1);
        this.item.ItemAttachments.forEach((value, index) => {
            value.Position = index + 1;                        
        });

        this.refreshDataSource(this.item.ItemAttachments);
    }
    positionMove(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a,b)=>a-b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }
    onRemoveAttachment(itemAttachment: ItemAttachment) {
        const confirmation = confirm(`Remove Position ${itemAttachment.Position}?`);
        if (confirmation) {
            const foundIndex = this.item.ItemAttachments.findIndex(i => i.Position === itemAttachment.Position);
            if (foundIndex > -1) {
                this.item.ItemAttachments.splice(foundIndex, 1);
            }            
            this.refreshDataSource(this.item.ItemAttachments);
        }
    }
    clearFields(itemAttachment: ItemAttachment) {
        itemAttachment.VendorAttachmentID = null;
        this.formDirty = false;
        //this.selectionCategoriesRef.nativeElement.value = "0: null";
    }
}
  