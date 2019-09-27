import { Component, OnInit } from '@angular/core';
import { ItemInsert, ItemList } from '../../../../shared/class/item';
import { Store, select } from '@ngrx/store';
import * as fromItem from '../../../state';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './item-add-part-shell.component.html'
})

export class ItemAddPartShellComponent implements OnInit {
    errorMessage$: Observable<string>;
    item$: Observable<ItemInsert>;

    constructor(private store: Store<fromItem.State>) { }

    ngOnInit() {
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
    }
}