import { Routes, RouterModule } from '@angular/router';

import { CompanyComponent } from './company.component';
import { CompanyAttachmentShellComponent } from './company-attachment/containers/company-attachment-shell/company-attachment-shell.component';
import { CompanyAttachmentListShellComponent } from './company-attachment/containers/company-attachment-list-shell/company-attachment-list-shell.component';
import { CompanyAttachmentAddShellComponent } from './company-attachment/containers/company-attachment-add-shell/company-attachment-add-shell.component';
import { CompanyAttachmentEditShellComponent } from './company-attachment/containers/company-attachment-edit-shell/company-attachment-edit-shell.component';
import { CompanyInfoShellComponent } from './company-info/containers/company-info-shell/company-info-shell.component';
import { CompanyInfoBrandShellComponent } from './company-info/containers/company-info-brand-shell/company-info-brand-shell.component';
import { CompanyInfoDescriptionShellComponent } from './company-info/containers/company-info-description-shell/company-info-description-shell.component';
import { CompanyInfoTrademarkRegistrationShellComponent } from './company-info/containers/company-info-trademark-registration-shell/company-info-trademark-registration-shell.component';
const COMPANY_ROUTES: Routes = [
    {
        path: '',
        component: CompanyComponent,
        children: [ {
            path: 'attachment',
            component: CompanyAttachmentShellComponent,
            children: [ {
                path: '',
                component: CompanyAttachmentListShellComponent
            },
            {
                path: 'add',
                component: CompanyAttachmentAddShellComponent
            },
            {
                path: ':id/edit',
                component: CompanyAttachmentEditShellComponent
            } ]
        },
        {
            path: 'info',
            component: CompanyInfoShellComponent,
            children: [ {
                path: 'description',
                component: CompanyInfoDescriptionShellComponent
            },
            {
                path: 'brand',
                component: CompanyInfoBrandShellComponent
            },
            {
                path: 'trademark',
                component: CompanyInfoTrademarkRegistrationShellComponent
            }
        ]                
        } ]        
    }
];

export const companyRouting = RouterModule.forChild(COMPANY_ROUTES);
