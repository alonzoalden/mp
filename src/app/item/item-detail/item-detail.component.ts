import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Item } from '../../shared/class/item';

import { ItemService } from '../item.service';

@Component({
  selector: 'o-item-detail',
  templateUrl: './item-detail.component.html'
})

export class ItemDetailComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    errorMessage: string;
    item: Item;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private itemService: ItemService) { }

    ngOnInit() {
        const param = this.route.snapshot.params['id'];
        this.subscription = this.itemService.getItem(param).subscribe(
            item => this.item = item,
            error => this.errorMessage = <any>error
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
