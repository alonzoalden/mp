import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatSortModule, MatTooltipModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToolModule } from '../../shared/tool/tool.module';
import { TranslateModule } from '@ngx-translate/core';
import { AdminShellComponent } from './containers/admin-shell/admin-shell.component';
import { AdminMemberAddShellComponent } from './containers/admin-member-add-shell/admin-member-add-shell.component';
import { AdminMemberEditShellComponent } from './containers/admin-member-edit-shell/admin-member-edit-shell.component';
import { AdminMemberListShellComponent } from './containers/admin-member-list-shell/admin-member-list-shell.component';
import { AdminMemberListComponent } from './components/admin-member-list/admin-member-list.component';
import { AdminMemberAddComponent } from './components/admin-member-add/admin-member-add.component';
import { AdminMemberEditComponent } from './components/admin-member-edit/admin-member-edit.component';
import { adminRouting } from './admin.routing';
import { AdminService } from './admin.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { adminReducer } from './state/admin.reducer';
import { AdminEffects } from './state/admin.effects';

@NgModule({
    declarations: [
        AdminShellComponent,
        AdminMemberAddShellComponent,
        AdminMemberEditShellComponent,
        AdminMemberListShellComponent,
        AdminMemberAddComponent,
        AdminMemberEditComponent,
        AdminMemberListComponent,
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
        MatTooltipModule,
        ToolModule,
        adminRouting,
        NgSelectModule,
        StoreModule.forFeature('Admin', adminReducer),
        EffectsModule.forFeature([AdminEffects])
    ],
    providers: [
        AdminService
    ]
})

export class AdminModule { }
