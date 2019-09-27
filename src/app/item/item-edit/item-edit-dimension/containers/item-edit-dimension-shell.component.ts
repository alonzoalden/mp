import { Component, OnInit } from '@angular/core';
import { Item, ItemInsert } from '../../../../shared/class/item';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';

@Component({
  templateUrl: './item-edit-dimension-shell.component.html'
})

export class ItemEditDimensionShellComponent implements OnInit {
    item$: Observable<Item | ItemInsert>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromItem.State>) { }

    ngOnInit(): void {
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
    }
}
