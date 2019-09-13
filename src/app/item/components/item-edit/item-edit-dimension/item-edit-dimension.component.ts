import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
        // const itemid = this.route.parent.snapshot.params['id'];
        // this.itemService.getCurrentItemEdit(itemid).subscribe(
        //     (item: Item) => {
        //         this.itemService.currentItemEdit = item;
        //         this.item = item;
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );
    }
}
