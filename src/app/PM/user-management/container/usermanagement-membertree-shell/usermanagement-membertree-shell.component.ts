import {Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {UsermanagementState} from '../../state/usermanagement.reducer';
import {MemberRelationItemNode, MemberRelationNode} from 'app/shared/class/member-relation';
import * as UserManageSelector from '../../state/index';
import * as UserManageActions from '../../state/usermanagement.actions';

@Component({
    selector: 'app-usermanagement-membertree-shell',
    templateUrl: './usermanagement-membertree-shell.component.html',
    styleUrls: ['./usermanagement-membertree-shell.component.css']
})
export class UsermanagementMembertreeShellComponent implements OnInit {
    data$: Observable<MemberRelationItemNode[]>;
    unRelatedList$: Observable<MemberRelationNode[]>;
    isTreeDataLoading$: Observable<Boolean>;

    constructor(
        private store: Store<UsermanagementState>
    ) {
    }

    ngOnInit() {
        this.data$ = this.store.pipe(select(UserManageSelector.getMemberRelationTree));
        this.unRelatedList$ = this.store.pipe(select(UserManageSelector.getMemberRelationUnUseList));
        this.isTreeDataLoading$ = this.store.pipe(select(UserManageSelector.getMemberRelationTreeLoading));
    }

    getMemberRelationTree() {
        this.store.dispatch(new UserManageActions.LoadMemberRelationTree);
    }

    updateMemberRelationTree(tree) {
        this.store.dispatch(new UserManageActions.UpdateMemberRelationTree(tree));
    }

    getUnRelatedMemberList() {
        this.store.dispatch(new UserManageActions.LoadUnRelatedMemberRelationList());
    }

    AddtoUnRelatedMemberRelationList(memberList: MemberRelationItemNode[]) {
        const newList = memberList.map(member => new MemberRelationNode(member.MemberID, member.Name, null));
        this.store.dispatch(new UserManageActions.AddtoUnRelatedMemberRelationList(newList));
    }

    addMemberTree(member: MemberRelationItemNode) {
        this.store.dispatch(new UserManageActions.AddRelatedMemberRelation(member));
    }

    deleteMemberTree(member: MemberRelationItemNode) {
        this.store.dispatch(new UserManageActions.DeleteRelatedMemberRelation(member));
    }

    saveMemberTree(memberlist: MemberRelationItemNode[]) {
        this.store.dispatch(new UserManageActions.SaveRelatedMemberRelationList(memberlist));
    }
}
