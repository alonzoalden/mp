import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Item } from '../../../../shared/class/item';

import { ItemService } from '../../../item.service';

@Component({
  selector: 'o-item-part-edit-inventory',
  templateUrl: './item-part-edit-inventory.component.html'
})

export class ItemPartEditInventoryComponent implements OnInit {
    errorMessage: string;
    item: Item;

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
