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

    setPackagingType() {
        if (!this.item.PackagingType && this.item.PackageWeight && this.item.Weight) {
            const min = 120;
            if (this.item.PackageWeight >= min || this.item.Weight >= min) {
                this.item.PackagingType = '4';
            } else {
                this.item.PackagingType = '5';
            }
        }
    }
}
