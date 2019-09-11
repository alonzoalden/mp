import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';

import { ItemInsert, ItemAttachmentInsert, ItemImageInsert } from '../../../../shared/class/item';

import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';

declare var $ :any;

@Component({
    templateUrl: './item-add-image-shell.component.html'
})

export class ItemAddImageShellComponent implements OnInit {
    errorMessage$: Observable<string>;
    item$: Observable<ItemInsert>;
    itemImagesMatTable$: Observable<MatTableDataSource<ItemImageInsert>>;
    constructor(private store: Store<fromItem.State>) { }

    ngOnInit(): void {
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
        this.itemImagesMatTable$ = this.store.pipe(select(fromItem.getItemImagesMatTable));
    }
}