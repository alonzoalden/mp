import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatSortModule, MatDialogModule, MatCheckboxModule, MatTooltipModule, MatMenuModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

import { ToolModule } from '../shared/tool/tool.module';

import { MemberComponent } from './member.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberInviteComponent } from './components/member-invite/member-invite.component';
import { MemberConfirmComponent } from './components/member-confirm/member-confirm.component';
import { MemberRegistrationComponent } from './components/member-registration/member-registration.component';
import { MerchantAgreementComponentDialog } from './components/member-registration/member-registration.component';

import { MemberListShellComponent } from './containers/member-list-shell/member-list-shell.component';
import { MemberInviteShellComponent } from './containers/member-invite-shell/member-invite-shell.component';
import { MemberConfirmShellComponent } from './containers/member-confirm-shell/member-confirm-shell.component';
import { MemberRegistrationShellComponent } from './containers/member-registration-shell/member-registration-shell.component';
//import { MerchantAgreementComponentShellDialog } from './containers/member-registration-shell/member-registration-shell.component';

import { memberRouting } from './member.routing';

import { MemberService } from './member.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        MemberComponent,
        MemberListComponent,
        MemberConfirmComponent,
        MemberInviteComponent,
        MemberRegistrationComponent,
        MerchantAgreementComponentDialog,
        MemberListShellComponent,
        MemberInviteShellComponent,
        MemberConfirmShellComponent,
        MemberRegistrationShellComponent
    ],
    entryComponents: [
        MerchantAgreementComponentDialog
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
        MatDialogModule,
        memberRouting
    ],
    providers: [
        MemberService
    ]
})

export class MemberModule { }
