import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsermanagementShellComponent} from './container/usermanagement-shell/usermanagement-shell.component';
import {ToolModule} from '../../shared/tool/tool.module';
import {userManagementRouting} from './user-management.routing';
import {TranslateModule} from '@ngx-translate/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {UsermanagementReducer} from './state/usermanagement.reducer';
import {UsermanagementEffects} from './state/usermanagement.effects';
import {
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule
} from '@angular/material';
import {UsermanagementListComponent} from './component/usermanagement-list/usermanagement-list.component';
import {UserManagementComponent} from './user-management.component';
import {UserManagementService} from './user-management.service';
import {SharePipeModule} from '../../shared/pipe/share.pipe';
import {
    UserManagementListDialogComponent,
    UserManagementListDialogContentEditComponent,
    UserManagementListDialogContentViewComponent
} from './component/usermanagement-list/usermanagement-list-dialog.component';


@NgModule({
    declarations: [
        UsermanagementShellComponent,
        UsermanagementListComponent,
        UserManagementComponent,
        UserManagementListDialogComponent,
        UserManagementListDialogContentViewComponent,
        UserManagementListDialogContentEditComponent
    ],
    entryComponents: [
        UserManagementListDialogComponent
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
        MatTooltipModule
    ],
    providers: [
        UserManagementService
    ]
})
export class UserManagementModule {
}
