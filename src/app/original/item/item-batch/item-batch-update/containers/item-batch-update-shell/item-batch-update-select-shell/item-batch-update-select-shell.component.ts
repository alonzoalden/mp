import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Item } from '../../../../../../../shared/class/item';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../../../state/item.actions';
import * as fromItem from '../../../../../state';
import * as fromUser from '../../../../../../../shared/state/user-state.reducer';
import { Observable } from 'rxjs';
import { Member } from '../../../../../../../shared/class/member';

@Component({
    templateUrl: './item-batch-update-select-shell.component.html'
})

export class ItemBatchUpdateSelectShellComponent implements OnInit {
    itemBatchItemsMatTable$: Observable<MatTableDataSource<Item>>;
    userInfo$: Observable<Member>;
    isLoading$: Observable<Boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromItem.State>) {}

    ngOnInit() {
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.itemBatchItemsMatTable$ = this.store.pipe(select(fromItem.getItemsMatTable));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
        setTimeout(() => {
            this.isLoading$ = this.store.pipe(select(fromItem.getIsMainItemsListLoading));
        });
    }
    getItems(): void {
        this.store.dispatch(new itemActions.LoadMainItems());
    }
}
