import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Item, ItemInsert } from '../../../../shared/class/item';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';

@Component({
  templateUrl: './item-edit-inventory-shell.component.html'
})

export class ItemEditInventoryShellComponent implements OnInit {
    item$: Observable<ItemInsert>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromItem.State>) { }

    ngOnInit(): void {
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
    }
}
