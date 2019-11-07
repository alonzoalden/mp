import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ItemInsert, ItemTierPriceInsert } from '../../../../shared/class/item';
import { ItemService } from '../../../item.service';
import { AppService } from '../../../../app.service';
import { Member } from 'app/shared/class/member';

@Component({
    selector: 'o-item-edit-refurbish',
    templateUrl: './item-add-price.component.html'
})

export class ItemEditRefurbishComponent implements OnInit, OnChanges {
    @Input() userInfo: Member;
    @Input() errorMessage: string;
    @Input() item: ItemInsert;
    @Input() itemTierPricesMatTable: MatTableDataSource<ItemTierPriceInsert>;
    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2040, 0, 1);
    pendingAdd: boolean;
    currentItemTierPriceIndex: number;
    displayedColumns = ['Add', 'Quantity', 'Price',  'Remove'];
    dataSource: any = null;
    formDirty = false;
    canAdd = false;
    constructor(private itemService: ItemService, private appService: AppService) { }

    @ViewChild(MatSort, { static: false }) sort: MatSort;

    ngOnChanges(changes: SimpleChanges) {
        if (changes.item && changes.item.currentValue && changes.item.currentValue.ItemTierPrices.length === 0) {
            if (changes.item.currentValue.ItemTierPrices.length === 0) {
                this.pendingAdd = true;
                const _temp = new ItemTierPriceInsert(0, 0, 0);
                this.item.ItemTierPrices.push(_temp);
            }
        }
    }

    ngOnInit(): void {
        this.currentItemTierPriceIndex = this.item.ItemTierPrices.length - 1;
    }

    refreshItemTierPriceDataSource(itemTierPrices: ItemTierPriceInsert[]) {
        this.itemTierPricesMatTable = new MatTableDataSource<ItemTierPriceInsert>(itemTierPrices);
        this.itemTierPricesMatTable.sort = this.sort;
    }

    onAddItemTierPrice(itemtierpriceinsert: ItemTierPriceInsert): void {
        const existingTierPrices = this.item.ItemTierPrices.filter(itemtierprice => itemtierprice.Quantity === itemtierpriceinsert.Quantity);
        if (existingTierPrices.length > 1) {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Tier Pricing already exists for this Quantity' });
        } else {
            this.pendingAdd = true;
            const temp = new ItemTierPriceInsert(null, null, null);
            this.item.ItemTierPrices.push(temp);
            this.refreshItemTierPriceDataSource(this.item.ItemTierPrices);
        }
    }

    onEditItemTierPrice(index: number) {
        if (this.pendingAdd) {
            this.currentItemTierPriceIndex = this.item.ItemTierPrices.length - 1;
            this.pendingAdd = false;
        } else {
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
