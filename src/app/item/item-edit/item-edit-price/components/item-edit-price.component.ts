import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Item, ItemTierPrice } from '../../../../shared/class/item';
import { ItemService } from '../../../item.service';
import { Member } from '../../../../shared/class/member';

@Component({
    selector: 'o-item-edit-price',
    templateUrl: './item-edit-price.component.html'
})

export class ItemEditPriceComponent implements OnInit, OnChanges {
    @Input() userInfo: Member;
    @Input() errorMessage: string;
    @Input() item: Item;
    @Input() itemTierPricesMatTable: MatTableDataSource<ItemTierPrice>;
    @Output() getItemTierPrices = new EventEmitter<number>();
    _itemTierPrices: ItemTierPrice[] = [];
    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2040, 0, 1);
    specialFrom: Date;
    specialTo: Date;
    pendingAdd: boolean;
    currentItemTierPriceIndex: number;
    displayedColumns = ['Add', 'Quantity', 'Price', 'Remove'];
    dataSource: any = null;
    formDirty = false;
    canAdd = false;

    constructor(private itemService: ItemService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.itemTierPricesMatTable && !changes.itemTierPricesMatTable.currentValue.data.length) {
            this.addPendingLine();
        }
        this.currentItemTierPriceIndex = this.item.ItemTierPrices.length - 1;
    }

    ngOnInit(): void {
        if (!this.item.ItemTierPrices.length) {
            this.getItemTierPrices.emit(this.item.ItemID);
        }
        if (this.item.ItemTierPrices[this.item.ItemTierPrices.length - 1].ItemTierPriceID) {
            this.addPendingLine();
        }
    }

    initialize() {
        if (this.itemService.currentItemEdit.ItemTierPrices === null) {
            this.itemService.getItemTierPrices(this.item.ItemID).subscribe(
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
        this.itemTierPricesMatTable = new MatTableDataSource<ItemTierPrice>(itemTierPrices);
    }

    onAddItemTierPrice(itemTierPrice: ItemTierPrice) {
        const existItemTierPrice = this.item.ItemTierPrices.find(x => x.Quantity === itemTierPrice.Quantity && !x.pendingAdd);
        if (existItemTierPrice) {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Tier Pricing already exists for this Quantity' });
        } else {
            this.pendingAdd = true;
            itemTierPrice.pendingAdd = false;
            this.addPendingLine();
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

    onPriceTypeChange() {
        this.item.Price = null;
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
