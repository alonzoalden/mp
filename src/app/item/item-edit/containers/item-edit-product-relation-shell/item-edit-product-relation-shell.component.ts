import { Component , OnInit, OnDestroy} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';
import * as fromUser from '../../../../shared/state/user-state.reducer';
import { Member } from 'app/shared/class/member';
import { Item, ItemList, ItemUpSell, ItemCrossSell, ItemRelatedProductInsert, ItemCrossSellInsert, ItemInsert, ItemUpSellInsert, ItemRelatedProduct } from 'app/shared/class/item';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
    templateUrl: './item-edit-product-relation-shell.component.html'
})

export class ItemEditProductRelationShellComponent implements OnInit, OnDestroy {
    componentActive: boolean = true;
    currentMember: Member;

    item$: Observable<Item | ItemInsert>;
    errorMessage$: Observable<string>;
    userInfo$: Observable<Member>;
    allItemList$: Observable<ItemList[]>;
    itemRelatedProductsMatTable$: Observable<MatTableDataSource<ItemRelatedProduct | ItemRelatedProductInsert>>;
    itemCrossSellsMatTable$: Observable<MatTableDataSource<ItemCrossSell | ItemCrossSellInsert>>;
    itemUpSellsMatTable$: Observable<MatTableDataSource<ItemUpSell | ItemUpSellInsert>>;
    itemUpSells$: Observable<ItemUpSell[] | ItemUpSellInsert[]>;

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
    ngOnDestroy(): void {
        this.componentActive = false;
    }
}