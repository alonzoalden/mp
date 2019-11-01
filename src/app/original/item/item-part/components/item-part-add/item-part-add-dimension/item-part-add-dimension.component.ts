import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ItemInsert } from '../../../../../../shared/class/item';

import { ItemService } from '../../../../item.service';

@Component({
  selector: 'o-item-part-add-dimension',
  templateUrl: './item-part-add-dimension.component.html'
})

export class ItemPartAddDimensionComponent implements OnInit {
    errorMessage: string;
    item: ItemInsert;
    packagingTypes: any = [
        {
            Name: 'Small Parcel',
            Value: 5
        },
        {
            Name: 'Freight',
            Value: 4
        }
    ];
    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.item = this.itemService.currentItemInsert;
        this.item.PackagingType = this.packagingTypes[0].Value;
    }
}
