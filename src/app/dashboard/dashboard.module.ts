import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatSortModule, MatExpansionModule, MatSidenavModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

import { ToolModule } from '../shared/tool/tool.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardMainItemSalesTotalListComponent } from './dashboard-main/dashboard-main-item-sales-total-list.component';
import { DashboardMainInboundShipmentStatusCountComponent } from './dashboard-main/dashboard-main-inbound-shipmnet-status-count.component';
import { DashboardMainSalesStatusTotalComponent } from './dashboard-main/dashboard-main-sales-status-total.component';
import { DashboardMainCurrentSalesOrderSummaryComponent } from './dashboard-main/dashboard-main-current-sales-order-summary.component';
import { DashboardMainSalesOrderSummaryComponent } from './dashboard-main/dashboard-main-sales-order-summary.component';
import { DashboardMainNewsFeedComponent } from './dashboard-main/dashboard-main-news-feed.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { dashboardRouting } from './dashboard.routing';

import { DashboardService } from './dashboard.service';
import { TranslateModule } from '@ngx-translate/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
    declarations: [
        DashboardComponent,
        DashboardMainComponent,
        DashboardMainItemSalesTotalListComponent,
        DashboardMainInboundShipmentStatusCountComponent,
        DashboardMainSalesStatusTotalComponent,
        DashboardMainCurrentSalesOrderSummaryComponent,
        DashboardMainSalesOrderSummaryComponent,
        DashboardMainNewsFeedComponent
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
        NgxChartsModule
    ],
    providers: [
        DashboardService
    ]
})

export class DashboardModule { }
