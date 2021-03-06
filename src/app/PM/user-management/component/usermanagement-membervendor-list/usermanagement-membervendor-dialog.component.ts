import {
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Member} from '../../../../shared/class/member';
import {select, Store} from '@ngrx/store';
import {UsermanagementState} from '../../state/usermanagement.reducer';
import {Observable} from 'rxjs';
import {Vendor} from '../../../../shared/class/vendor';
import * as UserManageSelector from '../../state/index';
import * as UserManageActions from '../../state/usermanagement.actions';

@Component({
    selector: 'app-pm-usermanagement-membervendor-dialog',
    templateUrl: './usermanagement-membervendor-dialog.component.html',

})
export class UsermanagementMemberVendorDialogComponent implements OnInit {
    relatedVendorList$: Observable<MatTableDataSource<Vendor>>;
    isRelationVendorListLoading$: Observable<boolean>;
    unRelatedVendorList$: Observable<MatTableDataSource<Vendor>>;
    isUnRelationVendorListLoading$: Observable<boolean>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DataType,
        public dialogRef: MatDialogRef<UsermanagementMemberVendorDialogComponent>,
        private store: Store<UsermanagementState>
    ) {

    }

    ngOnInit() {
        this.relatedVendorList$ = this.store.pipe(select(UserManageSelector.getRelatedVendorList));
        this.unRelatedVendorList$ = this.store.pipe(select(UserManageSelector.getUnRelatedVendorList));

        setTimeout(() => {
                this.isRelationVendorListLoading$ = this.store.pipe(select(UserManageSelector.getRelatedVendorListLoading));
                this.isUnRelationVendorListLoading$ = this.store.pipe(select(UserManageSelector.getUnRelatedVendorListLoading));
            }
        );
    }

    getRelatedVendorList(member: Member) {
        this.store.dispatch(new UserManageActions.LoadCurrentMemberRelatedVendors(String(member.MemberID)));
    }

    getUnRelatedVendorList(member: Member) {
        this.store.dispatch(new UserManageActions.LoadCurrentMemberUnRelatedVendors(String(member.MemberID)));

    }

    onCancelClick() {
        this.dialogRef.close();
    }

}

interface DataType {
    member: Member;
    type: 'view' | 'edit';
}

@Component({
    selector: 'app-user-management-membervendor-dialog-content-view',
    templateUrl: './usermanagement-membervendor-dialog-content-view.component.html'
})
export class UserManagementMemberVendorDialogContentViewComponent implements OnInit, OnChanges {
    @Input() member: Member;
    @Output() closeEvent = new EventEmitter();
    @Input() relatedVendorList: MatTableDataSource<Vendor>;
    @Input() isRelationVendorListLoading: Observable<boolean>;
    @Output() getRelatedVendorList = new EventEmitter<Member>();
    displayedColumns = ['Position', 'MerchantID', 'CompanyName'];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(
        private store: Store<UsermanagementState>
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.relatedVendorList && changes.relatedVendorList.currentValue.data) {
            this.relatedVendorList.paginator = this.paginator;
            this.relatedVendorList.sort = this.sort;
        }
    }

    ngOnInit() {
        this.getRelatedVendorList.emit(this.member);
    }

    onCloseClick() {
        this.closeEvent.emit();
    }
}

@Component({
    selector: 'app-user-management-membervendor-dialog-content-edit',
    templateUrl: './usermanagement-membervendor-dialog-content-edit.component.html'
})
export class UserManagementMemberVendorDialogContentEditComponent implements OnInit, OnChanges {
    @Input() member: Member;
    @Output() closeEvent = new EventEmitter();
    @Input() relatedVendorList: MatTableDataSource<Vendor>;
    @Input() unRelatedVendorList: MatTableDataSource<Vendor>;
    @Input() isRelationVendorListLoading: Observable<boolean>;
    @Input() isUnRelationVendorListLoading: Observable<boolean>;
    @Output() getRelatedVendorList = new EventEmitter<Member>();
    @Output() getUnRelatedVendorList = new EventEmitter<Member>();
    displayedColumns = ['MerchantID', 'CompanyName', 'MemberName', 'Edit'];
    displayedColumns2 = ['MerchantID', 'CompanyName', 'Edit'];

    @ViewChild('paginator1', {static: true}) paginator1: MatPaginator;
    // @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild('paginator2', {static: true}) paginator2: MatPaginator;

    // @ViewChild(MatSort, {static: true}) sort2: MatSort;
    constructor(
        private store: Store<UsermanagementState>
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.relatedVendorList && changes.relatedVendorList.currentValue.data) {
            this.relatedVendorList.paginator = this.paginator2;
            // this.relatedVendorList.sort = this.sort;
        }
        if (changes.unRelatedVendorList && changes.unRelatedVendorList.currentValue.data) {
            this.unRelatedVendorList.paginator = this.paginator1;
            // this.unRelatedVendorList.sort = this.sort;
        }
    }

    ngOnInit() {
        this.getRelatedVendorList.emit(this.member);
        this.getUnRelatedVendorList.emit(this.member);
    }

    onCloseClick() {
        this.closeEvent.emit();
    }

    add(vendor: Vendor) {
        if (vendor.MemberID) {
            const confirmation = confirm(`Are You Sure?`);
            if (!confirmation) {
                return;
            }
        }
        const updateVendor: Vendor = JSON.parse(JSON.stringify(vendor));
        updateVendor.MemberID = this.member.MemberID;
        this.store.dispatch(new UserManageActions.AddVendorRelationToMember({
            Vendor: updateVendor,
            MemberID: String(this.member.MemberID)
        }));
    }

    remove(vendor) {
        const updateVendor: Vendor = JSON.parse(JSON.stringify(vendor));
        updateVendor.MemberID = null;
        this.store.dispatch(new UserManageActions.RemoveVendorRelationToMember({
            Vendor: updateVendor,
            MemberID: String(this.member.MemberID)
        }));
    }

    applyFilter(filterValue: string) {
        this.unRelatedVendorList.filter = filterValue.trim().toLowerCase();
        if (this.unRelatedVendorList.paginator) {
            this.unRelatedVendorList.paginator.firstPage();
        }
    }

    myVendorApplyFilter(filterValue: string) {
        this.relatedVendorList.filter = filterValue.trim().toLowerCase();
        if (this.relatedVendorList.paginator) {
            this.relatedVendorList.paginator.firstPage();
        }
    }
}
