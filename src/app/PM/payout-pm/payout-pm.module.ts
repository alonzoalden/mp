import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {PayoutShellComponent} from './containers/payout-shell/payout-shell.component';
import {
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {PayoutRouting} from './payout-pm.routing';
import {ToolModule} from '../../shared/tool/tool.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {PayoutEffects} from './state/payout.effects';
import {PayoutPmService} from './payout-pm.service';
import {PayoutReducer} from './state/payout.reducer';
import {CdkTableModule} from '@angular/cdk/table';
import {PayoutListComponent} from './components/payout-list/component/payout-list.component';
import {PayoutListContainerComponent} from './components/payout-list/container/payout-list-container.component';
import {SharePipeModule} from '../../shared/pipe/share.pipe';
import {PayoutListDialogContentviewComponent} from './components/payout-list/component/payout-list-dialog-contentview.component';
import {PayoutListDialogContainerComponent} from './components/payout-list/container/payout-list-dialog-container.component';


@NgModule({
    declarations: [
        PayoutShellComponent,
        PayoutListComponent,
        PayoutListContainerComponent,
        PayoutListDialogContentviewComponent,
        PayoutListDialogContainerComponent
    ],
    entryComponents: [
        PayoutListDialogContainerComponent
    ],
    imports: [
        PayoutRouting,
        CommonModule,
        FormsModule,
        MatSidenavModule,
        MatListModule,
        MatTableModule,
        MatIconModule,
        ToolModule,
        TranslateModule,
        CdkTableModule,
        MatPaginatorModule,
        MatSortModule,
        NgSelectModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        StoreModule.forFeature('payout', PayoutReducer),
        EffectsModule.forFeature([PayoutEffects]),
        SharePipeModule,
        MatDialogModule,
        MatTooltipModule,
        MatCheckboxModule
    ],
    providers: [
        PayoutPmService,
        DatePipe
    ]
})
export class PayoutPmModule {
}
