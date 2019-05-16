import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatSortModule, MatCheckboxModule, MatTooltipModule, MatMenuModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

import { ToolModule } from '../shared/tool/tool.module';

import { MemberComponent } from './member.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberInviteComponent } from './member-invite/member-invite.component';
import { MemberConfirmComponent } from './member-confirm/member-confirm.component';
import { MemberRegistrationComponent } from './member-registration/member-registration.component';

import { memberRouting } from './member.routing';

import { MemberService } from './member.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        MemberComponent,
        MemberListComponent,
        MemberConfirmComponent,
        MemberInviteComponent,
        MemberRegistrationComponent
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
        MatMenuModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        ToolModule,
        MatTooltipModule,
        memberRouting
    ],
    providers: [
        MemberService
    ]
})

export class MemberModule { }
