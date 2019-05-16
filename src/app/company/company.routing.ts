import { Routes, RouterModule } from '@angular/router';
import { componentFactoryName } from '@angular/compiler';

import { CompanyComponent } from './company.component';
import { CompanyAttachmentComponent } from './company-attachment/company-attachment.component';
import { CompanyAttachmentListComponent } from './company-attachment/company-attachment-list.component';
import { CompanyAttachmentAddComponent } from './company-attachment/company-attachment-add.component';
import { CompanyAttachmentEditComponent } from './company-attachment/company-attachment-edit.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { CompanyInfoBrandComponent } from './company-info/company-info-brand.component';
import { CompanyInfoDescriptionComponent } from './company-info/company-info-description.component';
import { CompanyInfoTrademarkRegistrationComponent } from './company-info/company-info-trademark-registration.component';
const COMPANY_ROUTES: Routes = [
    {
        path: '',
        component: CompanyComponent,
        children: [ {
            path: 'attachment',
            component: CompanyAttachmentComponent,
            children: [ {
                path: '',
                component: CompanyAttachmentListComponent
            },
            {
                path: 'add',
                component: CompanyAttachmentAddComponent
            },
            {
                path: ':id/edit',
                component: CompanyAttachmentEditComponent
            } ]
        },
        {
            path: 'info',
            component: CompanyInfoComponent,
            children: [ {
                path: 'description',
                component: CompanyInfoDescriptionComponent
            },
            {
                path: 'brand',
                component: CompanyInfoBrandComponent
            },
            {
                path: 'trademark',
                component: CompanyInfoTrademarkRegistrationComponent
            }
        ]                
        } ]        
    }
];

export const companyRouting = RouterModule.forChild(COMPANY_ROUTES);
