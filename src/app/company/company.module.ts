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
import { CompanyInfoShellComponent } from './company-info/containers/company-info-shell/company-info-shell.component'
import { CompanyAttachmentShellComponent } from './company-attachment/containers/company-attachment-shell.component';
import { CompanyAttachmentListComponent } from './company-attachment/components/company-attachment-list/company-attachment-list.component';
import { CompanyAttachmentAddComponent } from './company-attachment/components/company-attachment-add/company-attachment-add.component';
import { CompanyAttachmentEditComponent } from './company-attachment/components/company-attachment-edit/company-attachment-edit.component';
import { CompanyInfoDescriptionComponent } from './company-info/components/company-info-description/company-info-description.component';
import { CompanyInfoTrademarkRegistrationComponent } from './company-info/components/company-info-trademark-registration/company-info-trademark-registration.component';
import { CompanyInfoBrandComponent } from './company-info/components/company-info-brand/company-info-brand.component';
import { TranslateModule } from '@ngx-translate/core';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { companyInfoReducer } from './company-info/state/company-info.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CompanyInfoEffects } from './company-info/state/company-info.effects';
import { CompanyAttachmentEffects } from './company-attachment/state/company-attachment.effects';
import { companyAttachmentReducer } from './company-attachment/state/company-attachment.reducer';


@NgModule({
    declarations: [
        CompanyComponent,
        CompanyAttachmentShellComponent,
        CompanyAttachmentListComponent,
        CompanyAttachmentAddComponent,
        CompanyAttachmentEditComponent,
        CompanyInfoShellComponent,
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
