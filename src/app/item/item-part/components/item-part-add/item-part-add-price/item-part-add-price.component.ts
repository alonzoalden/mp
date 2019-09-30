import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatSortable } from '@angular/material';
import { ItemInsert, ItemTierPriceInsert } from '../../../../../shared/class/item';
import { ItemService } from '../../../../item.service';
import { AppService } from '../../../../../app.service';

@Component({
    selector: 'o-item-part-add-price',
    templateUrl: './item-part-add-price.component.html'
})

export class ItemPartAddPriceComponent implements OnInit {
    errorMessage: string;
    isPM: boolean;
    item: ItemInsert;
    isDropship: boolean;
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

    ngOnInit(): void {
        this.item = this.itemService.currentItemInsert;

        this.appService.getCurrentMember()
                .subscribe(
                    (data) => {
                        this.appService.currentMember = data;
                        this.isDropship = data.IsDropship;
                        this.isPM = data.IsPM;
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                    }
                );

        this.refreshItemTierPriceDataSource(this.item.ItemTierPrices);
        if (this.item.ItemTierPrices.length === 0) {
            this.PendingAdd = true;
            const _temp = new ItemTierPriceInsert(0, 0, 0);
            this.item.ItemTierPrices.push(_temp);
            this.refreshItemTierPriceDataSource(this.item.ItemTierPrices);
        }

        this.currentItemTierPriceIndex = this.item.ItemTierPrices.length - 1;
    }

    refreshItemTierPriceDataSource(itemTierPrices: ItemTierPriceInsert[]) {
        this.dataSource = new MatTableDataSource<ItemTierPriceInsert>(itemTierPrices);
        this.dataSource.sort = this.sort;
    }

    onAddItemTierPrice(itemTierPrice: ItemTierPriceInsert) {
        let counter: number = 0;
        this.item.ItemTierPrices.forEach((p) => {
            if (p.Quantity === itemTierPrice.Quantity) {
                counter++;
            }
        });

        if (counter > 1) {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Tier Pricing already exists for this Quantity' });
        } else {
            this.PendingAdd = true;
            const _temp = new ItemTierPriceInsert(0, 0, 0);
            this.item.ItemTierPrices.push(_temp);
            this.refreshItemTierPriceDataSource(this.item.ItemTierPrices);
        }
    }

    onEditItemTierPrice(index: number) {
        if (this.PendingAdd) {
            this.currentItemTierPriceIndex = this.item.ItemTierPrices.length - 1;
            this.PendingAdd = false;
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

    onChangeFOBPrice() {
        if (this.item.FOBPrice) {
            this.item.FOBPrice = Number(this.item.FOBPrice.toFixed(2));
        }

        if (this.item.Price) {
            if (this.item.Price <= 0) {
                this.item.Price = this.item.FOBPrice * 3;
                this.item.Price = Number(this.item.Price.toFixed(2));
            }
        } else {
            this.item.Price = this.item.FOBPrice * 3;
            this.item.Price = Number(this.item.Price.toFixed(2));
        }
    }

    clearFields(form) {
        this.formDirty = false;
        this.canAdd = false;
        form.Price = 0;
        form.Quantity = 0;
    }
}
