import {RouterModule, Routes} from '@angular/router';
import {PayoutShellComponent} from './containers/payout-shell/payout-shell.component';
import {PayoutListContainerComponent} from './components/payout-list/container/payout-list-container.component';

const REPORT_ROUTES: Routes = [
    {
        path: '',
        component: PayoutShellComponent,
        children: [
            {
                path: 'list', component: PayoutListContainerComponent
            }
        ]
    }
];

export const PayoutRouting = RouterModule.forChild(REPORT_ROUTES);
