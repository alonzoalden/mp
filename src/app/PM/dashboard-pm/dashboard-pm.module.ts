import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatSortModule, MatExpansionModule, MatSidenavModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ToolModule } from '../../shared/tool/tool.module';
import { DashboardMainVendorNotificationComponent } from './components/dashboard-main/dashboard-main-vendor-notification/dashboard-main-vendor-notification.component';
import { DashboardMainItemSalesTotalListComponent } from './components/dashboard-main/dashboard-main-item-sales-total-list/dashboard-main-item-sales-total-list.component';
import { DashboardMainInboundShipmentStatusCountComponent } from './components/dashboard-main/dashboard-main-inbound-shipment-status-count/dashboard-main-inbound-shipment-status-count.component';
import { DashboardMainSalesStatusTotalComponent } from './components/dashboard-main/dashboard-main-sales-status-total/dashboard-main-sales-status-total.component';
import { DashboardMainCurrentSalesOrderSummaryComponent } from './components/dashboard-main/dashboard-main-current-sales-order-summary/dashboard-main-current-sales-order-summary.component';
import { DashboardMainSalesOrderSummaryComponent } from './components/dashboard-main/dashboard-main-sales-order-summary/dashboard-main-sales-order-summary.component';
import { DashboardMainNewsFeedComponent } from './components/dashboard-main/dashboard-main-news-feed/dashboard-main-news-feed.component';
import { DashboardMainShellComponent } from './containers/dashboard-main-shell/dashboard-main-shell.component';
import { dashboardRouting } from './dashboard.routing';
import { DashboardService } from './dashboard.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { dashboardReducer } from './state/dashboard.reducer';
import { DashboardEffects } from './state/dashboard.effects';

@NgModule({
    declarations: [
        DashboardMainShellComponent,
        DashboardMainItemSalesTotalListComponent,
        DashboardMainInboundShipmentStatusCountComponent,
        DashboardMainSalesStatusTotalComponent,
        DashboardMainCurrentSalesOrderSummaryComponent,
        DashboardMainSalesOrderSummaryComponent,
        DashboardMainNewsFeedComponent,
        DashboardMainVendorNotificationComponent
    ],
    imports: [
        TranslateModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        CdkTableModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatExpansionModule,
        MatSidenavModule,
        ToolModule,
        dashboardRouting,
        NgxChartsModule,
        StoreModule.forFeature('Dashboard-PM', dashboardReducer),
        EffectsModule.forFeature([DashboardEffects]),

    ],
    providers: [
        DashboardService
    ]
})

export class DashboardPMModule { }
