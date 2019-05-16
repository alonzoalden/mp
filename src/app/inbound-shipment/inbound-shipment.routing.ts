import { Routes, RouterModule } from '@angular/router';

import { InboundShipmentComponent } from './inbound-shipment.component';
import { InboundShipmentListComponent } from './inbound-shipment-list/inbound-shipment-list.component';
import { InboundShipmentEditComponent } from './inbound-shipment-edit/inbound-shipment-edit.component';
import { InboundShipmentEditLineComponent } from './inbound-shipment-edit/inbound-shipment-edit-line.component';
import { InboundShipmentEditLineListComponent } from './inbound-shipment-edit/inbound-shipment-edit-line-list.component';
import { InboundShipmentEditLineEditComponent } from './inbound-shipment-edit/inbound-shipment-edit-line-edit.component';
import { InboundShipmentEditLineAddComponent } from './inbound-shipment-edit/inbound-shipment-edit-line-add.component';
import { InboundShipmentEditCartonComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton.component';
import { InboundShipmentEditCartonListComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton-list.component';
import { InboundShipmentEditCartonAddComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton-add.component';
import { InboundShipmentEditCartonEditComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton-edit.component';
import { InboundShipmentEditCartonLineListComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton-line-list.component';
import { InboundShipmentEditCartonLineEditComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton-line-edit.component';
import { InboundShipmentEditCartonLineAddComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton-line-add.component';
import { InboundShipmentEditShippingInstructionComponent } from './inbound-shipment-edit/inbound-shipment-edit-shipping-instruction.component';
import { InboundShipmentEditShippingComponent } from './inbound-shipment-edit/inbound-shipment-edit-shipping.component';

import { InboundShipmentEditGuard } from './inbound-shipment-edit/inbound-shipment-edit-guard';

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
