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
    MatBottomSheetModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatListModule, MatMenuModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTableModule,
    MatTooltipModule,
    MatTreeModule
} from '@angular/material';
import {UsermanagementMemberVendorShellComponent} from './container/usermanagement-membervendor-shell/usermanagement-membervendor-shell.component';
import {UsermanagementMemberVendorComponent} from './component/usermanagement-membervendor-list/usermanagement-membervendor.component';
import {UserManagementComponent} from './user-management.component';
import {UserManagementService} from './user-management.service';
import {SharePipeModule} from '../../shared/pipe/share.pipe';
import {
    UsermanagementMemberVendorDialogComponent,
    UserManagementMemberVendorDialogContentEditComponent,
    UserManagementMemberVendorDialogContentViewComponent
} from './component/usermanagement-membervendor-list/usermanagement-membervendor-dialog.component';
import {UsermanagementMembertreeShellComponent} from './container/usermanagement-membertree-shell/usermanagement-membertree-shell.component';
import {UsermanagementMembertreeComponent} from './component/usermanagement-membertree/usermanagement-membertree.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {UsermanegementMembertreeBottomsheet} from './component/usermanagement-membertree/usermanegement-membertree-bottomsheet';
import {UsermanagementCheckVendorListComponent} from './component/usermanagement-check-vendor-list/usermanagement-check-vendor-list.component';
import {UsermanagementCheckVendorListShellComponent} from './container/usermanagement-check-vendor-list-shell/usermanagement-check-vendor-list-shell.component';
import {FormsModule} from '@angular/forms';
import {UsermangementCheckVendorDetailComponent} from './component/usermangement-check-vendor-detail/usermangement-check-vendor-detail.component';
import {UsermanagementCheckVendorDetailShellComponent} from './container/usermanagement-check-vendor-detail-shell/usermanagement-check-vendor-detail-shell.component';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
    declarations: [
        UsermanagementMemberVendorShellComponent,
        UsermanagementMembertreeShellComponent,
        UsermanagementMemberVendorComponent,
        UserManagementComponent,
        UsermanagementMemberVendorDialogComponent,
        UserManagementMemberVendorDialogContentEditComponent,
        UserManagementMemberVendorDialogContentViewComponent,
        UsermanagementMembertreeComponent,
        UsermanegementMembertreeBottomsheet,
        UsermanagementCheckVendorListComponent,
        UsermanagementCheckVendorListShellComponent,
        UsermangementCheckVendorDetailComponent,
        UsermanagementCheckVendorDetailShellComponent
    ],
    entryComponents: [
        UsermanagementMemberVendorDialogComponent,
        UsermanegementMembertreeBottomsheet,
    ],
    imports: [
        CommonModule,
        ToolModule,
        userManagementRouting,
        FormsModule,
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
        MatListModule,
        MatTreeModule,
        MatIconModule,
        DragDropModule,
        MatBottomSheetModule,
        MatCheckboxModule,
        MatMenuModule,
        NgSelectModule
    ],
    providers: [
        UserManagementService
    ]
})
export class UserManagementModule {
}
