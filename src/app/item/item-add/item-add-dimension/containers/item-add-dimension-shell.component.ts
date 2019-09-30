import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemInsert } from '../../../../shared/class/item';
import { Store, select } from '@ngrx/store';
import * as fromItem from '../../../state';

@Component({
    templateUrl: './item-add-dimension-shell.component.html'
})

export class ItemAddDimensionShellComponent implements OnInit {
    item$: Observable<ItemInsert>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromItem.State>) { }

    ngOnInit(): void {
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
    }
}
