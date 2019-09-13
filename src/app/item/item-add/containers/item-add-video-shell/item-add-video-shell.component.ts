import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ItemInsert, ItemVideoInsert } from '../../../../shared/class/item';
import { ItemService } from '../../../item.service';
import { URLVideo } from '../../../../shared/class/item-video';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';

@Component({
    templateUrl: './item-add-video-shell.component.html'
})

export class ItemAddVideoShellComponent implements OnInit {
    errorMessage$: Observable<string>;
    item$: Observable<ItemInsert>;
    itemVideosMatTable$: Observable<MatTableDataSource<ItemVideoInsert>>;

    constructor(private store: Store<fromItem.State>) { }

    ngOnInit(): void {
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
        this.itemVideosMatTable$ = this.store.pipe(select(fromItem.getItemVideosMatTable));
    }
}