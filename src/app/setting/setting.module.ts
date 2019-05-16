import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatSortModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

import { ToolModule } from '../shared/tool/tool.module';

import { SettingComponent } from './setting.component';
import { SettingVendorListComponent } from './setting-vendor-list/setting-vendor-list.component';
import { SettingMemberPreferenceComponent } from './setting-member-preference/setting-member-preference.component';

import { settingRouting } from './setting.routing';

import { SettingService } from './setting.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        SettingComponent,
        SettingVendorListComponent,
        SettingMemberPreferenceComponent
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
        ToolModule,
        settingRouting
    ],
    providers: [
        SettingService
    ]
})

export class SettingModule { }
