import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';
import { Item, ItemInsert, ItemList, ItemOption, ItemSelection, ItemOptionInsert, ItemSelectionInsert } from '../../../../shared/class/item';


@Component({
  templateUrl: './item-edit-bundle-shell.component.html'
})

export class ItemEditBundleShellComponent implements OnInit {
    item$: Observable<ItemInsert | Item >;
    itemList$: Observable<ItemList[]>;
    selectedBundleOption$: Observable<ItemOptionInsert>;
    itemBundleOptionsMatTable$: Observable<MatTableDataSource<ItemOptionInsert>>;
    itemBundleOptionSelectionsMatTable$: Observable<MatTableDataSource<ItemSelectionInsert>>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromItem.State>) { }
   
    ngOnInit(): void {
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.itemList$ = this.store.pipe(select(fromItem.getItemList));
        this.selectedBundleOption$ = this.store.pipe(select(fromItem.getSelectedBundleOption));
        this.itemBundleOptionsMatTable$ = this.store.pipe(select(fromItem.getItemBundleOptionsMatTable));
        this.itemBundleOptionSelectionsMatTable$ = this.store.pipe(select(fromItem.getItemBundleOptionSelectionsMatTable));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
    }
    getItemList() {
        this.store.dispatch(new itemActions.LoadSimpleItemList());
    }
    setSelectedBundleOption(option: number) {
        this.store.dispatch(new itemActions.SetSelectedBundleOption(option));
    }
    
}
