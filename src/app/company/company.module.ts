import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatSortModule, MatMenuModule, MatButtonModule, MatCheckboxModule, MatTooltipModule, MatRadioModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToolModule } from '../shared/tool/tool.module';
import { CompanyComponent } from './company.component';
import { companyRouting } from './company.routing';
import { CompanyService } from './company.service';
import { CompanyAttachmentShellComponent } from './company-attachment/containers/company-attachment-shell/company-attachment-shell.component';
import { CompanyAttachmentAddShellComponent } from './company-attachment/containers/company-attachment-add-shell/company-attachment-add-shell.component';
import { CompanyAttachmentEditShellComponent } from './company-attachment/containers/company-attachment-edit-shell/company-attachment-edit-shell.component';
import { CompanyAttachmentListShellComponent } from './company-attachment/containers/company-attachment-list-shell/company-attachment-list-shell.component';
import { CompanyAttachmentAddComponent } from './company-attachment/components/company-attachment-add/company-attachment-add.component';
import { CompanyAttachmentEditComponent } from './company-attachment/components/company-attachment-edit/company-attachment-edit.component';
import { CompanyAttachmentListComponent } from './company-attachment/components/company-attachment-list/company-attachment-list.component';
import { CompanyInfoShellComponent } from './company-info/containers/company-info-shell/company-info-shell.component';
import { CompanyInfoBrandShellComponent } from './company-info/containers/company-info-brand-shell/company-info-brand-shell.component';
import { CompanyInfoDescriptionShellComponent } from './company-info/containers/company-info-description-shell/company-info-description-shell.component';
import { CompanyInfoTrademarkRegistrationShellComponent } from './company-info/containers/company-info-trademark-registration-shell/company-info-trademark-registration-shell.component';
import { CompanyInfoDescriptionComponent } from './company-info/components/company-info-description/company-info-description.component';
import { CompanyInfoTrademarkRegistrationComponent } from './company-info/components/company-info-trademark-registration/company-info-trademark-registration.component';
import { CompanyInfoBrandComponent } from './company-info/components/company-info-brand/company-info-brand.component';
import { TranslateModule } from '@ngx-translate/core';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { companyInfoReducer } from './company-info/state/company-info.reducer';
import { CompanyInfoEffects } from './company-info/state/company-info.effects';
import { CompanyAttachmentEffects } from './company-attachment/state/company-attachment.effects';
import { companyAttachmentReducer } from './company-attachment/state/company-attachment.reducer';


@NgModule({
    declarations: [
        CompanyComponent,
        CompanyAttachmentShellComponent,
        CompanyAttachmentAddShellComponent,
        CompanyAttachmentEditShellComponent,
        CompanyAttachmentListShellComponent,
        CompanyAttachmentAddComponent,
        CompanyAttachmentEditComponent,
        CompanyAttachmentListComponent,
        CompanyInfoShellComponent,
        CompanyInfoBrandShellComponent,
        CompanyInfoDescriptionShellComponent,
        CompanyInfoTrademarkRegistrationShellComponent,
        CompanyInfoDescriptionComponent,
        CompanyInfoBrandComponent,
        CompanyInfoTrademarkRegistrationComponent
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
        MatMenuModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatRadioModule,
        ToolModule,
        NgSelectModule,
        companyRouting,
        StoreModule.forFeature('CompanyInfo', companyInfoReducer),
        StoreModule.forFeature('CompanyAttachment', companyAttachmentReducer),
        EffectsModule.forFeature([CompanyInfoEffects]),
        EffectsModule.forFeature([CompanyAttachmentEffects]),
    ],
    providers: [
        CompanyService
    ]
})

export class CompanyModule { }
