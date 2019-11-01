import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as fromUser from '../shared/state/user-state.reducer';
import { Store, select } from '@ngrx/store';
import * as userActions from '../shared/state/user-state.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
    selector: 'app-original',
    templateUrl: './app-original.component.html',
    styleUrls: ['../app.component.css']
})
export class AppOriginalComponent implements OnInit, OnDestroy {
    componentActive: boolean = true;
    appLoading: boolean = true;

    constructor(
        private router: Router,
        private userStore: Store<fromUser.State>,
    ) { }

    ngOnInit() {
        this.userStore.pipe(
            select(fromUser.getIsLoading),
            takeWhile(() => this.componentActive)
        ).subscribe(
            loading => {
                console.log(loading);
                if (!loading) {
                    this.appLoading = loading;
                }
            }
        );

    }
    ngOnDestroy() {
        this.componentActive = false;
    }
}
