import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatSort, MatSortable } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ItemInsert, ItemTierPriceInsert } from '../../../../shared/class/item';

import { ItemService } from '../../../item.service';
import { AppService } from '../../../../app.service';
import { Member } from 'app/shared/class/member';

@Component({
    selector: 'o-item-add-price',
    templateUrl: './item-add-price.component.html'
})


export class ItemAddPriceComponent implements OnInit, OnChanges {
    @Input() userInfo: Member;
    @Input() errorMessage: string;
    @Input() item: ItemInsert;
    @Input() itemTierPricesMatTable: MatTableDataSource<ItemTierPriceInsert>;
    
    //isDropship: boolean;

    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);

    PendingAdd: boolean;   
    currentItemTierPriceIndex: number;

    displayedColumns = ['Add', 'Quantity', 'Price',  'Remove'];
    
    dataSource: any = null;
    formDirty = false;
    canAdd = false;    
    constructor(private itemService: ItemService, private appService: AppService) { }

    @ViewChild(MatSort, { static: false }) sort: MatSort;

    ngOnChanges(changes: SimpleChanges) {
        if (changes.item && changes.item.currentValue && changes.item.currentValue.ItemTierPrices.length === 0) {
            if(changes.item.currentValue.ItemTierPrices.length === 0) {
                this.PendingAdd = true;
                const _temp = new ItemTierPriceInsert(0, 0, 0);
                this.item.ItemTierPrices.push(_temp);
            }
        }

        // this.dataSource.sort = this.sort;
    }

    ngOnInit(): void {
        //this.item = this.itemService.currentItemInsert;

        // this.appService.getCurrentMember()
        //         .subscribe(
        //             (data) => {
        //                 this.appService.currentMember = data;
        //                 this.isDropship = data.IsDropship;
        //             },
        //             (error: any) => {
        //                 this.errorMessage = <any>error;
        //             }
        //         );

        //this.refreshItemTierPriceDataSource(this.item.ItemTierPrices);
        
        
        // if(this.item.ItemTierPrices.length === 0) {
        //     this.PendingAdd = true;
        //     const _temp = new ItemTierPriceInsert(0, 0, 0);
        //     this.item.ItemTierPrices.push(_temp);
        //     //this.refreshItemTierPriceDataSource(this.item.ItemTierPrices);
        // }

        this.currentItemTierPriceIndex = this.item.ItemTierPrices.length - 1;        
    }

    refreshItemTierPriceDataSource(itemTierPrices: ItemTierPriceInsert[]) {
        this.itemTierPricesMatTable = new MatTableDataSource<ItemTierPriceInsert>(itemTierPrices);
        this.itemTierPricesMatTable.sort = this.sort;
    }

    onAddItemTierPrice(itemTierPrice: ItemTierPriceInsert) {
        var counter: number = 0;
        this.item.ItemTierPrices.forEach((p) => {
            if (p.Quantity === itemTierPrice.Quantity){
                counter++;
            }
        });

        if (counter > 1) {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Tier Pricing already exists for this Quantity" });            
        }
        else {
            this.PendingAdd = true;
            const _temp = new ItemTierPriceInsert(null, null, null);
            this.item.ItemTierPrices.push(_temp);
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

    onRemoveItemTierPrice(index: number) {
        this.item.ItemTierPrices.splice(index, 1);
        this.refreshItemTierPriceDataSource(this.item.ItemTierPrices);
    }

    onPriceTypeChange() {
        this.item.Price = null;
    }

    clearFields(form) {
        this.formDirty = false;
        this.canAdd = false;
        form.Price = 0;
        form.Quantity = 0;
    }
}