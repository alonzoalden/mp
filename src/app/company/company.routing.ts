import { Routes, RouterModule } from '@angular/router';
import { componentFactoryName } from '@angular/compiler';

import { CompanyComponent } from './company.component';
//import { CompanyShellComponent } from './company-shell/company-shell.component';
import { CompanyInfoShellComponent } from './company-info/containers/company-info-shell/company-info-shell.component';
import { CompanyAttachmentShellComponent } from './company-attachment/containers/company-attachment-shell.component';
import { CompanyAttachmentListComponent } from './company-attachment/components/company-attachment-list.component';
import { CompanyAttachmentAddComponent } from './company-attachment/components/company-attachment-add.component';
import { CompanyAttachmentEditComponent } from './company-attachment/components/company-attachment-edit.component';
//import { CompanyInfoComponent } from './company-info/components/company-info.component';
import { CompanyInfoBrandComponent } from './company-info/components/company-info-brand.component';
import { CompanyInfoDescriptionComponent } from './company-info/components/company-info-description.component';
import { CompanyInfoTrademarkRegistrationComponent } from './company-info/components/company-info-trademark-registration.component';
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
