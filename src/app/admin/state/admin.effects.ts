import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AdminService } from '../admin.service';
import * as fromAdmin from './index';
import * as adminActions from './admin.actions';
import { Router } from '@angular/router';
import { Member } from 'app/shared/class/member';
import { VendorList } from 'app/shared/class/vendor';

@Injectable()
export class AdminEffects {
    [x: string]: any;
    constructor(
        private router: Router,
        private store: Store<fromAdmin.State>,
        private adminService: AdminService,
        private actions$: Actions) { }



    @Effect()
    loadMembers$: Observable<Action> = this.actions$.pipe(
        ofType(adminActions.AdminActionTypes.LoadMembers),
        mergeMap(() =>
            this.adminService.getMembers().pipe(
                map((members: Member[]) => (new adminActions.LoadMembersSuccess(members))),
                catchError(err => {
                    of(new adminActions.LoadMembersFail(err));
                    return EMPTY;
                })
            )
        ),
        take(1)
    );
    @Effect()
    loadVendorList$: Observable<Action> = this.actions$.pipe(
        ofType(adminActions.AdminActionTypes.LoadVendorList),
        mergeMap(() =>
            this.adminService.getVendorList().pipe(
                map((vendorlist: VendorList[]) => (new adminActions.LoadVendorListSuccess(vendorlist))),
                catchError(err => {
                    of(new adminActions.LoadVendorListFail(err));
                    return EMPTY;
                })
            )
        ),
        take(1)
    );
    @Effect()
    loadMember$: Observable<Action> = this.actions$.pipe(
        ofType(adminActions.AdminActionTypes.LoadMember),
        map((action: adminActions.LoadMember) => action.payload),
        mergeMap((id: number) =>
            this.adminService.getMember(id).pipe(
                map((member: Member) => (new adminActions.LoadMemberSuccess(member))),
                catchError(err => {
                    this.companyService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new adminActions.LoadMemberFail(err));
                })
            )
        )
    );

    // @Effect()
    // deleteVendorAttachments$: Observable<Action> = this.actions$.pipe(
    //     ofType(companyActions.CompanyAttachmentActionTypes.DeleteVendorAttachment),
    //     map((action: companyActions.DeleteVendorAttachment) => action.payload),
    //     mergeMap((vendorattachmentid: number) =>
    //         this.companyService.deleteVendorAttachment(vendorattachmentid).pipe(
    //             map(() => {
    //                 const message = `${vendorattachmentid} was deleted`
    //                 this.companyService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: message });
    //                 return (new companyActions.DeleteVendorAttachmentSuccess(vendorattachmentid));
    //             }),
    //             catchError(err => {
    //                 this.companyService.sendNotification({ type: 'error', title: 'Error', content: err });
    //                 return of(new companyActions.DeleteVendorAttachmentFail(err));
    //             })
    //         )
    //     )
    // );
    @Effect()
    editMember$: Observable<Action> = this.actions$.pipe(
        ofType(adminActions.AdminActionTypes.EditMember),
        map((action: adminActions.EditMember) => action.payload),
        mergeMap((payload: Member) =>
            this.adminService.editMember(payload).pipe(
                map((member: Member) => {
                    this.adminService.replaceMember(member.MemberID, member);
                    this.adminService.sendNotification({ type: 'success', title: 'Successfully Created', content: `${member.Email} was saved` });
                    window.location.reload();
                    this.router.navigate(['/admin']);
                    return (new adminActions.EditMemberSuccess(member));
                }),
                catchError(err => {
                    this.adminService.sendNotification({ type: 'error', title: 'Error', content: err });
                    this.router.navigate(['/admin']);
                    return of(new adminActions.EditMemberFail(err));
                })
            )
        )
    );
    @Effect()
    addMember$: Observable<Action | unknown> = this.actions$.pipe(
        ofType(adminActions.AdminActionTypes.AddMember),
        map((action: adminActions.AddMember) => action.payload),
        mergeMap((payload) =>
            this.adminService.addMember(payload).pipe(
                map((member: Member) => {
                    const message = `${member.Email} was saved`;
                    this.adminService.sendNotification({ type: 'success', title: 'Successfully Created', content: message });
                    this.router.navigate(['/admin']);
                    return (new adminActions.AddMemberSuccess(member));
                }),
                catchError(err => {
                    this.companyService.sendNotification({ type: 'error', title: 'Error', content: err });
                    this.router.navigate(['/admin']);
                    return of(new adminActions.AddMemberFail(err));
                })
            )
        )
    );
    // @Effect()
    // uploadUpdateVendorAttachments$: Observable<Action> = this.actions$.pipe(
    //     ofType(companyActions.CompanyAttachmentActionTypes.UploadUpdateVendorAttachment),
    //     map((action: companyActions.UploadUpdateVendorAttachment) => action.payload),
    //     mergeMap((payload) =>
    //         this.companyService.uploadUpdateAttachment(payload.id, payload.form).pipe(
    //             map((vendorattachment: VendorAttachment) => {
    //                 vendorattachment.Title = payload.title;
    //                 vendorattachment.Exclude = payload.exclude;
    //                 this.store.dispatch(new companyActions.EditVendorAttachment(vendorattachment));
    //                 return (new companyActions.UploadVendorAttachmentSuccess(vendorattachment));
    //             }),
    //             catchError(err => {
    //                 this.companyService.sendNotification({ type: 'error', title: 'Error', content: err });
    //                 return of(new companyActions.UploadVendorAttachmentFail(err));
    //             })
    //         )
    //     )
    // );


}
