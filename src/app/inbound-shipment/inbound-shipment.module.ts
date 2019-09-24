import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatSortModule, MatDialogModule, MatSelectModule, MatMenuModule, MatToolbarModule, MatIconModule, MatListModule, MatTooltipModule } from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { CdkTableModule } from '@angular/cdk/table';
import { ToolModule } from '../shared/tool/tool.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { InboundShipmentComponent } from './inbound-shipment.component';
import { InboundShipmentListComponent } from './inbound-shipment-list/components/inbound-shipment-list.component';
import { InboundShipmentEditComponent, InboundShipmentEditComponentItemPrintDialog } from './inbound-shipment-edit/components/inbound-shipment-edit.component';
import { InboundShipmentEditLineListComponent, InboundShipmentEditLineComponentItemPrintDialog } from './inbound-shipment-edit/inbound-shipment-edit-line-list/components/inbound-shipment-edit-line-list.component';
import { InboundShipmentEditCartonListComponent, InboundShipmentEditCartonListComponentCartonPrintDialog, InboundShipmentEditCartonListComponentCartonLineDialog } from './inbound-shipment-edit/inbound-shipment-edit-carton/components/inbound-shipment-edit-carton-list/inbound-shipment-edit-carton-list.component';
import { InboundShipmentEditCartonLineListComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/components/inbound-shipment-edit-carton-line-list/inbound-shipment-edit-carton-line-list.component';
import { InboundShipmentEditShippingInstructionComponent, InboundShipmentEditShippingInstructionComponentCartonPrintDialog } from './inbound-shipment-edit/inbound-shipment-edit-shipping-instruction/components/inbound-shipment-edit-shipping-instruction.component';
import { InboundShipmentEditShippingComponent } from './inbound-shipment-edit/inbound-shipment-edit-shipping/components/inbound-shipment-edit-shipping.component';
import { InboundShipmentListShellComponent } from './inbound-shipment-list/containers/inbound-shipment-list-shell.component';
import { InboundShipmentEditShellComponent } from './inbound-shipment-edit/containers/inbound-shipment-edit-shell.component';
import { InboundShipmentEditLineListShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-line-list/containers/inbound-shipment-edit-line-list-shell.component';
import { InboundShipmentEditCartonShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/containers/inbound-shipment-edit-carton-shell.component';
import { InboundShipmentEditShippingInstructionShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-shipping-instruction/containers/inbound-shipment-edit-shipping-instruction-shell.component';
import { InboundShipmentEditShippingShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-shipping/containers/inbound-shipment-edit-shipping-shell.component';
import { inboundshipmentRouting } from './inbound-shipment.routing';
import { PurchaseOrderService } from './purchase-order.service';
import { InboundShipmentEditGuard } from './inbound-shipment-edit/components/inbound-shipment-edit-guard';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { inboundShipmentReducer } from './state/inbound-shipment.reducer';
import { InboundShipmentEffects } from './state/inbound-shipment.effects';
import { ItemService } from '../item/item.service';

@NgModule({
    declarations: [
        InboundShipmentComponent,
        InboundShipmentListComponent,
        InboundShipmentEditComponent,
        InboundShipmentEditLineListComponent,
        InboundShipmentEditCartonListComponent,
        InboundShipmentEditCartonLineListComponent,
        InboundShipmentEditShippingInstructionComponent,
        InboundShipmentEditShippingComponent,
        InboundShipmentEditComponentItemPrintDialog,
        InboundShipmentEditCartonListComponentCartonPrintDialog,
        InboundShipmentEditCartonListComponentCartonLineDialog,
        InboundShipmentEditLineComponentItemPrintDialog,        
        InboundShipmentEditShippingInstructionComponentCartonPrintDialog,
        InboundShipmentListShellComponent,
        InboundShipmentListShellComponent,
        InboundShipmentEditShellComponent,
        InboundShipmentEditLineListShellComponent,
        InboundShipmentEditCartonShellComponent,
        InboundShipmentEditShippingInstructionShellComponent,
        InboundShipmentEditShippingShellComponent,
    ],    
    entryComponents: [InboundShipmentEditCartonListComponent
        , InboundShipmentEditLineListComponent
        , InboundShipmentEditComponentItemPrintDialog
        , InboundShipmentEditCartonListComponentCartonPrintDialog
        , InboundShipmentEditCartonListComponentCartonLineDialog
        , InboundShipmentEditLineComponentItemPrintDialog
        , InboundShipmentEditShippingInstructionComponentCartonPrintDialog],
    imports: [
        TranslateModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        CdkTableModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatTooltipModule,
        ToolModule,
        inboundshipmentRouting,
        NgSelectModule,
        StoreModule.forFeature('InboundShipment', inboundShipmentReducer),
        EffectsModule.forFeature([InboundShipmentEffects])
    ],
    providers: [
        PurchaseOrderService,
        ItemService,
        InboundShipmentEditGuard,
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
    ]
})

export class InboundShipmentModule { }
