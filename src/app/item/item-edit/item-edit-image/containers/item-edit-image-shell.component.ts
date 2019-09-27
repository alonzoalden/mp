import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Item, ItemImage, ItemImageInsert, ItemInsert } from '../../../../shared/class/item';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';

@Component({
    templateUrl: './item-edit-image-shell.component.html'
})

export class ItemEditImageShellComponent implements OnInit {
    errorMessage$: Observable<string>;
    item$: Observable<Item | ItemInsert>;
    itemImagesMatTable$: Observable<MatTableDataSource<ItemImageInsert | ItemImage>>;
    
    constructor(private store: Store<fromItem.State>) { }

    ngOnInit(): void {
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
        this.itemImagesMatTable$ = this.store.pipe(select(fromItem.getItemImagesMatTable));
    }
}