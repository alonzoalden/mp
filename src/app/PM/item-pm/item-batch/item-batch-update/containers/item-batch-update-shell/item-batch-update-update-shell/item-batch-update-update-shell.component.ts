import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Item } from '../../../../../../../shared/class/item';
import { BatchUpdate, BatchUpdateValue } from '../../../../../../../shared/class/batch-update';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../../../state/item.actions';
import * as fromItem from '../../../../../state';
import * as fromUser from '../../../../../../../shared/state/user-state.reducer';
import { Observable } from 'rxjs';
import { Member } from 'app/shared/class/member';

@Component({
    templateUrl: './item-batch-update-update-shell.component.html'
})

export class ItemBatchUpdateUpdateShellComponent implements OnInit {
    itemBatchItemsMatTable$: Observable<MatTableDataSource<Item>>;
    batchUpdates$: Observable<BatchUpdate[]>;
    userInfo$: Observable<Member>;
    isLoading$: Observable<Boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromItem.State>) {}

    ngOnInit() {
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.itemBatchItemsMatTable$ = this.store.pipe(select(fromItem.getItemBatchItemsMatTable));
        this.batchUpdates$ = this.store.pipe(select(fromItem.getItemBatchUpdates));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
        setTimeout(() => {
            this.isLoading$ = this.store.pipe(select(fromItem.getIsLoading));
        });
    }
    getItems(): void {
        this.store.dispatch(new itemActions.LoadItemBatchItems());
    }
    getItemBatchUpdates(): void {
        this.store.dispatch(new itemActions.LoadItemBatchUpdate());
    }
    editItemBatchUpdate(batchupdatevalues: BatchUpdateValue[]): void {
        this.store.dispatch(new itemActions.EditItemBatchUpdate(batchupdatevalues));
    }
}
