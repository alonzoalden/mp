import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {MemberRelationNode, MemberRelationItemNode} from '../../../../shared/class/member-relation';
import {Store} from '@ngrx/store';
import {UsermanagementState} from '../../state/usermanagement.reducer';
import * as UserManageActions from '../../state/usermanagement.actions';

@Component({
    selector: 'app-usermanagement-membertree-bottom-sheet',
    templateUrl: 'usermanegement-membertree-bottomsheet.html',
})
export class UsermanegementMembertreeBottomsheet implements OnInit {
    event = new EventEmitter<BottomsheetExportData>();

    constructor(
        private _bottomSheetRef: MatBottomSheetRef<UsermanegementMembertreeBottomsheet>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: BottomsheetInjectData,
        private store: Store<UsermanagementState>
    ) {

    }

    ngOnInit() {
    }

    openLink(event: MouseEvent): void {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }

    memberClick(event: MouseEvent, member: MemberRelationNode): void {
        const data = new BottomsheetExportData(member, this.data.parentNode);
        this.store.dispatch(new UserManageActions.DeleteFromUnRelatedMemberRelationList(member));
        this.event.emit(data);
        event.preventDefault();
        this._bottomSheetRef.dismiss();
    }
}

export class BottomsheetInjectData {
    memberList: MemberRelationNode[];
    parentNode: MemberRelationItemNode;
}

export class BottomsheetExportData {
    constructor(
        public member: MemberRelationNode,
        public parentNode: MemberRelationItemNode
    ) {
    }
}
