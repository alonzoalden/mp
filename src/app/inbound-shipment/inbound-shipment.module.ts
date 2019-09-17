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
import { InboundShipmentEditComponent, InboundShipmentEditComponentItemPrintDialog } from './inbound-shipment-edit/inbound-shipment-edit.component';
import { InboundShipmentEditLineComponent } from './inbound-shipment-edit/inbound-shipment-edit-line/inbound-shipment-edit-line.component';
import { InboundShipmentEditLineListComponent, InboundShipmentEditLineComponentItemPrintDialog } from './inbound-shipment-edit/inbound-shipment-edit-line/inbound-shipment-edit-line-list/components/inbound-shipment-edit-line-list.component';
import { InboundShipmentEditLineEditComponent } from './inbound-shipment-edit/inbound-shipment-edit-line/inbound-shipment-edit-line-edit/components/inbound-shipment-edit-line-edit.component';
import { InboundShipmentEditLineAddComponent } from './inbound-shipment-edit/inbound-shipment-edit-line/inbound-shipment-edit-line-add/components/inbound-shipment-edit-line-add.component';
import { InboundShipmentEditCartonComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/inbound-shipment-edit-carton.component';
import { InboundShipmentEditCartonListComponent, InboundShipmentEditCartonListComponentCartonPrintDialog, InboundShipmentEditCartonListComponentCartonLineDialog } from './inbound-shipment-edit/inbound-shipment-edit-carton/inbound-shipment-edit-carton-list/components/inbound-shipment-edit-carton-list.component';
import { InboundShipmentEditCartonAddComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/inbound-shipment-edit-carton-add/components/inbound-shipment-edit-carton-add.component';
import { InboundShipmentEditCartonEditComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/inbound-shipment-edit-carton-edit/components/inbound-shipment-edit-carton-edit.component';
import { InboundShipmentEditCartonLineListComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/inbound-shipment-edit-carton-line-list/components/inbound-shipment-edit-carton-line-list.component';
import { InboundShipmentEditCartonLineAddComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/inbound-shipment-edit-carton-line-add/components/inbound-shipment-edit-carton-line-add.component';
import { InboundShipmentEditCartonLineEditComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/inbound-shipment-edit-carton-line-edit/components/inbound-shipment-edit-carton-line-edit.component';
import { InboundShipmentEditShippingInstructionComponent, InboundShipmentEditShippingInstructionComponentCartonPrintDialog } from './inbound-shipment-edit/inbound-shipment-edit-shipping-instruction/components/inbound-shipment-edit-shipping-instruction.component';
import { InboundShipmentEditShippingComponent } from './inbound-shipment-edit/inbound-shipment-edit-shipping/components/inbound-shipment-edit-shipping.component';
//import { InboundShipmentSelectItemComponentDialog } from './components/inbound-shipment-edit/inbound-shipment-edit-


import { InboundShipmentListShellComponent } from './inbound-shipment-list/containers/inbound-shipment-list-shell.component';
import { InboundShipmentEditShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-shell.component';
import { InboundShipmentEditLineShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-line/inbound-shipment-edit-line-shell.component';
import { InboundShipmentEditLineListShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-line/inbound-shipment-edit-line-list/containers/inbound-shipment-edit-line-list-shell.component';
import { InboundShipmentEditLineEditShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-line/inbound-shipment-edit-line-edit/containers/inbound-shipment-edit-line-edit-shell.component';
import { InboundShipmentEditLineAddShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-line/inbound-shipment-edit-line-add/containers/inbound-shipment-edit-line-add-shell.component';
import { InboundShipmentEditCartonShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/inbound-shipment-edit-carton-shell.component';
import { InboundShipmentEditCartonListShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/inbound-shipment-edit-carton-list/containers/inbound-shipment-edit-carton-list-shell.component';
import { InboundShipmentEditCartonAddShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/inbound-shipment-edit-carton-add/containers/inbound-shipment-edit-carton-add-shell.component';
import { InboundShipmentEditCartonEditShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/inbound-shipment-edit-carton-edit/containers/inbound-shipment-edit-carton-edit-shell.component';
import { InboundShipmentEditCartonLineListShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/inbound-shipment-edit-carton-line-list/containers/inbound-shipment-edit-carton-line-list-shell.component';
import { InboundShipmentEditCartonLineAddShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/inbound-shipment-edit-carton-line-add/containers/inbound-shipment-edit-carton-line-add-shell.component';
import { InboundShipmentEditCartonLineEditShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton/inbound-shipment-edit-carton-line-edit/containers/inbound-shipment-edit-carton-line-edit-shell.component';
import { InboundShipmentEditShippingInstructionShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-shipping-instruction/containers/inbound-shipment-edit-shipping-instruction-shell.component';
import { InboundShipmentEditShippingShellComponent } from './inbound-shipment-edit/inbound-shipment-edit-shipping/containers/inbound-shipment-edit-shipping-shell.component';
import { inboundshipmentRouting } from './inbound-shipment.routing';

import { PurchaseOrderService } from './purchase-order.service';
import { InboundShipmentEditGuard } from './inbound-shipment-edit/inbound-shipment-edit-guard';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        InboundShipmentComponent,
        InboundShipmentListComponent,
        InboundShipmentEditComponent,
        InboundShipmentEditLineComponent,
        InboundShipmentEditLineListComponent,
        InboundShipmentEditLineEditComponent,
        InboundShipmentEditLineAddComponent,
        InboundShipmentEditCartonComponent,        
        InboundShipmentEditCartonListComponent,
        InboundShipmentEditCartonAddComponent,
        InboundShipmentEditCartonEditComponent,
        InboundShipmentEditCartonLineListComponent,
        InboundShipmentEditCartonLineEditComponent,
        InboundShipmentEditCartonLineAddComponent,
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
        InboundShipmentEditLineShellComponent,
        InboundShipmentEditLineListShellComponent,
        InboundShipmentEditLineEditShellComponent,
        InboundShipmentEditLineAddShellComponent,
        InboundShipmentEditCartonShellComponent,
        InboundShipmentEditCartonListShellComponent,
        InboundShipmentEditCartonAddShellComponent,
        InboundShipmentEditCartonEditShellComponent,
        InboundShipmentEditCartonLineListShellComponent,
        InboundShipmentEditCartonLineAddShellComponent,
        InboundShipmentEditCartonLineEditShellComponent,
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
        NgSelectModule
    ],
    providers: [
        PurchaseOrderService,
        InboundShipmentEditGuard,
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
    ]
})

export class InboundShipmentModule { }
