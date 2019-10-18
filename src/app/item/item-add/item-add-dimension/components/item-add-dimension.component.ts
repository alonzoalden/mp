import { Component, Input } from '@angular/core';
import { ItemInsert } from '../../../../shared/class/item';

@Component({
    selector: 'o-item-add-dimension',
    templateUrl: './item-add-dimension.component.html'
})

export class ItemAddDimensionComponent {
    @Input() item: ItemInsert;
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

    constructor() { }
}
