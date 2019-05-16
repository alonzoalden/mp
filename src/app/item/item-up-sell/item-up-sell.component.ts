import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

//import { ItemUpSell, ItemUpSellInsert } from '../../shared/class/item-up-sell';
import { Item, ItemList, ItemUpSell, ItemUpSellInsert } from '../../shared/class/item';
import { ItemService } from '../item.service';

@Component({
    selector: 'o-item-up-sell',
    templateUrl: './item-up-sell.component.html',
    styleUrls: ['./item-up-sell.component.css']
})

export class ItemUpSellComponent implements OnInit, OnDestroy  {
    subscription: Subscription;
    subscriptionList: Subscription;
    itemUpSell: ItemUpSellInsert;

    itemlist: ItemList[];
    itemUpSells: ItemUpSell[];
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

        this.itemUpSell = new ItemUpSellInsert(this.itemid, null, null, null, null, null, null);

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

        this.subscription = this.itemService.getItemUpSells(this.itemid).subscribe(
            (itemUpSells: ItemUpSell[]) => {
                this.itemUpSells = itemUpSells;
                this.refreshDataSource(this.itemUpSells);
            },
            (error: any) => this.errorMessage = <any>error
        );

        this.subscriptionList = this.itemService.getItemList().subscribe(
            (itemlist: ItemList[]) => {
                this.itemlist = itemlist;
                this.refreshDataSource(this.itemUpSells);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    refreshDataSource(itemUpSells: ItemUpSell[]) {
        this.dataSource = new MatTableDataSource<ItemUpSell>(itemUpSells);
        this.dataSource.sort = this.sort;

        if(this.itemlist && this.itemlist.length > 0 && this.itemUpSells)
        {
            this.itemlist = this.itemlist.filter(
                (itemlist: ItemList) => !this.itemUpSells.find(
                    x => x.UpSellItemID === itemlist.ItemID
                )
            );
        }
    }

    onAddUpSell() {
        if (this.isRequirementValid()) {           
            this.pendingAdd = true;
            this.itemUpSell.Position = this.itemUpSells.length + 1;

            this.itemService.addItemUpSell(this.itemUpSell).subscribe(
                (itemUpSell: ItemUpSell) => {
                    this.pendingAdd = false;
                    this.itemUpSells.push(itemUpSell);

                    const foundIndex = this.itemlist.findIndex(i => i.ItemID === this.itemUpSell.UpSellItemID);
                    if (foundIndex > -1) {
                        this.itemlist.splice(foundIndex, 1);
                    }

                    this.refreshDataSource(this.itemUpSells);
                    this.itemUpSell = new ItemUpSellInsert(this.itemid, null, null, null, null, null, null);
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
        if (this.itemUpSell
            && this.itemUpSell.UpSellItemID) {
            return true;
        } 
        else {
            return false;
        }
    }

    moveDownPosition(itemUpSell: ItemUpSell) {
        this.move(this.itemUpSells, itemUpSell, 1);
        this.itemUpSells.forEach((value, index) => {
            value.Position = index + 1;
            this.saveAttachment(value);
        });
        this.refreshDataSource(this.itemUpSells);
    }

    moveUpPosition(itemUpSell: ItemUpSell) {
        this.move(this.itemUpSells, itemUpSell, -1);
        this.itemUpSells.forEach((value, index) => {
            value.Position = index + 1;
            this.saveAttachment(value);
        });
        this.refreshDataSource(this.itemUpSells);
    }

    move(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a,b)=>a-b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    saveAttachment(itemUpSell: ItemUpSell) {
        this.itemService.editItemUpSell(itemUpSell).subscribe(
            (data: ItemUpSell) => {
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

    onRemove(itemUpSell: ItemUpSell) {
        const confirmation = confirm(`Remove ${itemUpSell.UpSellItemName}?`);
        if (confirmation) {
            this.itemService.deleteItemUpSell(itemUpSell.ItemUpSellID).subscribe(
                () => {                
                    const itemlist = new ItemList(itemUpSell.UpSellItemID, itemUpSell.UpSellItemVendorSKU + ' - ' + itemUpSell.UpSellItemName + ' - ' + itemUpSell.UpSellTPIN, 0, null, null, null);
                    this.itemlist.push(itemlist);
                    
                    const foundIndex = this.itemUpSells.findIndex(i => i.ItemUpSellID === itemUpSell.ItemUpSellID);
                    if (foundIndex > -1) {
                        this.itemUpSells.splice(foundIndex, 1);
                    }

                    this.onDeleteComplete(`${itemUpSell.UpSellItemName} was deleted`);
                },
                (error: any) => {
                    // this.errorMessage = <any>error
                    this.refreshDataSource(this.itemUpSells);
                    this.errorMessage = <any>error;
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    window.location.reload();
                }
            );
        }
    }

    onDeleteComplete(message?: string): void {
        this.refreshDataSource(this.itemUpSells);
        this.itemService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: message });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscriptionList.unsubscribe();
    }
}
