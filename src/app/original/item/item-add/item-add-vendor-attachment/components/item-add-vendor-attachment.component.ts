import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ItemInsert, ItemAttachmentInsert } from '../../../../../shared/class/item';
import { ItemService } from '../../../item.service';
import { VendorAttachmentList } from '../../../../../shared/class/vendor-attachment';
import { environment } from '../../../../../../environments/environment';

@Component({
    selector: 'o-item-add-vendor-attachment',
    templateUrl: './item-add-vendor-attachment.component.html'
  })

export class ItemAddVendorAttachmentComponent implements OnInit, OnChanges {
    fileURL = environment.fileURL;
    @Input() errorMessage: string;
    @Input() isVendorAttachmentsListLoading: boolean;
    @Input() item: ItemInsert;
    @Input() itemAttachmentsMatTable: MatTableDataSource<ItemAttachmentInsert>;
    @Input() vendorAttachmentsList: VendorAttachmentList[];
    @Output() getVendorAttachmentList = new EventEmitter<void>();
    @Output() getAttachment = new EventEmitter<ItemAttachmentInsert>();

    displayedColumns = ['Add', 'Down', 'Position', 'Up', 'View', 'AttachmentID', 'Title', 'FileName', 'Remove'];
    pendingAdd: boolean;
    currentIndex: number;
    formDirty = false;
    canAdd = false;

    constructor(private itemService: ItemService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.item && changes.item.currentValue && changes.item.currentValue.ItemAttachments.length === 0) {
            const _temp = new ItemAttachmentInsert(null, null, null, null, null, null);
            this.item.ItemAttachments.push(_temp);
        }
        if (changes.vendorAttachmentsList && changes.vendorAttachmentsList.firstChange) {
            this.getVendorAttachmentList.emit();
        }
    }
    ngOnInit(): void {
        this.currentIndex = this.item.ItemAttachments.length - 1;
    }

    refreshDataSource(itemAttachments: ItemAttachmentInsert[]) {
        this.itemAttachmentsMatTable = new MatTableDataSource<ItemAttachmentInsert>(itemAttachments);
    }

    onAddItemAttachment(itemAttachment: ItemAttachmentInsert) {
        if (this.isRequirementValid(itemAttachment)) {
            if (!this.existAttachment(itemAttachment.VendorAttachmentID, true)) {
                this.pendingAdd = true;

                this.getAttachment.emit(itemAttachment);

                const _temp = new ItemAttachmentInsert(null, null, null, null, null, null);
                this.item.ItemAttachments.push(_temp);
                this.refreshDataSource(this.item.ItemAttachments);
            } else {
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Attachment already exists' });
            }
        } else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Please select an attachment' });
        }
    }

    onEditItemAttachment(index: number) {
        if (this.pendingAdd) {
            this.currentIndex = this.item.ItemAttachments.length - 1;
            this.pendingAdd = false;
        } else {
            this.currentIndex = index;
        }
    }

    isRequirementValid(itemAttachment: ItemAttachmentInsert): boolean {
        if (itemAttachment
            && itemAttachment.VendorAttachmentID) {
            return true;
        } else {
            return false;
        }
    }

    existAttachment(vendorAttachmentID: number, isNew: boolean = false) {
        let counter: number = 0;
        this.item.ItemAttachments.forEach((value, index) => {
                if (value.VendorAttachmentID === vendorAttachmentID) {
                    if (isNew || index !== this.item.ItemRelatedProducts.length - 1) {
                        counter += 1;
                    }
                }
            }
        );
        if (counter > 1) { return true; } else { return false; }
    }

    moveDownPosition(itemAttachment: ItemAttachmentInsert) {
        this.positionMove(this.item.ItemAttachments, itemAttachment, 1);
        this.item.ItemAttachments.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.refreshDataSource(this.item.ItemAttachments);
    }
    moveUpPosition(itemAttachment: ItemAttachmentInsert) {
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
        const indexes = [index, newIndex].sort((a, b) => a - b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }
    onRemoveAttachment(itemAttachment: ItemAttachmentInsert) {
        const confirmation = confirm(`Remove Position ${itemAttachment.Position}?`);
        if (confirmation) {
            const foundIndex = this.item.ItemAttachments.findIndex(i => i.Position === itemAttachment.Position);
            if (foundIndex > -1) {
                this.item.ItemAttachments.splice(foundIndex, 1);
            }
            this.refreshDataSource(this.item.ItemAttachments);
        }
    }
    clearFields(itemAttachment: ItemAttachmentInsert) {
        itemAttachment.VendorAttachmentID = null;
        this.formDirty = false;
    }
}
