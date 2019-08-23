import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatSortModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

import { ToolModule } from '../shared/tool/tool.module';

import { SettingShellComponent } from './containers/setting-shell/setting-shell.component';
import { SettingVendorListComponent } from './components/setting-vendor-list/setting-vendor-list.component';
import { SettingMemberPreferenceComponent } from './components/setting-member-preference/setting-member-preference.component';
import { SettingMerchantAgreementComponent } from './components/setting-merchant-agreement/setting-merchant-agreement.component';
import { SettingVendorListShellComponent } from './containers/setting-vendor-list-shell/setting-vendor-list-shell.component';
import { SettingMemberPreferenceShellComponent } from './containers/setting-member-preference-shell/setting-member-preference-shell.component';
import { SettingMerchantAgreementShellComponent } from './containers/setting-merchant-agreement-shell/setting-merchant-agreement-shell.component';

import { settingRouting } from './setting.routing';

import { SettingService } from './setting.service';
import { TranslateModule } from '@ngx-translate/core';
import { settingReducer } from './state/setting.reducer';
import { SettingEffects } from './state/setting.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
    declarations: [
        SettingShellComponent,
        SettingVendorListShellComponent,
        SettingMemberPreferenceShellComponent,
        SettingMerchantAgreementShellComponent,
        SettingVendorListComponent,
        SettingMemberPreferenceComponent,
        SettingMerchantAgreementComponent
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
        settingRouting,
        StoreModule.forFeature('Setting', settingReducer),
        EffectsModule.forFeature([SettingEffects])
    ],
    providers: [
        SettingService
    ]
})

export class SettingModule { }
