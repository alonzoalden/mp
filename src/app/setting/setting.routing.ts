import { Routes, RouterModule } from '@angular/router';

import { SettingShellComponent } from './containers/setting-shell/setting-shell.component';
import { SettingVendorListShellComponent } from './containers/setting-vendor-list-shell/setting-vendor-list-shell.component';
import { SettingMemberPreferenceShellComponent } from './containers/setting-member-preference-shell/setting-member-preference-shell.component';
import { SettingMerchantAgreementShellComponent } from './containers/setting-merchant-agreement-shell/setting-merchant-agreement-shell.component';

const SETTING_ROUTES: Routes = [
    {
        path: '',
        component: SettingShellComponent,
        children: [ {
            path: '',
            component: SettingVendorListShellComponent
        },
        {
            path: 'memberpreference',
            component: SettingMemberPreferenceShellComponent
        },
        {
            path: 'merchantagreement',
            component: SettingMerchantAgreementShellComponent
        } ]
    }
];

export const settingRouting = RouterModule.forChild(SETTING_ROUTES);