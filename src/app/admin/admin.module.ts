import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatSortModule, MatTooltipModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToolModule } from '../shared/tool/tool.module';

import { AdminComponent } from './admin.component';
import { AdminMemberListComponent } from './admin-member-list/admin-member-list.component';
import { AdminMemberAddComponent } from './admin-member-add/admin-member-add.component';
import { AdminMemberEditComponent } from './admin-member-edit/admin-member-edit.component';

import { adminRouting } from './admin.routing';

import { AdminService } from './admin.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        AdminComponent,
        AdminMemberListComponent,
        AdminMemberAddComponent,
        AdminMemberEditComponent
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
        NgSelectModule
    ],
    providers: [
        AdminService
    ]
})

export class AdminModule { }
