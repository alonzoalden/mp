import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DashboardService } from '../dashboard.service';
import * as fromDashboard from './index';
import * as dashboardActions from './dashboard.actions';
import { VendorAttachment } from 'app/shared/class/vendor-attachment';
import { Router } from '@angular/router';
import { Member } from 'app/shared/class/member';
import { VendorList } from 'app/shared/class/vendor';

@Injectable()
export class DashboardEffects {
    
    constructor(
        private router: Router,
        private store: Store<fromDashboard.State>,
        private dashboardService: DashboardService,
        private actions$: Actions) { }


        
    // @Effect()
    // loadMembers$: Observable<Action> = this.actions$.pipe(
    //     ofType(dashboardActions.DashboardActionTypes.LoadMembers),
    //     mergeMap(() =>
    //         this.dashboardService.getMembers().pipe(
    //             map((members: Member[]) => (new dashboardActions.LoadMembersSuccess(members))),
    //             catchError(err => {
    //                 of(new dashboardActions.LoadMembersFail(err))
    //                 return EMPTY;
    //             })
    //         )
    //     ),
    //     take(1)
    // );
    // @Effect()
    // loadVendorList$: Observable<Action> = this.actions$.pipe(
    //     ofType(dashboardActions.DashboardActionTypes.LoadVendorList),
    //     mergeMap(() =>
    //         this.adminService.getVendorList().pipe(
    //             map((vendorlist: VendorList[]) => (new dashboardActions.LoadVendorListSuccess(vendorlist))),
    //             catchError(err => {
    //                 of(new dashboardActions.LoadVendorListFail(err))
    //                 return EMPTY;
    //             })
    //         )
    //     ),
    //     take(1)
    // );




    // @Effect()
    // loadMember$: Observable<Action> = this.actions$.pipe(
    //     ofType(dashboardActions.DashboardActionTypes.LoadMembers),
    //     map((action: dashboardActions.LoadMember) => action.payload),
    //     mergeMap((id: number) =>
    //         this.adminService.getMember(id).pipe(
    //             map((member: Member) => (new dashboardActions.LoadMemberSuccess(member))),
    //             catchError(err => {
    //                 this.companyService.sendNotification({ type: 'error', title: 'Error', content: err });
    //                 return of(new dashboardActions.LoadMemberFail(err));
    //             })
    //         )
    //     )
    // );

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
    // @Effect()
    // editMember$: Observable<Action> = this.actions$.pipe(
    //     ofType(dashboardActions.AdminActionTypes.EditMember),
    //     map((action: dashboardActions.EditMember) => action.payload),
    //     mergeMap((payload: Member) =>
    //         this.adminService.editMember(payload).pipe(
    //             map((member: Member) => {
    //                 this.adminService.replaceMember(member.MemberID, member);
    //                 this.adminService.sendNotification({ type: 'success', title: 'Successfully Created', content: `${member.Email} was saved` });
    //                 window.location.reload();
    //                 this.router.navigate(['/admin']);
    //                 return (new dashboardActions.EditMemberSuccess(member));
    //             }),
    //             catchError(err => {
    //                 this.adminService.sendNotification({ type: 'error', title: 'Error', content: err });
    //                 this.router.navigate(['/admin']);
    //                 return of(new dashboardActions.EditMemberFail(err));
    //             })
    //         )
    //     )
    // );
    // @Effect()
    // addMember$: Observable<Action | unknown> = this.actions$.pipe(
    //     ofType(dashboardActions.AdminActionTypes.AddMember),
    //     map((action: dashboardActions.AddMember) => action.payload),
    //     mergeMap((payload) =>
    //         this.adminService.addMember(payload).pipe(
    //             map((member: Member) => {
    //                 const message = `${member.Email} was saved`;
    //                 this.adminService.sendNotification({ type: 'success', title: 'Successfully Created', content: message });
    //                 this.router.navigate(['/admin']);
    //                 return (new dashboardActions.AddMemberSuccess(member));
    //             }),
    //             catchError(err => {
    //                 this.companyService.sendNotification({ type: 'error', title: 'Error', content: err });
    //                 this.router.navigate(['/admin']);
    //                 return of(new dashboardActions.AddMemberFail(err));
    //             })
    //         )
    //     )
    // );
}
