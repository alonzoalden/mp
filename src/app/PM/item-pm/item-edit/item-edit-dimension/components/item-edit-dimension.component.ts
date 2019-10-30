import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../../../../shared/class/item';

@Component({
    selector: 'o-item-edit-dimension',
    templateUrl: './item-edit-dimension.component.html'
})

export class ItemEditDimensionComponent implements OnInit {
    @Input() item: Item;
    @Input() errorMessage: string;
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
    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void { }
}
