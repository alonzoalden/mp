import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolModule} from '../../shared/tool/tool.module';
import {userManagementRouting} from './user-management.routing';
import {TranslateModule} from '@ngx-translate/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {UsermanagementReducer} from './state/usermanagement.reducer';
import {UsermanagementEffects} from './state/usermanagement.effects';
import {
    MatButtonModule,
    MatDialogModule, MatListModule,
    MatPaginatorModule, MatSidenavModule,
    MatTableModule,
    MatTooltipModule
} from '@angular/material';
import {UsermanagementMemberShellComponent} from './container/usermanagement-member-shell/usermanagement-member-shell.component';
import {UsermanagementMemberVendorComponent} from './component/usermanagement-member-list/usermanagement-membervendor.component';
import {UserManagementComponent} from './user-management.component';
import {UserManagementService} from './user-management.service';
import {SharePipeModule} from '../../shared/pipe/share.pipe';
import {
    UsermanagementMemberVendorDialogComponent,
    UserManagementMemberVendorDialogContentEditComponent,
    UserManagementMemberVendorDialogContentViewComponent
} from './component/usermanagement-member-list/usermanagement-membervendor-dialog.component';


@NgModule({
    declarations: [
        UsermanagementMemberShellComponent,
        UsermanagementMemberVendorComponent,
        UserManagementComponent,
        UsermanagementMemberVendorDialogComponent,
        UserManagementMemberVendorDialogContentEditComponent,
        UserManagementMemberVendorDialogContentViewComponent,
    ],
    entryComponents: [
        UsermanagementMemberVendorDialogComponent
    ],
    imports: [
        CommonModule,
        ToolModule,
        userManagementRouting,
        TranslateModule,
        StoreModule.forFeature('user-management', UsermanagementReducer),
        EffectsModule.forFeature([UsermanagementEffects]),
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        SharePipeModule,
        MatDialogModule,
        MatTooltipModule,
        MatSidenavModule,
        MatListModule
    ],
    providers: [
        UserManagementService
    ]
})
export class UserManagementModule {
}
