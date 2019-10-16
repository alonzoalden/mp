import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Item, ItemVideoInsert, ItemVideo, ItemInsert } from '../../../../shared/class/item';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';

@Component({
    templateUrl: './item-edit-video-shell.component.html'
})

export class ItemEditVideoShellComponent implements OnInit {
    errorMessage$: Observable<string>;
    item$: Observable<Item | ItemInsert>;
    itemVideosMatTable$: Observable<MatTableDataSource<ItemVideo | ItemVideoInsert>>;

    constructor(private store: Store<fromItem.State>) { }

    ngOnInit(): void {
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
        this.itemVideosMatTable$ = this.store.pipe(select(fromItem.getItemVideosMatTable));
    }
    getVideoURLDetail(payload: ItemVideo): void {
        this.store.dispatch(new itemActions.LoadVideoURLDetail(payload));
    }
}
