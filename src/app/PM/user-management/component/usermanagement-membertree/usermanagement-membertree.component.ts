import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Store} from '@ngrx/store';
import {UsermanagementState} from '../../state/usermanagement.reducer';

@Component({
    selector: 'app-usermanagement-membertree',
    templateUrl: './usermanagement-membertree.component.html',
    styleUrls: ['./usermanagement-membertree.component.css']
})
export class UsermanagementMembertreeComponent implements OnInit, OnChanges {

    constructor(
        public dialog: MatDialog,
        private store: Store<UsermanagementState>
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    ngOnInit() {
    }

}
