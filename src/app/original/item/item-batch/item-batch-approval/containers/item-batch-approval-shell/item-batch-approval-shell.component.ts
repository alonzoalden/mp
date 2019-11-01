import { Component, OnInit } from '@angular/core';
import { ItemBatch } from '../../../../../../shared/class/item';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../../state/item.actions';
import * as fromItem from '../../../../state';
import * as fromUser from '../../../../../../shared/state/user-state.reducer';
import { Member } from '../../../../../../shared/class/member';
import { MatTableDataSource } from '@angular/material';

@Component({
    templateUrl: './item-batch-approval-shell.component.html'
})

export class ItemBatchApprovalShellComponent implements OnInit {
    itemBatch$: Observable<ItemBatch[]>;
    itemBatchMatTable$: Observable<MatTableDataSource<ItemBatch>>;
    userInfo$: Observable<Member>;
    isLoading$: Observable<Boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromItem.State>) {}

    ngOnInit() {
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.itemBatch$ = this.store.pipe(select(fromItem.getItemBatch));
        this.itemBatchMatTable$ = this.store.pipe(select(fromItem.getItemBatchMatTable));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
        setTimeout(() => {
            this.isLoading$ = this.store.pipe(select(fromItem.getIsLoading));
        });
    }
    getPendingItems(): void {
        this.store.dispatch(new itemActions.LoadPendingItems());
    }
    editItemBatch(itembatch: ItemBatch[]): void {
        this.store.dispatch(new itemActions.EditItemBatch(itembatch));
    }
}
