import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromItem from '../../../../state';
import * as fromUser from '../../../../../../shared/state/user-state.reducer';
import { Member } from '../../../../../../shared/class/member';

@Component({
    templateUrl: './item-batch-update-shell.component.html'
})

export class ItemBatchUpdateShellComponent implements OnInit {
    errorMessage$: Observable<string>;
    userInfo$: Observable<Member>;

    constructor(private store: Store<fromItem.State>) {}

    ngOnInit() {
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
    }

}
