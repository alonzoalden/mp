import {Injectable} from '@angular/core';
import {Observable, of, EMPTY} from 'rxjs';
import {mergeMap, map, catchError, take} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {CompanyService} from '../../company.service';
import * as fromCompany from './index';
import * as companyActions from './company-b2b.actions';
import {Router} from '@angular/router';
import {
    VendorCertificate,
    VendorDevelopment,
    VendorFactoryTour,
    VendorImage,
    VendorOM,
    VendorQC,
    VendorService, VendorTradeShow
} from '../../../../shared/class/vendor-b2b';

@Injectable()
export class CompanyB2bEffects {
    [x: string]: any;

    constructor(
        private router: Router,
        private store: Store<fromCompany.State>,
        private companyService: CompanyService,
        private actions$: Actions) {
    }

    @Effect()
    loadVendorFactoryTour$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyB2BActionTypes.LoadVendorFactoryTour),
        mergeMap(() =>
            this.companyService.getVendorFactoryTour().pipe(
                map(vendorInfo => (new companyActions.LoadVendorFactoryTourSuccess(vendorInfo))),
                catchError(err => {
                    this.companyService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new companyActions.LoadVendorFactoryTourFail(err));
                })
            )
        )
    );

    @Effect()
    updateVendorFactoryTour$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyB2BActionTypes.UpdateVendorFactoryTour),
        map((action: companyActions.UpdateVendorFactoryTour) => action.payload),
        mergeMap((matvendorInfo: VendorFactoryTour) =>
            this.companyService.updateVendorFactoryTour(matvendorInfo).pipe(
                map(vendorInfo => {
                    this.companyService.sendNotification({
                        type: 'success',
                        title: 'Successfully Updated',
                        content: 'Factory Tour has been updated'
                    });
                    return (new companyActions.UpdateVendorFactoryTourSuccess(vendorInfo));
                }),
                catchError(err => {
                    this.companyService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new companyActions.UpdateVendorFactoryTourFail(err));
                })
            )
        )
    );

    @Effect()
    updateVendorFactoryTourSuccess$ = this.actions$.pipe(
        ofType(companyActions.CompanyB2BActionTypes.UpdateVendorFactoryTourSuccess),
        mergeMap(() => {
            return of(new companyActions.LoadVendorFactoryTour());
        })
    );

    @Effect()
    uploadVendorAttachments$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyB2BActionTypes.UploadVendorImage),
        map((action: companyActions.UploadVendorImage) => action.payload),
        mergeMap((payload: { form: FormData, title: string }) =>
            this.companyService.uploadVendorImage(payload.form).pipe(
                map((path: string) => {
                    const image = new VendorImage(null, payload.title, path);
                    this.companyService.sendUploadMessage(image);
                    this.companyService.sendNotification({
                        type: 'success',
                        title: 'Successfully Uploaded',
                        content: ''
                    });
                    return (new companyActions.UploadVendorImageSuccess(image));
                }),
                catchError(err => {
                    this.companyService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new companyActions.UploadVendorImageFail(err));
                })
            )
        )
    );

    @Effect()
    loadVendorDevelopment$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyB2BActionTypes.LoadVendorDevelopment),
        mergeMap(() =>
            this.companyService.getVendorDevelopment().pipe(
                map(vendorInfo => (new companyActions.LoadVendorDevelopmentSuccess(vendorInfo))),
                catchError(err => {
                    this.companyService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new companyActions.LoadVendorDevelopmentFail(err));
                })
            )
        )
    );

    @Effect()
    updateVendorDevelopment$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyB2BActionTypes.UpdateVendorDevelopment),
        map((action: companyActions.UpdateVendorDevelopment) => action.payload),
        mergeMap((vendorDevelopment: VendorDevelopment) =>
            this.companyService.updateVendorDevelopment(vendorDevelopment).pipe(
                map(vendorDevelopment => {
                    this.companyService.sendNotification({
                        type: 'success',
                        title: 'Successfully Updated',
                        content: 'Development has been updated'
                    });
                    this.store.dispatch(new companyActions.LoadVendorDevelopment());
                    return (new companyActions.UpdateVendorDevelopmentSuccess(vendorDevelopment));
                }),
                catchError(err => {
                    this.companyService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new companyActions.UpdateVendorDevelopmentFail(err));
                })
            )
        )
    );

    @Effect()
    loadVendorOM$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyB2BActionTypes.LoadVendorOM),
        mergeMap(() =>
            this.companyService.getVendorOM().pipe(
                map(vendorInfo => (new companyActions.LoadVendorOMSuccess(vendorInfo))),
                catchError(err => {
                    this.companyService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new companyActions.LoadVendorOMFail(err));
                })
            )
        )
    );

    @Effect()
    updateVendorOM$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyB2BActionTypes.UpdateVendorOM),
        map((action: companyActions.UpdateVendorOM) => action.payload),
        mergeMap((vendorOM: VendorOM) =>
            this.companyService.updateVendorOM(vendorOM).pipe(
                map(vendorOM => {
                    this.companyService.sendNotification({
                        type: 'success',
                        title: 'Successfully Updated',
                        content: 'OEM/ODM has been updated'
                    });
                    this.store.dispatch(new companyActions.LoadVendorOM());
                    return (new companyActions.UpdateVendorOMSuccess(vendorOM));
                }),
                catchError(err => {
                    this.companyService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new companyActions.UpdateVendorOMFail(err));
                })
            )
        )
    );

    @Effect()
    loadVendorQC$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyB2BActionTypes.LoadVendorQC),
        mergeMap(() =>
            this.companyService.getVendorQC().pipe(
                map(vendorInfo => (new companyActions.LoadVendorQCSuccess(vendorInfo))),
                catchError(err => {
                    this.companyService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new companyActions.LoadVendorQCFail(err));
                })
            )
        )
    );

    @Effect()
    updateVendorQC$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyB2BActionTypes.UpdateVendorQC),
        map((action: companyActions.UpdateVendorQC) => action.payload),
        mergeMap((vendorQC: VendorQC) =>
            this.companyService.updateVendorQC(vendorQC).pipe(
                map(vendorQC => {
                    this.companyService.sendNotification({
                        type: 'success',
                        title: 'Successfully Updated',
                        content: 'Quality Control has been updated'
                    });
                    this.store.dispatch(new companyActions.LoadVendorQC());
                    return (new companyActions.UpdateVendorQCSuccess(vendorQC));
                }),
                catchError(err => {
                    this.companyService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new companyActions.UpdateVendorQCFail(err));
                })
            )
        )
    );

    @Effect()
    loadVendorService$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyB2BActionTypes.LoadVendorService),
        mergeMap(() =>
            this.companyService.getVendorService().pipe(
                map(vendorInfo => (new companyActions.LoadVendorServiceSuccess(vendorInfo))),
                catchError(err => {
                    this.companyService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new companyActions.LoadVendorServiceFail(err));
                })
            )
        )
    );

    @Effect()
    updateVendorService$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyB2BActionTypes.UpdateVendorService),
        map((action: companyActions.UpdateVendorService) => action.payload),
        mergeMap((vendorService: VendorService) =>
            this.companyService.updateVendorService(vendorService).pipe(
                map(vendorService => {
                    this.companyService.sendNotification({
                        type: 'success',
                        title: 'Successfully Updated',
                        content: 'Service has been updated'
                    });
                    this.store.dispatch(new companyActions.LoadVendorService());
                    return (new companyActions.UpdateVendorServiceSuccess(vendorService));
                }),
                catchError(err => {
                    this.companyService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new companyActions.UpdateVendorServiceFail(err));
                })
            )
        )
    );

    @Effect()
    loadVendorCertificate$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyB2BActionTypes.LoadVendorCertificate),
        mergeMap(() =>
            this.companyService.getVendorCertificate().pipe(
                map(vendorInfo => (new companyActions.LoadVendorCertificateSuccess(vendorInfo))),
                catchError(err => {
                    this.companyService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new companyActions.LoadVendorCertificateFail(err));
                })
            )
        )
    );

    @Effect()
    updateVendorCertificate$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyB2BActionTypes.UpdateVendorCertificate),
        map((action: companyActions.UpdateVendorCertificate) => action.payload),
        mergeMap((vendorCertificate: VendorCertificate) =>
            this.companyService.updateVendorCertificate(vendorCertificate).pipe(
                map(vendorCertificate => {
                    this.companyService.sendNotification({
                        type: 'success',
                        title: 'Successfully Updated',
                        content: 'Certification has been updated'
                    });
                    this.store.dispatch(new companyActions.LoadVendorCertificate());
                    return (new companyActions.UpdateVendorCertificateSuccess(vendorCertificate));
                }),
                catchError(err => {
                    this.companyService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new companyActions.UpdateVendorCertificateFail(err));
                })
            )
        )
    );

    @Effect()
    loadVendorTradeShow$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyB2BActionTypes.LoadVendorTradeShow),
        mergeMap(() =>
            this.companyService.getVendorTradeShow().pipe(
                map(vendorInfo => (new companyActions.LoadVendorTradeShowSuccess(vendorInfo))),
                catchError(err => {
                    this.companyService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new companyActions.LoadVendorTradeShowFail(err));
                })
            )
        )
    );

    @Effect()
    updateVendorTradeShow$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyB2BActionTypes.UpdateVendorTradeShow),
        map((action: companyActions.UpdateVendorTradeShow) => action.payload),
        mergeMap((vendorTradeShow: VendorTradeShow) =>
            this.companyService.updateVendorTradeShow(vendorTradeShow).pipe(
                map(vendorTradeShow => {
                    this.companyService.sendNotification({
                        type: 'success',
                        title: 'Successfully Updated',
                        content: 'Trade Show has been updated'
                    });
                    this.store.dispatch(new companyActions.LoadVendorTradeShow());
                    return (new companyActions.UpdateVendorTradeShowSuccess(vendorTradeShow));
                }),
                catchError(err => {
                    this.companyService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new companyActions.UpdateVendorTradeShowFail(err));
                })
            )
        )
    );
    @Effect()
    deleteVendorTradeShow$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyB2BActionTypes.DeleteVendorTradeShow),
        map((action: companyActions.DeleteVendorTradeShow) => action.payload),
        mergeMap((vendorTradeShow: VendorTradeShow) =>
            this.companyService.deleteVendorTradeShow(vendorTradeShow).pipe(
                map(() => {
                    this.companyService.sendNotification({
                        type: 'success',
                        title: 'Successfully Deleted',
                        content: 'Trade Show has been Deleted'
                    });
                    this.store.dispatch(new companyActions.LoadVendorTradeShow());
                    return (new companyActions.DeleteVendorTradeShowSuccess());
                }),
                catchError(err => {
                    this.companyService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new companyActions.DeleteVendorTradeShowFail(err));
                })
            )
        )
    );

    @Effect()
    loadVendorContact$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyB2BActionTypes.LoadVendorContact),
        mergeMap(() =>
            this.companyService.getVendorContact().pipe(
                map(vendorInfo => (new companyActions.LoadVendorContactSuccess(vendorInfo))),
                catchError(err => {
                    this.companyService.sendNotification({type: 'error', title: 'Error', content: err});
                    return of(new companyActions.LoadVendorContactFail(err));
                })
            )
        )
    );
}
