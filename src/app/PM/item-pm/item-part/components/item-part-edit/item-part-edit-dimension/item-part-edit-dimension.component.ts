import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../../../../../shared/class/item';
import { ItemService } from '../../../../item.service';

@Component({
  selector: 'o-item-part-edit-dimension',
  templateUrl: './item-part-edit-dimension.component.html'
})

export class ItemPartEditDimensionComponent implements OnInit {
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
