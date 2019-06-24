import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { Item, ItemTierPrice } from '../../shared/class/item';

import { ItemService } from '../item.service';
import { AppService } from '../../app.service';

@Component({
    selector: 'o-item-part-edit-price',
    templateUrl: './item-part-edit-price.component.html'
})

export class ItemPartEditPriceComponent implements OnInit {
    errorMessage: string;
    item: Item;
    itemid: number;

    isDropship: boolean;
    
    _itemTierPrices: ItemTierPrice[] = [];

    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);

    specialFrom: Date;
    specialTo: Date;

    PendingAdd: boolean;   
    currentItemTierPriceIndex: number;

    displayedColumns = ['Add', 'Quantity', 'Price', 'Remove'];
    dataSource: any = null;

    formDirty = false;
    canAdd = false;

    constructor(private route: ActivatedRoute,
                private itemService: ItemService, 
                private appService: AppService) { }
    
    ngOnInit(): void {
        this.itemid = this.route.parent.snapshot.params['id'];

        this.appService.getCurrentMember()
                .subscribe(
                    (data) => {
                        this.appService.currentMember = data;
                        this.isDropship = data.IsDropship;
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                    }
                );

        this.itemService.getCurrentItemEdit(this.itemid).subscribe(
            (item: Item) => {
                this.itemService.currentItemEdit = item;
                this.item = this.itemService.currentItemEdit;
                this.initialize();
            },
            (error: any) => this.errorMessage = <any>error
        );

    }

    initialize() {
        if (this.itemService.currentItemEdit.ItemTierPrices === null) {
            this.itemService.getItemTierPrices(this.itemid).subscribe(
                (itemTierPrice: ItemTierPrice[]) => {
                    this.item.ItemTierPrices = itemTierPrice;                    
                    this.addPendingLine();                    
                    this.currentItemTierPriceIndex = this.item.ItemTierPrices.length - 1;
                    this.refreshItemTierPriceDataSource(this.item.ItemTierPrices);
                },
                (error: any) => this.errorMessage = <any>error
            );
        } else {
            this.removePendingLine();
            this.addPendingLine();            
            this.currentItemTierPriceIndex = this.item.ItemTierPrices.length - 1;
            this.refreshItemTierPriceDataSource(this.item.ItemTierPrices);
        }
    }

    addPendingLine() {
        const _temp = new ItemTierPrice(0, this.item.ItemID, 0, 0, null, null, true);
        this.item.ItemTierPrices.push(_temp);   
    }

    removePendingLine() {
        const foundIndex = this.item.ItemTierPrices.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.item.ItemTierPrices.splice(foundIndex, 1);
        }
    }

    refreshItemTierPriceDataSource(itemTierPrices: ItemTierPrice[]) {        
        this.dataSource = new MatTableDataSource<ItemTierPrice>(itemTierPrices);
    }

    onAddItemTierPrice(itemTierPrice: ItemTierPrice) {
        const existItemTierPrice = this.item.ItemTierPrices.find(x => x.Quantity === itemTierPrice.Quantity && !x.pendingAdd);
        if (existItemTierPrice) {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Tier Pricing already exists for this Quantity" });            
        }
        else {
            this.PendingAdd = true;
            itemTierPrice.pendingAdd = false;
            this.addPendingLine();
            this.refreshItemTierPriceDataSource(this.item.ItemTierPrices);
        }
    }

    onEditItemTierPrice(index: number) {
        if(this.PendingAdd) {
            this.currentItemTierPriceIndex = this.item.ItemTierPrices.length - 1;
            this.PendingAdd = false;
        }
        else {
            this.currentItemTierPriceIndex = index;
        }    
    }

    onPriceTypeChange() {
        this.item.Price = null;
    }

    onChangeFOBPrice()
    {
        if(this.item.FOBPrice) {
            this.item.FOBPrice = Number(this.item.FOBPrice.toFixed(2));
        }

        if(this.item.Price)
        {
            if(this.item.Price <= 0) {
                this.item.Price = this.item.FOBPrice * 3;    
                this.item.Price = Number(this.item.Price.toFixed(2));                 
            }                    
        }
        else {
            this.item.Price = this.item.FOBPrice * 3;    
            this.item.Price = Number(this.item.Price.toFixed(2));        
        }          
    }
    
    onRemoveItemTierPrice(index: number) {
        this.item.ItemTierPrices.splice(index, 1);
        this.refreshItemTierPriceDataSource(this.item.ItemTierPrices);
    }
    clearFields(form) {
        this.formDirty = false;
        this.canAdd = false;
        form.Price = 0;
        form.Quantity = 0;
    }
}
