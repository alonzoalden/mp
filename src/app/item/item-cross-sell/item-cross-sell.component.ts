import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

//import { ItemCrossSell, ItemCrossSellInsert } from '../../shared/class/item-cross-sell';
import { Item, ItemList, ItemCrossSell, ItemCrossSellInsert } from '../../shared/class/item';
import { ItemService } from '../item.service';

@Component({
    selector: 'o-item-cross-sell',
    templateUrl: './item-cross-sell.component.html',
    styleUrls: ['./item-cross-sell.component.css']
})

export class ItemCrossSellComponent implements OnInit, OnDestroy  {
    subscription: Subscription;
    subscriptionList: Subscription;
    itemCrossSell: ItemCrossSellInsert;

    itemlist: ItemList[];
    itemCrossSells: ItemCrossSell[];
    errorMessage: string;
    itemid: number;
    itemLabel: string;

    pendingAdd: boolean;
    pendingSave: boolean;

    displayedColumns = ['Position', 'Down', 'Up', 'ItemName', 'SKU', 'TPIN', 'Remove'];
    dataSource: any = null;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private itemService: ItemService) { }

    ngOnInit(): void {
        this.itemid = this.route.snapshot.params['id'];

        this.itemCrossSell = new ItemCrossSellInsert(this.itemid, null, null, null, null, null, null, null);

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

        this.subscription = this.itemService.getItemCrossSells(this.itemid).subscribe(
            (itemCrossSells: ItemCrossSell[]) => {
                this.itemCrossSells = itemCrossSells;
                this.refreshDataSource(this.itemCrossSells);
            },
            (error: any) => this.errorMessage = <any>error
        );

        this.subscriptionList = this.itemService.getItemList().subscribe(
            (itemlist: ItemList[]) => {
                this.itemlist = itemlist;
                this.refreshDataSource(this.itemCrossSells);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    refreshDataSource(itemCrossSells: ItemCrossSell[]) {
        this.dataSource = new MatTableDataSource<ItemCrossSell>(itemCrossSells);
        this.dataSource.sort = this.sort;

        if(this.itemlist && this.itemlist.length > 0 && this.itemCrossSells)
        {
            this.itemlist = this.itemlist.filter(
                (itemlist: ItemList) => !this.itemCrossSells.find(
                    x => x.CrossSellItemID === itemlist.ItemID
                )
            );
        }
    }

    onAddCrossSell() {
        if (this.isRequirementValid()) {           
            this.pendingAdd = true;
            this.itemCrossSell.Position = this.itemCrossSells.length + 1;

            this.itemService.addItemCrossSell(this.itemCrossSell).subscribe(
                (itemCrossSell: ItemCrossSell) => {
                    this.pendingAdd = false;
                    this.itemCrossSells.push(itemCrossSell);

                    const foundIndex = this.itemlist.findIndex(i => i.ItemID === this.itemCrossSell.CrossSellItemID);
                    if (foundIndex > -1) {
                        this.itemlist.splice(foundIndex, 1);
                    }

                    this.refreshDataSource(this.itemCrossSells);
                    this.itemCrossSell = new ItemCrossSellInsert(this.itemid, null, null, null, null, null, null, null);
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
        if (this.itemCrossSell
            && this.itemCrossSell.CrossSellItemID) {
            return true;
        } 
        else {
            return false;
        }
    }

    moveDownPosition(itemCrossSell: ItemCrossSell) {
        this.move(this.itemCrossSells, itemCrossSell, 1);
        this.itemCrossSells.forEach((value, index) => {
            value.Position = index + 1;
            this.saveAttachment(value);
        });
        this.refreshDataSource(this.itemCrossSells);
    }

    moveUpPosition(itemCrossSell: ItemCrossSell) {
        this.move(this.itemCrossSells, itemCrossSell, -1);
        this.itemCrossSells.forEach((value, index) => {
            value.Position = index + 1;
            this.saveAttachment(value);
        });
        this.refreshDataSource(this.itemCrossSells);
    }

    move(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a,b)=>a-b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    saveAttachment(itemCrossSell: ItemCrossSell) {
        this.itemService.editItemCrossSell(itemCrossSell).subscribe(
            (data: ItemCrossSell) => {
                //this.onSaveComplete(`${itemAttachment.Title} was updated`);
            },
            (error: any) => {
                this.errorMessage = <any>error;
                this.itemService.sendNotification({ type: 'error', title: 'Errored', content: error.Message });
            }
        );
    }
    onSaveComplete(message?: string): void {
        this.itemService.sendNotification({ type: 'success', title: 'Successfully Updated', content: message });
        //this.router.navigate(['/item']);
    }

    onRemove(itemCrossSell: ItemCrossSell) {
        const confirmation = confirm(`Remove ${itemCrossSell.CrossSellItemName}?`);
        if (confirmation) {
            this.itemService.deleteItemCrossSell(itemCrossSell.ItemCrossSellID).subscribe(
                () => {                
                    const itemlist = new ItemList(itemCrossSell.CrossSellItemID, itemCrossSell.CrossSellItemVendorSKU + ' - ' + itemCrossSell.CrossSellItemName + ' - ' + itemCrossSell.CrossSellTPIN, 0, null, null, null, null);
                    this.itemlist.push(itemlist);
                    
                    const foundIndex = this.itemCrossSells.findIndex(i => i.ItemCrossSellID === itemCrossSell.ItemCrossSellID);
                    if (foundIndex > -1) {
                        this.itemCrossSells.splice(foundIndex, 1);
                    }

                    this.onDeleteComplete(`${itemCrossSell.CrossSellItemName} was deleted`);
                },
                (error: any) => {
                    // this.errorMessage = <any>error
                    this.refreshDataSource(this.itemCrossSells);
                    this.errorMessage = <any>error;
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    window.location.reload();
                }
            );
        }
    }

    onDeleteComplete(message?: string): void {
        this.refreshDataSource(this.itemCrossSells);
        this.itemService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: message });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscriptionList.unsubscribe();
    }
}
