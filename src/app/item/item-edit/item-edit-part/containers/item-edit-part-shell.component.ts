import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemInsert, Item } from 'app/shared/class/item';
import { Store, select } from '@ngrx/store';
import * as fromItem from '../../../state';

@Component({
    templateUrl: './item-edit-part-shell.component.html'
})

export class ItemEditPartShellComponent implements OnInit {
    errorMessage$: Observable<string>;
    item$: Observable<Item | ItemInsert>;

    constructor(private store: Store<fromItem.State>) { }

    ngOnInit() {
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
    }
}
