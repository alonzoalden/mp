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
    selector: 'app-pm-usermanagement-member-list-dialog',
    templateUrl: './usermanagement-member-list-dialog.component.html',

})
export class UsermanagementMemberListDialogComponent implements OnInit {
    relatedVendorList$: Observable<MatTableDataSource<Vendor>>;
    isRelationVendorListLoading$: Observable<boolean>;
    unRelatedVendorList$: Observable<MatTableDataSource<Vendor>>;
    isUnRelationVendorListLoading$: Observable<boolean>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DataType,
        public dialogRef: MatDialogRef<UsermanagementMemberListDialogComponent>,
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
    selector: 'app-user-management-member-list-dialog-content-view',
    templateUrl: './usermanagement-member-list-dialog-content-view.component.html'
})
export class UserManagementMemberListDialogContentViewComponent implements OnInit, OnChanges {
    @Input() member: Member;
    @Output() closeEvent = new EventEmitter();
    @Input() relatedVendorList: MatTableDataSource<Vendor>;
    @Input() isRelationVendorListLoading: Observable<boolean>;
    @Output() getRelatedVendorList = new EventEmitter<Member>();
    displayedColumns = ['Position', 'VendorID', 'CompanyName', 'MerchantID'];
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
    selector: 'app-user-management-member-list-dialog-content-edit',
    templateUrl: './usermanagement-member-list-dialog-content-edit.component.html'
})
export class UserManagementMemberListDialogContentEditComponent implements OnInit, OnChanges {
    @Input() member: Member;
    @Output() closeEvent = new EventEmitter();
    @Input() relatedVendorList: MatTableDataSource<Vendor>;
    @Input() unRelatedVendorList: MatTableDataSource<Vendor>;
    @Input() isRelationVendorListLoading: Observable<boolean>;
    @Input() isUnRelationVendorListLoading: Observable<boolean>;
    @Output() getRelatedVendorList = new EventEmitter<Member>();
    @Output() getUnRelatedVendorList = new EventEmitter<Member>();
    displayedColumns = ['VendorID', 'CompanyName', 'MerchantID', 'MemberName', 'Edit'];
    displayedColumns2 = ['Index', 'VendorID', 'CompanyName', 'MerchantID', 'Edit'];

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
}