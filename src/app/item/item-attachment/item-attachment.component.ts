import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

//import { ItemAttachment, ItemAttachmentInsert } from '../../shared/class/item-attachment';
import { Item, ItemAttachment, ItemAttachmentInsert } from '../../shared/class/item';
import { ItemService } from '../item.service';
import { VendorAttachmentList } from '../../shared/class/vendor-attachment';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'o-item-attachment',
    templateUrl: './item-attachment.component.html',
    styleUrls: ['./item-attachment.component.css']
})

export class ItemAttachmentComponent implements OnInit, OnDestroy  {
    subscription: Subscription;
    subscriptionAttachmentList: Subscription;
    itemAttachment: ItemAttachmentInsert;

    private fileURL = environment.fileURL;
    
    vendorattachmentlist: VendorAttachmentList[];
    itemAttachments: ItemAttachment[];
    errorMessage: string;
    itemid: number;
    itemLabel: string;

    pendingAdd: boolean;
    pendingSave: boolean;

    displayedColumns = ['View', 'Position', 'Down', 'Up', 'ID', 'Title', 'FileName', 'Remove'];
    dataSource: any = null;

    @ViewChild(MatSort, { static: false }) sort: MatSort;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private itemService: ItemService) { }

    ngOnInit(): void {
        this.itemid = this.route.snapshot.params['id'];

        this.itemAttachment = new ItemAttachmentInsert(null, null, null, null, this.itemid, null);

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

        this.subscription = this.itemService.getItemAttachments(this.itemid).subscribe(
            (itemAttachments: ItemAttachment[]) => {
                this.itemAttachments = itemAttachments;
                this.refreshDataSource(this.itemAttachments);
            },
            (error: any) => this.errorMessage = <any>error
        );

        this.subscriptionAttachmentList = this.itemService.getAttachmentList().subscribe(
            (vendorattachmentlist: VendorAttachmentList[]) => {
                this.vendorattachmentlist = vendorattachmentlist;
                this.refreshDataSource(this.itemAttachments);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    refreshDataSource(itemAttachments: ItemAttachment[]) {
        this.dataSource = new MatTableDataSource<ItemAttachment>(itemAttachments);
        this.dataSource.sort = this.sort;

        if(this.vendorattachmentlist && this.vendorattachmentlist.length > 0 && this.itemAttachments)
        {
            this.vendorattachmentlist = this.vendorattachmentlist.filter(
                (vendorattachmentlist: VendorAttachmentList) => !this.itemAttachments.find(
                    x => x.VendorAttachmentID === vendorattachmentlist.Value
                )
            );
        }
    }

    onAddAttachment() {
        if (this.isRequirementValid()) {           
            this.pendingAdd = true;
            this.itemAttachment.Position = this.itemAttachments.length + 1;

            this.itemService.addItemAttachment(this.itemAttachment).subscribe(
                (itemAttachment: ItemAttachment) => {
                    this.pendingAdd = false;
                    this.itemAttachments.push(itemAttachment);

                    const foundIndex = this.vendorattachmentlist.findIndex(i => i.Value === this.itemAttachment.VendorAttachmentID);
                    if (foundIndex > -1) {
                        this.vendorattachmentlist.splice(foundIndex, 1);
                    }

                    this.refreshDataSource(this.itemAttachments);
                    this.itemAttachment = new ItemAttachmentInsert(null, null, null, null, this.itemid, null);
                },
                (error: any) => {
                    this.pendingAdd = false;
                    this.errorMessage = <any>error;
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                }
            );            
        }
        else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Please enter all required fields" });
        }
    }

    isRequirementValid(): boolean {
        if (this.itemAttachment
            && this.itemAttachment.VendorAttachmentID) {
            return true;
        } 
        else {
            return false;
        }
    }

    moveDownPosition(itemAttachment: ItemAttachment) {
        this.move(this.itemAttachments, itemAttachment, 1);
        this.itemAttachments.forEach((value, index) => {
            value.Position = index + 1;
            this.saveAttachment(value);
        });
        this.refreshDataSource(this.itemAttachments);
    }

    moveUpPosition(itemAttachment: ItemAttachment) {
        this.move(this.itemAttachments, itemAttachment, -1);
        this.itemAttachments.forEach((value, index) => {
            value.Position = index + 1;
            this.saveAttachment(value);
        });
        this.refreshDataSource(this.itemAttachments);
    }

    move(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a,b)=>a-b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    saveAttachment(itemAttachment: ItemAttachment) {
        this.itemService.editItemAttachment(itemAttachment).subscribe(
            (data: ItemAttachment) => {
                //this.onSaveComplete(`${itemAttachment.Title} was updated`);
            },
            (error: any) => {
                this.errorMessage = <any>error;
                this.itemService.sendNotification({ type: 'error', title: 'Errored', content: error.Message });
            }
        );
    }

    saveItemAttachments(): void {        
        if(this.itemAttachments && this.itemAttachments.length > 0) {
            this.pendingSave = true;
            this.itemService.editItemAttachments(this.itemAttachments).subscribe(
                () => {
                    this.pendingSave = false;
                    this.onSaveComplete(`Saved`);
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
        this.itemService.sendNotification({ type: 'success', title: 'Successfully Updated', content: message });
        //this.router.navigate(['/item']);
    }

    onRemove(itemAttachment: ItemAttachment) {
        const confirmation = confirm(`Remove ${itemAttachment.VendorAttachmentID}?`);
        if (confirmation) {
            this.itemService.deleteVendorAttachmentItem(itemAttachment.VendorAttachmentItemID).subscribe(
                () => {                
                    const vendorattachmentlist = new VendorAttachmentList(itemAttachment.VendorAttachmentID, itemAttachment.VendorAttachmentID + ' - ' + itemAttachment.Title );
                    this.vendorattachmentlist.push(vendorattachmentlist);
                    
                    const foundIndex = this.itemAttachments.findIndex(i => i.VendorAttachmentItemID === itemAttachment.VendorAttachmentItemID);
                    if (foundIndex > -1) {
                        this.itemAttachments.splice(foundIndex, 1);
                    }

                    this.onDeleteComplete(`${itemAttachment.Title} was deleted`);
                },
                (error: any) => {
                    // this.errorMessage = <any>error
                    this.refreshDataSource(this.itemAttachments);
                    this.errorMessage = <any>error;
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    window.location.reload();
                }
            );
        }
    }

    onDeleteComplete(message?: string): void {
        this.refreshDataSource(this.itemAttachments);
        this.itemService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: message });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscriptionAttachmentList.unsubscribe();
    }
}
