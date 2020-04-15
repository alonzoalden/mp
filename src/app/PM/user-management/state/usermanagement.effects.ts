import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {EMPTY, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {UsermanagementState} from './usermanagement.reducer';
import * as UserManageActions from '../state/usermanagement.actions';
import {UserManagementService} from '../user-management.service';
import {Member} from '../../../shared/class/member';
import {MatDialog} from '@angular/material';
import {Vendor} from '../../../shared/class/vendor';
import {MemberRelationItemNode, MemberRelationNode} from 'app/shared/class/member-relation';
import {Router} from '@angular/router';
import {VendorRegistrationB2B} from '../../../shared/class/vendor-registration';


@Injectable()
export class UsermanagementEffects {
    constructor(
        private actions$: Actions,
        private store: Store<UsermanagementState>,
        private userManageService: UserManagementService,
        public dialog: MatDialog,
        private router: Router
    ) {
    }

    @Effect() LoadMemberList$ = this.actions$.pipe(
        ofType(UserManageActions.UserManangementActionTypes.LoadMemberList),
        mergeMap(() => {
            return this.userManageService.getSubMembers().pipe(
                map((memberList: Member[]) => new UserManageActions.LoadMemberListSuccess(memberList)),
                catchError(err => {
                        this.userManageService.sendNotification({type: 'error', title: 'Error', content: err});
                        return of(new UserManageActions.LoadMemberListFail(err));
                    }
                )
            );
        })
    );

    @Effect() LoadRelatedVendorList$ = this.actions$.pipe(
        ofType(UserManageActions.UserManangementActionTypes.LoadCurrentMemberRelatedVendors),
        map((action: UserManageActions.LoadCurrentMemberRelatedVendors) => action.payload),
        mergeMap((memberID: string) => {
            if (memberID) {
                return this.userManageService.getRelatedVendors(memberID).pipe(
                    map((vendorList: Vendor[]) => new UserManageActions.LoadCurrentMemberRelatedVendorsSuccess(vendorList)),
                    catchError(err => {
                            this.userManageService.sendNotification({type: 'error', title: 'Error', content: err});
                            return of(new UserManageActions.LoadCurrentMemberRelatedVendorsFail(err));
                        }
                    )
                );
            } else {
                this.userManageService.sendNotification({type: 'error', title: 'Error', content: 'No MemberID'});
                return of(new UserManageActions.LoadCurrentMemberRelatedVendorsFail('No MemberID'));
            }
        })
    );

    @Effect() LoadUnRelatedVendorList$ = this.actions$.pipe(
        ofType(UserManageActions.UserManangementActionTypes.LoadCurrentMemberUnRelatedVendors),
        map((action: UserManageActions.LoadCurrentMemberUnRelatedVendors) => action.payload),
        mergeMap((memberID: string) => {
            if (memberID) {
                return this.userManageService.getUnRelatedVendors(memberID).pipe(
                    map((vendorList: Vendor[]) => new UserManageActions.LoadCurrentMemberUnRelatedVendorsSuccess(vendorList)),
                    catchError(err => {
                            this.userManageService.sendNotification({type: 'error', title: 'Error', content: err});
                            return of(new UserManageActions.LoadCurrentMemberUnRelatedVendorsFail(err));
                        }
                    )
                );
            } else {
                this.userManageService.sendNotification({type: 'error', title: 'Error', content: 'No MemberID'});
                return of(new UserManageActions.LoadCurrentMemberUnRelatedVendorsFail('No Member'));
            }
        })
    );

    @Effect() AddVendorRelationToMember$ = this.actions$.pipe(
        ofType(UserManageActions.UserManangementActionTypes.AddVendorRelationToMember),
        map((action: UserManageActions.AddVendorRelationToMember) => action.payload),
        mergeMap((vendor: { Vendor: Vendor, MemberID: string }) => {
            if (vendor) {
                return this.userManageService.EditRelatedVendor(vendor.Vendor).pipe(
                    map((updatedVendor: Vendor) => {
                            this.userManageService.sendNotification({type: 'success', title: 'Add Completed', content: ''});
                            this.store.dispatch(new UserManageActions.LoadCurrentMemberRelatedVendors(vendor.MemberID));
                            this.store.dispatch(new UserManageActions.LoadCurrentMemberUnRelatedVendors(vendor.MemberID));
                            return new UserManageActions.AddVendorRelationToMemberSuccess();
                        }
                    ),
                    catchError(err => {
                            this.userManageService.sendNotification({type: 'error', title: 'Error', content: err});
                            return of(new UserManageActions.AddVendorRelationToMemberFail(err));
                        }
                    )
                );
            } else {
                this.userManageService.sendNotification({type: 'error', title: 'Error', content: 'No MemberID'});
                return of(new UserManageActions.AddVendorRelationToMemberFail('No Vendor'));
            }
        })
    );

    @Effect() RemoveVendorRelationToMember$ = this.actions$.pipe(
        ofType(UserManageActions.UserManangementActionTypes.RemoveVendorRelationToMember),
        map((action: UserManageActions.RemoveVendorRelationToMember) => action.payload),
        mergeMap((vendor: { Vendor: Vendor, MemberID: string }) => {
            if (vendor) {
                return this.userManageService.EditRelatedVendor(vendor.Vendor).pipe(
                    map((updatedVendor: Vendor) => {
                            this.userManageService.sendNotification({
                                type: 'success',
                                title: 'Remove Completed',
                                content: ''
                            });
                            this.store.dispatch(new UserManageActions.LoadCurrentMemberRelatedVendors(String(vendor.MemberID)));
                            this.store.dispatch(new UserManageActions.LoadCurrentMemberUnRelatedVendors(String(vendor.MemberID)));
                            return new UserManageActions.RemoveVendorRelationToMemberSuccess();
                        }
                    ),
                    catchError(err => {
                            this.userManageService.sendNotification({type: 'error', title: 'Error', content: err});
                            return of(new UserManageActions.RemoveVendorRelationToMemberFail(err));
                        }
                    )
                );
            }
        })
    );

    @Effect() LoadMemberRelationTree$ = this.actions$.pipe(
        ofType(UserManageActions.UserManangementActionTypes.LoadMemberRelationTree),
        mergeMap(() => {
            return this.userManageService.getMemberRelationTree().pipe(
                map((tree: MemberRelationItemNode[]) => {
                        return new UserManageActions.LoadMemberRelationTreeSuccess(tree);
                    }
                ),
                catchError(err => {
                    this.userManageService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new UserManageActions.LoadMemberRelationTreeFail(err));
                })
            );
        })
    );

    @Effect() LoadUnRelatedMemberList$ = this.actions$.pipe(
        ofType(UserManageActions.UserManangementActionTypes.LoadUnRelatedMemberRelationList),
        mergeMap(() => {
            return this.userManageService.getUnRelatedMemberRelationList().pipe(
                map((list: MemberRelationNode[]) => {
                        return new UserManageActions.LoadUnRelatedMemberRelationListSuccess(list);
                    }
                ),
                catchError(err => {
                    this.userManageService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new UserManageActions.LoadUnRelatedMemberRelationListFail(err));
                })
            );
        })
    );

    @Effect() SaveRelatedMemberRelationList$ = this.actions$.pipe(
        ofType(UserManageActions.UserManangementActionTypes.SaveRelatedMemberRelationList),
        map((action: UserManageActions.SaveRelatedMemberRelationList) => action.payload),
        mergeMap((memberList: MemberRelationItemNode[]) => {
            console.log(memberList);
            return this.userManageService.saveRelatedMemberRelationList(memberList).pipe(
                map((list: MemberRelationItemNode[]) => {
                        this.userManageService.sendNotification({
                            type: 'success',
                            title: 'Successfully Updated',
                            content: ''
                        });
                        window.location.reload();
                        // this.store.dispatch(new UserManageActions.LoadMemberRelationTree());
                        return new UserManageActions.SaveRelatedMemberRelationListSuccess(list);
                    }
                ),
                catchError(err => {
                    this.userManageService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new UserManageActions.SaveRelatedMemberRelationListFail(err));
                })
            );
        })
    );

    @Effect() LoadCheckVendorList$ = this.actions$.pipe(
        ofType(UserManageActions.UserManangementActionTypes.LoadCheckVendorList),
        mergeMap(() => {
            return this.userManageService.getCheckVendorList().pipe(
                map((vendorList: VendorRegistrationB2B[]) => new UserManageActions.LoadCheckVendorListSuccess(vendorList)),
                catchError(err => {
                        this.userManageService.sendNotification({type: 'error', title: 'Error', content: err});
                        return of(new UserManageActions.LoadCheckVendorListFail(err));
                    }
                )
            );
        })
    );

    @Effect() CreateVendorB2b$ = this.actions$.pipe(
        ofType(UserManageActions.UserManangementActionTypes.CreateVendorB2b),
        map((action: UserManageActions.CreateVendorB2b) => action.payload),
        mergeMap((vendorRegistration: VendorRegistrationB2B) => {
            return this.userManageService.createVendorB2b(vendorRegistration).pipe(
                map((vendorRegistration: VendorRegistrationB2B) => {
                    this.userManageService.sendNotification({
                        type: 'success',
                        title: 'Successfully Created',
                        content: ''
                    });
                    this.router.navigate(['PM/user/check']);
                    // this.store.dispatch(new UserManageActions.LoadCheckVendorList());
                    return new UserManageActions.CreateVendorB2bSuccess(vendorRegistration);
                }),
                catchError(err => {
                        this.userManageService.sendNotification({type: 'error', title: 'Error', content: err});
                        return of(new UserManageActions.CreateVendorB2bFail(err));
                    }
                )
            );
        })
    );

    @Effect({dispatch: false}) EditCurrentVendorRegistration = this.actions$.pipe(
        ofType(UserManageActions.UserManangementActionTypes.EditCurrentVendorRegistration),
        map((action: UserManageActions.EditCurrentVendorRegistration) => action.payload),
        mergeMap((vendorRegistration: VendorRegistrationB2B) => {
            this.router.navigate(['PM/user/check/' + vendorRegistration.VendorRegistrationID]);
            return EMPTY;
        })
    );

    @Effect() LoadMemberPMList$ = this.actions$.pipe(
        ofType(UserManageActions.UserManangementActionTypes.LoadMemberPMList),
        mergeMap(() => {
            return this.userManageService.getMemberPMList().pipe(
                map((memberList: Member[]) => new UserManageActions.LoadMemberPMListSuccess(memberList)),
                catchError(err => {
                        this.userManageService.sendNotification({type: 'error', title: 'Error', content: err});
                        return of(new UserManageActions.LoadMemberPMListFail(err));
                    }
                )
            );
        })
    );
}
