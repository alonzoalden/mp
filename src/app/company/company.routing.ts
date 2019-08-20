import { Routes, RouterModule } from '@angular/router';

import { CompanyComponent } from './company.component';
import { CompanyInfoShellComponent } from './company-info/containers/company-info-shell/company-info-shell.component';
import { CompanyAttachmentShellComponent } from './company-attachment/containers/company-attachment-shell.component';
import { CompanyAttachmentListComponent } from './company-attachment/components/company-attachment-list/company-attachment-list.component';
import { CompanyAttachmentAddComponent } from './company-attachment/components/company-attachment-add/company-attachment-add.component';
import { CompanyAttachmentEditComponent } from './company-attachment/components/company-attachment-edit/company-attachment-edit.component';
import { CompanyInfoBrandComponent } from './company-info/components/company-info-brand/company-info-brand.component';
import { CompanyInfoDescriptionComponent } from './company-info/components/company-info-description/company-info-description.component';
import { CompanyInfoTrademarkRegistrationComponent } from './company-info/components/company-info-trademark-registration/company-info-trademark-registration.component';
const COMPANY_ROUTES: Routes = [
    {
        path: '',
        component: CompanyComponent,
        children: [ {
            path: 'attachment',
            component: CompanyAttachmentShellComponent,
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
            component: CompanyInfoShellComponent,
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
