import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import * as ReportActions from './report.actions';
import {ReportPmService} from '../report-pm.service';
import {ItemList} from '../../../shared/class/item';
import {Store} from '@ngrx/store';
import {ReportState} from './report.reducer';
import {InventoryReport} from '../../../shared/class/report';
import {Vendor} from '../../../shared/class/vendor';


@Injectable()
export class ReportEffects {
    constructor(
        private actions$: Actions,
        private reportPmService: ReportPmService,
        private store: Store<ReportState>
    ) {
    }

    @Effect() LoadItemList$ = this.actions$.pipe(
        ofType(ReportActions.ReportActionTypes.LoadItemListWithVendors),
        mergeMap(() => {
            return this.reportPmService.getItemsWithVendors().pipe(
                map((itemlist: ItemList[]) => new ReportActions.LoadItemListWithVendorsSuccess(itemlist)),
                catchError(err => {
                        this.reportPmService.sendNotification({type: 'error', title: 'Error', content: err});
                        return of(new ReportActions.LoadItemListWithVendorsFail(err));
                    }
                )
            );
        })
    );
    @Effect() LoadSubVendors$ = this.actions$.pipe(
        ofType(ReportActions.ReportActionTypes.LoadVendorList),
        mergeMap(() => {
            return this.reportPmService.getAllSubMemberVendors().pipe(
                map((vendorList: Vendor[]) => new ReportActions.LoadVendorListSuccess(vendorList)),
                catchError(err => {
                        this.reportPmService.sendNotification({type: 'error', title: 'Error', content: err});
                        return of(new ReportActions.LoadVendorListFail(err));
                    }
                )
            );
        })
    );
    @Effect() LoadItemReport$ = this.actions$.pipe(
        ofType(ReportActions.ReportActionTypes.LoadItemReport),
        map((action: ReportActions.LoadItemReport) => action.payload),
        mergeMap((item: ItemList) => {
                if (item) {
                    return this.reportPmService.getItemsReport(item).pipe(
                        map((itemReport: InventoryReport[]) => new ReportActions.LoadItemReportSuccess(itemReport)),
                        catchError(err => {
                                this.reportPmService.sendNotification({type: 'error', title: 'Error', content: err});
                                return of(new ReportActions.LoadItemReportFail(err));
                            }
                        )
                    );
                } else {
                    return of(new ReportActions.LoadItemReportSuccess(null));
                }
            }
        )
    );
}
