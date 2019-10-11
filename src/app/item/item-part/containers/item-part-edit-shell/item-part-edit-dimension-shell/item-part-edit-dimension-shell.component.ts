import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Item } from '../../../../../shared/class/item';

import { ItemService } from '../../../../item.service';

@Component({
  templateUrl: './item-part-edit-dimension-shell.component.html'
})

export class ItemPartEditDimensionShellComponent implements OnInit {
    errorMessage: string;
    item: Item;
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

    constructor(private route: ActivatedRoute,
                private itemService: ItemService) { }

    ngOnInit(): void {
        const itemid = this.route.parent.snapshot.params['id'];
        this.itemService.getCurrentItemEdit(itemid).subscribe(
            (item: Item) => {
                this.itemService.currentItemEdit = item;
                this.item = item;
            },
            (error: any) => this.errorMessage = <any>error
        );
    }
}
