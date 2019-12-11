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
    MatButtonModule, MatCheckboxModule,
    MatDialogModule, MatIconModule, MatListModule,
    MatPaginatorModule, MatSidenavModule,
    MatTableModule,
    MatTooltipModule, MatTreeModule
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
import { TreeModule } from 'angular-tree-component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { UsermanegementMembertreeBottomsheet } from './component/usermanagement-membertree/usermanegement-membertree-bottomsheet';


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
        UsermanegementMembertreeBottomsheet
    ],
    entryComponents: [
        UsermanagementMemberVendorDialogComponent,
        UsermanegementMembertreeBottomsheet
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
        MatListModule,
        TreeModule,
        MatTreeModule,
        MatIconModule,
        DragDropModule,
        MatBottomSheetModule,
        MatCheckboxModule
    ],
    providers: [
        UserManagementService
    ]
})
export class UserManagementModule {
}
