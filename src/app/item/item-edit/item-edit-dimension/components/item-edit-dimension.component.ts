import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../../../shared/class/item';

@Component({
  selector: 'o-item-edit-dimension',
  templateUrl: './item-edit-dimension.component.html'
})

export class ItemEditDimensionComponent implements OnInit {
    @Input() item: Item;
    @Input() errorMessage: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        
    }
}
