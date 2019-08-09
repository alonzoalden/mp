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
import { CompanyAttachmentComponent } from './company-attachment/company-attachment.component';
import { CompanyAttachmentListComponent } from './company-attachment/company-attachment-list.component';
import { CompanyAttachmentAddComponent } from './company-attachment/company-attachment-add.component';
import { CompanyAttachmentEditComponent } from './company-attachment/company-attachment-edit.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { CompanyInfoDescriptionComponent } from './company-info/company-info-description.component';
import { CompanyInfoTrademarkRegistrationComponent } from './company-info/company-info-trademark-registration.component';
import { CompanyInfoBrandComponent } from './company-info/company-info-brand.component';
import { TranslateModule } from '@ngx-translate/core';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/company.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ItemVariationEffects } from './state/company.effects';

@NgModule({
    declarations: [
        CompanyComponent,
        CompanyAttachmentComponent,
        CompanyAttachmentListComponent,
        CompanyAttachmentAddComponent,
        CompanyAttachmentEditComponent,
        CompanyInfoComponent,
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
        StoreModule.forFeature('Company', reducer),
        EffectsModule.forFeature([ItemVariationEffects])
    ],
    providers: [
        CompanyService
    ]
})

export class CompanyModule { }
