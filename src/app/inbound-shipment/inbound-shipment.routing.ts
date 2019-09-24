import { Routes, RouterModule } from '@angular/router';


import { InboundShipmentComponent } from './inbound-shipment.component';


import { InboundShipmentListShellComponent } from './inbound-shipment-list/containers/inbound-shipment-list-shell.component';
import { InboundShipmentEditShellComponent } from './inbound-shipment-edit/containers/inbound-shipment-edit-shell.component';
//import { InboundShipmentEditLineShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-line/inbound-shipment-edit-line-shell.component';
import { InboundShipmentEditLineListShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-line-list/containers/inbound-shipment-edit-line-list-shell.component';
// import { InboundShipmentEditLineEditShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-line/inbound-shipment-edit-line-edit/containers/inbound-shipment-edit-line-edit-shell.component';
// import { InboundShipmentEditLineAddShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-line/inbound-shipment-edit-line-add/containers/inbound-shipment-edit-line-add-shell.component';
import { InboundShipmentEditCartonShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/containers/inbound-shipment-edit-carton-shell.component';
//import { InboundShipmentEditCartonListShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/components/inbound-shipment-edit-carton-list/containers/inbound-shipment-edit-carton-list-shell.component';
// import { InboundShipmentEditCartonAddShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/inbound-shipment-edit-carton-add/containers/inbound-shipment-edit-carton-add-shell.component';
// import { InboundShipmentEditCartonEditShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/inbound-shipment-edit-carton-edit/containers/inbound-shipment-edit-carton-edit-shell.component';
//import { InboundShipmentEditCartonLineListShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/components/inbound-shipment-edit-carton-line-list/containers/inbound-shipment-edit-carton-line-list-shell.component';
// import { InboundShipmentEditCartonLineEditShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/inbound-shipment-edit-carton-line-edit/containers/inbound-shipment-edit-carton-line-edit-shell.component';
// import { InboundShipmentEditCartonLineAddShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/inbound-shipment-edit-carton-line-add/containers/inbound-shipment-edit-carton-line-add-shell.component';
import { InboundShipmentEditShippingInstructionShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-shipping-instruction/containers/inbound-shipment-edit-shipping-instruction-shell.component';
import { InboundShipmentEditShippingShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-shipping/containers/inbound-shipment-edit-shipping-shell.component';

import { InboundShipmentEditGuard } from './inbound-shipment-edit/components/inbound-shipment-edit-guard';

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
                    redirectTo: 'line/list',
                    pathMatch: 'full'
                },
                {
                    path: 'line/list',
                    component: InboundShipmentEditLineListShellComponent,
                },
                // {
                //     path: 'line',
                //     component: InboundShipmentEditLineShellComponent,
                //     children: [ {
                //         path: '',
                //         redirectTo: 'list',
                //         pathMatch: 'full'
                //     },
                //     {
                //         path: 'list',
                //         component: InboundShipmentEditLineListShellComponent
                //     },
                //     // {
                //     //     path: 'list/:lid/edit',
                //     //     component: InboundShipmentEditLineEditShellComponent
                //     // },
                //     // {
                //     //     path: 'list/add',
                //     //     component: InboundShipmentEditLineAddShellComponent
                //     // }
                //     ],
                // },
                {
                    path: 'carton/list/line',
                    component: InboundShipmentEditCartonShellComponent,
                },
                // {
                //     path: 'carton',
                //     component: InboundShipmentEditCartonShellComponent,
                //     children: [ {
                //         path: '',
                //         redirectTo: 'list/line',
                //         pathMatch: 'full'
                //     },
                //     // {
                //     //     path: 'list/add',
                //     //     component: InboundShipmentEditCartonAddShellComponent
                //     // },
                //     // {
                //     //     path: 'list/:cid/edit',
                //     //     component: InboundShipmentEditCartonEditShellComponent
                //     // },
                //     {
                //         path: 'list/line',
                //         component: InboundShipmentEditCartonLineListShellComponent
                //     },
                //     // {
                //     //     path: 'list/line/:lid/edit',
                //     //     component: InboundShipmentEditCartonLineEditShellComponent
                //     // },
                //     // {
                //     //     path: 'list/line/add',
                //     //     component: InboundShipmentEditCartonLineAddShellComponent
                //     // }
                //     ],
                // },
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
