import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Item } from '../../../../../../shared/class/item';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../../../state/item.actions';
import * as fromItem from '../../../../../state';
import * as fromUser from '../../../../../../shared/state/user-state.reducer';
import { Observable } from 'rxjs';
import { Member } from 'app/shared/class/member';

@Component({
    templateUrl: './item-batch-update-select-shell.component.html'
})

export class ItemBatchUpdateSelectShellComponent {
    itemBatchItemsMatTable$: Observable<MatTableDataSource<Item>>;
    userInfo$: Observable<Member>;
    isLoading$: Observable<Boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromItem.State>) {}

    ngOnInit() {
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.itemBatchItemsMatTable$ = this.store.pipe(select(fromItem.getItemBatchItemsMatTable));
        this.isLoading$ = this.store.pipe(select(fromItem.getIsLoading));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
    }
    getItems(): void {
        this.store.dispatch(new itemActions.LoadItemBatchItems());
    }
}
