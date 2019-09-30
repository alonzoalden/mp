import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { Member } from 'app/shared/class/member';
import { Observable } from 'rxjs';
import { ItemInsert, ItemList, ItemTierPriceInsert, ItemCrossSellInsert, ItemUpSellInsert, ItemRelatedProductInsert, ItemUpSell } from 'app/shared/class/item';
import { MatTableDataSource } from '@angular/material';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';
import * as fromUser from '../../../../shared/state/user-state.reducer';

@Component({
    templateUrl: './item-add-product-relation-shell.component.html'
})

export class ItemAddProductRelationShellComponent implements OnInit, OnDestroy {
    componentActive: boolean = true;
    currentMember: Member;

    item$: Observable<ItemInsert>;
    errorMessage$: Observable<string>;
    userInfo$: Observable<Member>;
    allItemList$: Observable<ItemList[]>;

    itemRelatedProductsMatTable$: Observable<MatTableDataSource<ItemRelatedProductInsert>>;
    itemCrossSellsMatTable$: Observable<MatTableDataSource<ItemCrossSellInsert>>;

    itemUpSellsMatTable$: Observable<MatTableDataSource<ItemUpSellInsert>>;

    itemUpSells$: Observable<ItemUpSellInsert[]>;

    constructor(
        private userStore: Store<fromUser.State>,
        private store: Store<fromItem.State>
    ) { }

    ngOnInit() {
        this.store.dispatch(new itemActions.LoadAllItemList());

        this.item$ = this.store.pipe(select(fromItem.getItem));

        this.allItemList$ = this.store.pipe(select(fromItem.getAllItemList));

        this.itemRelatedProductsMatTable$ = this.store.pipe(select(fromItem.getItemRelatedProductsMatTable));
        this.itemCrossSellsMatTable$ = this.store.pipe(select(fromItem.getItemCrossSellsMatTable));
        this.itemUpSellsMatTable$ = this.store.pipe(select(fromItem.getItemUpSellsMatTable));
        this.itemUpSells$ = this.store.pipe(select(fromItem.getItemUpSells));

        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));

        this.userStore.pipe(
            select(fromUser.getCurrentUser),
            takeWhile(() => this.componentActive)
          ).subscribe(
            currentMember => this.currentMember = currentMember
          );
    }

    getAllItemUpSell(item: ItemUpSellInsert) {
        this.store.dispatch(new itemActions.LoadAllItemUpSell(item));
    }
    getAllItemCrossSell(item: ItemCrossSellInsert) {
        this.store.dispatch(new itemActions.LoadAllItemCrossSell(item));
    }

    getItemRelatedProduct(relatedproduct: ItemRelatedProductInsert) {
        this.store.dispatch(new itemActions.LoadItemRelatedProduct(relatedproduct));
    }
    addNewItemRelatedProductRow(relatedproduct: ItemRelatedProductInsert) {
        this.store.dispatch(new itemActions.AddNewItemRelatedProductRow(relatedproduct));
    }
    ngOnDestroy(): void {
        this.componentActive = false;
    }
}
