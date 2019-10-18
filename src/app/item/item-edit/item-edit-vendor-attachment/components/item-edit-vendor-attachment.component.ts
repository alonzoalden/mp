import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Item, ItemAttachment } from '../../../../shared/class/item';
import { ItemService } from '../../../item.service';
import { VendorAttachmentList } from '../../../../shared/class/vendor-attachment';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'o-item-edit-vendor-attachment',
    templateUrl: './item-edit-vendor-attachment.component.html'
})

export class ItemEditVendorAttachmentComponent implements OnInit, OnChanges {
    @Input() errorMessage: string;
    @Input() isVendorAttachmentsListLoading: boolean;
    @Input() item: Item;
    @Input() itemAttachmentsMatTable: MatTableDataSource<ItemAttachment>;
    @Input() vendorAttachmentsList: VendorAttachmentList[];
    @Output() getVendorAttachmentList = new EventEmitter<void>();
    @Output() getAttachment = new EventEmitter<ItemAttachment>();
    fileURL = environment.fileURL;
    displayedColumns = ['Add', 'Down', 'Position', 'Up', 'View', 'AttachmentID', 'Title', 'FileName', 'Remove'];
    pendingAdd: boolean;
    currentIndex: number;
    formDirty = false;
    canAdd = false;

    constructor(private itemService: ItemService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.item && changes.item.currentValue) {
            if (changes.item.currentValue.ItemAttachments.length === 0 || this.item.ItemAttachments[this.item.ItemAttachments.length - 1].VendorAttachmentID) {
                this.addPendingLine();
            }
        }
        if (changes.vendorAttachmentsList && changes.vendorAttachmentsList.firstChange) {
            this.getVendorAttachmentList.emit();
        }
    }

    ngOnInit(): void {
        this.currentIndex = this.item.ItemAttachments.length - 1;
    }

    addPendingLine() {
        const _temp = new ItemAttachment(0, null, null, null, null, this.item.ItemID, this.item.ItemAttachments.length + 1, null, null, true);
        this.item.ItemAttachments.push(_temp);
    }

    removePendingLine() {
        const foundIndex = this.item.ItemAttachments.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.item.ItemAttachments.splice(foundIndex, 1);
        }
    }

    refreshDataSource(itemAttachments: ItemAttachment[]) {
        this.itemAttachmentsMatTable = new MatTableDataSource<ItemAttachment>(itemAttachments);
    }

    onAddItemAttachment(itemAttachment: ItemAttachment) {
        if (this.isRequirementValid(itemAttachment)) {
            if (!this.existAttachment(itemAttachment.VendorAttachmentID, true)) {
                this.pendingAdd = true;
                this.getAttachment.emit(itemAttachment);
                this.addPendingLine();
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

    isRequirementValid(itemAttachment: ItemAttachment): boolean {
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
        const indexes = [index, newIndex].sort((a, b) => a - b); // Sort the indixes
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
            this.currentIndex = this.item.ItemAttachments.length - 1;
        }
    }
    clearFields(itemAttachment: ItemAttachment) {
        itemAttachment.VendorAttachmentID = null;
        this.formDirty = false;
    }
}

