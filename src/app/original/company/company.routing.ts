import {Routes, RouterModule} from '@angular/router';
import {CompanyComponent} from './company.component';
import {CompanyAttachmentShellComponent} from './company-attachment/containers/company-attachment-shell/company-attachment-shell.component';
import {CompanyAttachmentListShellComponent} from './company-attachment/containers/company-attachment-list-shell/company-attachment-list-shell.component';
import {CompanyAttachmentAddShellComponent} from './company-attachment/containers/company-attachment-add-shell/company-attachment-add-shell.component';
import {CompanyAttachmentEditShellComponent} from './company-attachment/containers/company-attachment-edit-shell/company-attachment-edit-shell.component';
import {CompanyInfoBrandShellComponent} from './company-info/containers/company-info-brand-shell/company-info-brand-shell.component';
import {CompanyInfoDescriptionShellComponent} from './company-info/containers/company-info-description-shell/company-info-description-shell.component';
import {CompanyInfoTrademarkRegistrationShellComponent} from './company-info/containers/company-info-trademark-registration-shell/company-info-trademark-registration-shell.component';
import {CompanyB2bInfoShellComponent} from './company-b2b-info/container/company-b2b-info-shell/company-b2b-info-shell.component';
import {CompanyFactoryTourShellComponent} from './company-b2b-info/container/company-factory-tour-shell/company-factory-tour-shell.component';
import {CompanyDevelopmentShellComponent} from './company-b2b-info/container/company-development-shell/company-development-shell.component';
import {CompanyOMShellComponent} from './company-b2b-info/container/company-om-shell/company-om-shell.component';
import {CompanyQCShellComponent} from './company-b2b-info/container/company-qc-shell/company-qc-shell.component';
import {CompanyServiceShellComponent} from './company-b2b-info/container/company-service-shell/company-service-shell.component';
import {CompanyCertificateShellComponent} from './company-b2b-info/container/company-certificate-shell/company-certificate-shell.component';
import {CompanyTradeShowShellComponent} from './company-b2b-info/container/company-trade-show-shell/company-trade-show-shell.component';
import {CompanyInfoShellComponent} from './company-info/containers/company-info-shell/company-info-shell.component';
import {CompanyContactShellComponent} from './company-b2b-info/container/company-contact-shell/company-contact-shell.component';

const COMPANY_ROUTES: Routes = [
    {
        path: '',
        component: CompanyComponent,
        children: [
            {
                path: 'attachment',
                component: CompanyAttachmentShellComponent,
                children: [{
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
                    }]
            },
            {
                path: 'info',
                component: CompanyInfoShellComponent,
                children: [
                    {
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
            },
            {
                path: 'b2b',
                component: CompanyB2bInfoShellComponent,
                children: [
                    {
                        path: 'tour',
                        component: CompanyFactoryTourShellComponent
                    },
                    {
                        path: 'development',
                        component: CompanyDevelopmentShellComponent
                    },
                    {
                        path: 'om',
                        component: CompanyOMShellComponent
                    },
                    {
                        path: 'qc',
                        component: CompanyQCShellComponent
                    },
                    {
                        path: 'service',
                        component: CompanyServiceShellComponent
                    },
                    {
                        path: 'certificate',
                        component: CompanyCertificateShellComponent
                    },
                    {
                        path: 'trade',
                        component: CompanyTradeShowShellComponent
                    },
                    {
                        path: 'contact',
                        component: CompanyContactShellComponent
                    }
                ]
            }
        ]
    }
];

export const companyRouting = RouterModule.forChild(COMPANY_ROUTES);
