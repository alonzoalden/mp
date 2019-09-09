import { Routes, RouterModule } from '@angular/router';


import { InboundShipmentComponent } from './inbound-shipment.component';


import { InboundShipmentListComponent } from './containers/inbound-shipment-list-shell/inbound-shipment-list-shell.component';
import { InboundShipmentEditComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-shell/inbound-shipment-edit-shell.component';
import { InboundShipmentEditLineComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-line-shell/inbound-shipment-edit-line-shell.component';
import { InboundShipmentEditLineListComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-line-list-shell/inbound-shipment-edit-line-list-shell.component';
import { InboundShipmentEditLineEditComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-line-edit-shell/inbound-shipment-edit-line-edit-shell.component';
import { InboundShipmentEditLineAddComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-line-add-shell/inbound-shipment-edit-line-add-shell.component';
import { InboundShipmentEditCartonComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-carton-shell/inbound-shipment-edit-carton-shell.component';
import { InboundShipmentEditCartonListComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-carton-list-shell/inbound-shipment-edit-carton-list-shell.component';
import { InboundShipmentEditCartonAddComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-carton-add-shell/inbound-shipment-edit-carton-add-shell.component';
import { InboundShipmentEditCartonEditComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-carton-edit-shell/inbound-shipment-edit-carton-edit-shell.component';
import { InboundShipmentEditCartonLineListComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-carton-line-list-shell/inbound-shipment-edit-carton-line-list-shell.component';
import { InboundShipmentEditCartonLineEditComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-carton-line-edit-shell/inbound-shipment-edit-carton-line-edit-shell.component';
import { InboundShipmentEditCartonLineAddComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-carton-line-add-shell/inbound-shipment-edit-carton-line-add-shell.component';
import { InboundShipmentEditShippingInstructionComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-shipping-instruction-shell/inbound-shipment-edit-shipping-instruction-shell.component';
import { InboundShipmentEditShippingComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-shipping-shell/inbound-shipment-edit-shipping-shell.component';

import { InboundShipmentEditGuard } from './components/inbound-shipment-edit/inbound-shipment-edit-guard';

const INBOUNDSHIPMENT_ROUTES: Routes = [
    {
        path: '',
        component: InboundShipmentComponent,
        children: [{
            path: '',
            component: InboundShipmentListComponent
        },
        {
            path: ':id/edit',
            component: InboundShipmentEditComponent,
            canDeactivate: [InboundShipmentEditGuard],
            children: [
                {
                    path: '',
                    redirectTo: 'line',
                    pathMatch: 'full'
                },
                {
                    path: 'line',
                    component: InboundShipmentEditLineComponent,
                    children: [ {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full'
                    },
                    {
                        path: 'list',
                        component: InboundShipmentEditLineListComponent
                    },
                    {
                        path: 'list/:lid/edit',
                        component: InboundShipmentEditLineEditComponent
                    },
                    {
                        path: 'list/add',
                        component: InboundShipmentEditLineAddComponent
                    }
                    ],
                },
                {
                    path: 'carton',
                    component: InboundShipmentEditCartonComponent,
                    children: [ {
                        path: '',
                        redirectTo: 'list/line',
                        pathMatch: 'full'
                    },
                    {
                        path: 'list/add',
                        component: InboundShipmentEditCartonAddComponent
                    },
                    {
                        path: 'list/:cid/edit',
                        component: InboundShipmentEditCartonEditComponent
                    },
                    {
                        path: 'list/line',
                        component: InboundShipmentEditCartonLineListComponent
                    },
                    {
                        path: 'list/line/:lid/edit',
                        component: InboundShipmentEditCartonLineEditComponent
                    },
                    {
                        path: 'list/line/add',
                        component: InboundShipmentEditCartonLineAddComponent
                    }
                    ],
                },
                {
                    path: 'shippinginstruction',
                    component: InboundShipmentEditShippingInstructionComponent
                },
                {
                    path: 'shipping',
                    component: InboundShipmentEditShippingComponent
                }
            ]
        }
        ]
    }
];

export const inboundshipmentRouting = RouterModule.forChild(INBOUNDSHIPMENT_ROUTES);
