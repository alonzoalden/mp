import { Routes, RouterModule } from '@angular/router';

import { SettingComponent } from './setting.component';
import { SettingVendorListComponent } from './setting-vendor-list/setting-vendor-list.component';
import { SettingMemberPreferenceComponent } from './setting-member-preference/setting-member-preference.component';

import { AuthGuard } from '../auth/auth.guard';
import { componentFactoryName } from '@angular/compiler';


const SETTING_ROUTES: Routes = [
    {
        path: '',
        component: SettingComponent,
        children: [ {
            path: '',
            component: SettingVendorListComponent
        },
        {
            path: 'memberpreference',
            component: SettingMemberPreferenceComponent
        } ]
    }
];

export const settingRouting = RouterModule.forChild(SETTING_ROUTES);
