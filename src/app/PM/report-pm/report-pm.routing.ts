import {Routes, RouterModule} from '@angular/router';
import {ReportShellComponent} from './containers/report-shell/report-shell.component';
import {ReportItemContainerComponent} from './components/report-item/container/report-item-container.component';
import {ReportVendorContainerComponent} from './components/report-vendor/container/report-vendor-container.component';

const REPORT_ROUTES: Routes = [
    {
        path: '',
        component: ReportShellComponent,
        children: [
            {
                path: 'item', component: ReportItemContainerComponent
            },
            {
                path: 'vendor', component: ReportVendorContainerComponent
            }
        ]
    }
];

export const reportRouting = RouterModule.forChild(REPORT_ROUTES);
