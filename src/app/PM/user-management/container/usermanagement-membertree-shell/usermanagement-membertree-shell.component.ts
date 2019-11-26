import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {UsermanagementState} from '../../state/usermanagement.reducer';

@Component({
    selector: 'app-usermanagement-membertree-shell',
    templateUrl: './usermanagement-membertree-shell.component.html',
    styleUrls: ['./usermanagement-membertree-shell.component.css']
})
export class UsermanagementMembertreeShellComponent implements OnInit {


    constructor(
        private store: Store<UsermanagementState>
    ) {
    }

    ngOnInit() {

    }

}
