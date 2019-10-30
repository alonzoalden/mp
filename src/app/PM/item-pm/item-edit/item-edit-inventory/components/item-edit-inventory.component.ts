import { Component, Input } from '@angular/core';
import { Item } from '../../../../../shared/class/item';

@Component({
  selector: 'o-item-edit-inventory',
  templateUrl: './item-edit-inventory.component.html'
})

export class ItemEditInventoryComponent {
    @Input() item: Item;
    @Input() errorMessage: string;
    constructor() { }
}
