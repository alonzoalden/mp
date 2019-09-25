import { Routes, RouterModule } from '@angular/router';
import { InboundShipmentComponent } from './inbound-shipment.component';
import { InboundShipmentListShellComponent } from './inbound-shipment-list/containers/inbound-shipment-list-shell.component';
import { InboundShipmentEditShellComponent } from './inbound-shipment-edit/containers/inbound-shipment-edit-shell.component';
import { InboundShipmentEditLineListShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-line-list/containers/inbound-shipment-edit-line-list-shell.component';
import { InboundShipmentEditCartonShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/containers/inbound-shipment-edit-carton-shell.component';
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
                {
                    path: 'carton/list/line',
                    component: InboundShipmentEditCartonShellComponent,
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
        }]
    }
];
export const inboundshipmentRouting = RouterModule.forChild(INBOUNDSHIPMENT_ROUTES);