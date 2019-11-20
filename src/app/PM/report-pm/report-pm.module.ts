import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportShellComponent} from './containers/report-shell/report-shell.component';
import {
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule, MatSortModule, MatToolbarModule
} from '@angular/material';
import {reportRouting} from './report-pm.routing';
import {ToolModule} from '../../shared/tool/tool.module';
import {ReportItemComponent} from './components/report-item/component/report-item.component';
import {ReportVendorComponent} from './components/report-vendor/component/report-vendor.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgSelectModule} from '@ng-select/ng-select';
import {ReportItemContainerComponent} from './components/report-item/container/report-item-container.component';
import {ReportVendorContainerComponent} from './components/report-vendor/container/report-vendor-container.component';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ReportEffects} from './state/report.effects';
import {ReportPmService} from './report-pm.service';
import {ReportReducer} from './state/report.reducer';
import {CdkTableModule} from '@angular/cdk/table';


@NgModule({
    declarations: [
        ReportShellComponent,
        ReportItemComponent,
        ReportVendorComponent,
        ReportItemContainerComponent,
        ReportVendorContainerComponent
    ],
    imports: [
        reportRouting,
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
        StoreModule.forFeature('report', ReportReducer),
        EffectsModule.forFeature([ReportEffects]),
    ],
    providers: [
        ReportPmService
    ]
})
export class ReportPmModule {
}
