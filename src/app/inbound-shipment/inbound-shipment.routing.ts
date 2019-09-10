import { Routes, RouterModule } from '@angular/router';


import { InboundShipmentComponent } from './inbound-shipment.component';


import { InboundShipmentListShellComponent } from './containers/inbound-shipment-list-shell/inbound-shipment-list-shell.component';
import { InboundShipmentEditShellComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-shell/inbound-shipment-edit-shell.component';
import { InboundShipmentEditLineShellComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-line-shell/inbound-shipment-edit-line-shell.component';
import { InboundShipmentEditLineListShellComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-line-list-shell/inbound-shipment-edit-line-list-shell.component';
import { InboundShipmentEditLineEditShellComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-line-edit-shell/inbound-shipment-edit-line-edit-shell.component';
import { InboundShipmentEditLineAddShellComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-line-add-shell/inbound-shipment-edit-line-add-shell.component';
import { InboundShipmentEditCartonShellComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-carton-shell/inbound-shipment-edit-carton-shell.component';
import { InboundShipmentEditCartonListShellComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-carton-list-shell/inbound-shipment-edit-carton-list-shell.component';
import { InboundShipmentEditCartonAddShellComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-carton-add-shell/inbound-shipment-edit-carton-add-shell.component';
import { InboundShipmentEditCartonEditShellComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-carton-edit-shell/inbound-shipment-edit-carton-edit-shell.component';
import { InboundShipmentEditCartonLineListShellComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-carton-line-list-shell/inbound-shipment-edit-carton-line-list-shell.component';
import { InboundShipmentEditCartonLineEditShellComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-carton-line-edit-shell/inbound-shipment-edit-carton-line-edit-shell.component';
import { InboundShipmentEditCartonLineAddShellComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-carton-line-add-shell/inbound-shipment-edit-carton-line-add-shell.component';
import { InboundShipmentEditShippingInstructionShellComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-shipping-instruction-shell/inbound-shipment-edit-shipping-instruction-shell.component';
import { InboundShipmentEditShippingShellComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-shipping-shell/inbound-shipment-edit-shipping-shell.component';

import { InboundShipmentEditGuard } from './components/inbound-shipment-edit/inbound-shipment-edit-guard';

const INBOUNDSHIPMENT_ROUTES: Routes = [
    {
        path: '',
        component: InboundShipmentComponent,
        children: [{
            path: '',
            component: InboundShipmentListShellComponent
        },
        {
            path: ':id/edit',
            component: InboundShipmentEditShellComponent,
            canDeactivate: [InboundShipmentEditGuard],
            children: [
                {
                    path: '',
                    redirectTo: 'line',
                    pathMatch: 'full'
                },
                {
                    path: 'line',
                    component: InboundShipmentEditLineShellComponent,
                    children: [ {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full'
                    },
                    {
                        path: 'list',
                        component: InboundShipmentEditLineListShellComponent
                    },
                    {
                        path: 'list/:lid/edit',
                        component: InboundShipmentEditLineEditShellComponent
                    },
                    {
                        path: 'list/add',
                        component: InboundShipmentEditLineAddShellComponent
                    }
                    ],
                },
                {
                    path: 'carton',
                    component: InboundShipmentEditCartonShellComponent,
                    children: [ {
                        path: '',
                        redirectTo: 'list/line',
                        pathMatch: 'full'
                    },
                    {
                        path: 'list/add',
                        component: InboundShipmentEditCartonAddShellComponent
                    },
                    {
                        path: 'list/:cid/edit',
                        component: InboundShipmentEditCartonEditShellComponent
                    },
                    {
                        path: 'list/line',
                        component: InboundShipmentEditCartonLineListShellComponent
                    },
                    {
                        path: 'list/line/:lid/edit',
                        component: InboundShipmentEditCartonLineEditShellComponent
                    },
                    {
                        path: 'list/line/add',
                        component: InboundShipmentEditCartonLineAddShellComponent
                    }
                    ],
                },
                {
                    path: 'shippinginstruction',
                    component: InboundShipmentEditShippingInstructionShellComponent
                },
                {
                    path: 'shipping',
                    component: InboundShipmentEditShippingShellComponent
                }
            ]
        }
        ]
    }
];

export const inboundshipmentRouting = RouterModule.forChild(INBOUNDSHIPMENT_ROUTES);
