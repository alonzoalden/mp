import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatDialogModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToolModule } from '../../shared/tool/tool.module';
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
import { CompanyFactoryTourShellComponent } from './company-b2b-info/container/company-factory-tour-shell/company-factory-tour-shell.component';
import { CompanyFactoryTourComponent } from './company-b2b-info/component/company-factory-tour/company-factory-tour.component';
import { CompanyB2bInfoShellComponent } from './company-b2b-info/container/company-b2b-info-shell/company-b2b-info-shell.component';
import { CompanyDevelopmentComponent } from './company-b2b-info/component/company-development/company-development.component';
import { CompanyDevelopmentShellComponent } from './company-b2b-info/container/company-development-shell/company-development-shell.component';
import { CompanyImageUploadComponent } from './company-b2b-info/component/company-image-upload/company-image-upload.component';
import { CompanyImageUploadShellComponent } from './company-b2b-info/container/company-image-upload-shell/company-image-upload-shell.component';
import { CompanyOMComponent } from './company-b2b-info/component/company-om/company-om.component';
import { CompanyOMShellComponent } from './company-b2b-info/container/company-om-shell/company-om-shell.component';
import { CompanyQCComponent } from './company-b2b-info/component/company-qc/company-qc.component';
import { CompanyQCShellComponent } from './company-b2b-info/container/company-qc-shell/company-qc-shell.component';
import { CompanyServiceShellComponent } from './company-b2b-info/container/company-service-shell/company-service-shell.component';
import { CompanyServiceComponent } from './company-b2b-info/component/company-service/company-service.component';
import { CompanyTradeShowShellComponent } from './company-b2b-info/container/company-trade-show-shell/company-trade-show-shell.component';
import { CompanyTradeShowComponent } from './company-b2b-info/component/company-trade-show/company-trade-show.component';
import { CompanyCertificateComponent } from './company-b2b-info/component/company-certificate/company-certificate.component';
import { CompanyCertificateShellComponent } from './company-b2b-info/container/company-certificate-shell/company-certificate-shell.component';
import { CompanyTradeShowAddDialogComponent } from './company-b2b-info/component/company-trade-show/company-trade-show-add-dialog.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { companyInfoReducer } from './company-info/state/company-info.reducer';
import { CompanyInfoEffects } from './company-info/state/company-info.effects';
import { CompanyAttachmentEffects } from './company-attachment/state/company-attachment.effects';
import { companyAttachmentReducer } from './company-attachment/state/company-attachment.reducer';
import { companyB2bReducer } from './company-b2b-info/state/company-b2b.reducer';
import { CompanyB2bEffects } from './company-b2b-info/state/company-b2b.effects';
import {SharePipeModule} from '../../shared/pipe/share.pipe';
import { CompanyContactComponent } from './company-b2b-info/component/company-contact/company-contact.component';
import { CompanyContactShellComponent } from './company-b2b-info/container/company-contact-shell/company-contact-shell.component';


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
        CompanyInfoTrademarkRegistrationComponent,
        CompanyFactoryTourComponent,
        CompanyFactoryTourShellComponent,
        CompanyB2bInfoShellComponent,
        CompanyDevelopmentComponent,
        CompanyDevelopmentShellComponent,
        CompanyImageUploadComponent,
        CompanyImageUploadShellComponent,
        CompanyOMComponent,
        CompanyOMShellComponent,
        CompanyQCComponent,
        CompanyQCShellComponent,
        CompanyServiceShellComponent,
        CompanyServiceComponent,
        CompanyCertificateComponent,
        CompanyCertificateShellComponent,
        CompanyTradeShowShellComponent,
        CompanyTradeShowComponent,
        CompanyTradeShowAddDialogComponent,
        CompanyContactComponent,
        CompanyContactShellComponent
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
        MatDialogModule,
        ToolModule,
        NgSelectModule,
        companyRouting,
        StoreModule.forFeature('CompanyInfo', companyInfoReducer),
        StoreModule.forFeature('CompanyAttachment', companyAttachmentReducer),
        StoreModule.forFeature('CompanyB2B', companyB2bReducer),
        EffectsModule.forFeature([CompanyInfoEffects]),
        EffectsModule.forFeature([CompanyAttachmentEffects]),
        EffectsModule.forFeature([CompanyB2bEffects]),
        SharePipeModule,
    ],
    providers: [
        CompanyService
    ],
    entryComponents: [
        CompanyTradeShowAddDialogComponent
    ]
})

export class CompanyModule { }
