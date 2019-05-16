import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatSortModule, MatDialogModule, MatSelectModule, MatMenuModule, MatToolbarModule, MatIconModule, MatListModule, MatTooltipModule } from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { CdkTableModule } from '@angular/cdk/table';
import { ToolModule } from '../shared/tool/tool.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { InboundShipmentComponent } from './inbound-shipment.component';
import { InboundShipmentListComponent } from './inbound-shipment-list/inbound-shipment-list.component';
import { InboundShipmentEditComponent, InboundShipmentEditComponentItemPrintDialog } from './inbound-shipment-edit/inbound-shipment-edit.component';
import { InboundShipmentEditLineComponent } from './inbound-shipment-edit/inbound-shipment-edit-line.component';
import { InboundShipmentEditLineListComponent, InboundShipmentEditLineComponentItemPrintDialog } from './inbound-shipment-edit/inbound-shipment-edit-line-list.component';
import { InboundShipmentEditLineEditComponent } from './inbound-shipment-edit/inbound-shipment-edit-line-edit.component';
import { InboundShipmentEditLineAddComponent } from './inbound-shipment-edit/inbound-shipment-edit-line-add.component';
import { InboundShipmentEditCartonComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton.component';
import { InboundShipmentEditCartonListComponent, InboundShipmentEditCartonListComponentCartonPrintDialog, InboundShipmentEditCartonListComponentCartonLineDialog } from './inbound-shipment-edit/inbound-shipment-edit-carton-list.component';
import { InboundShipmentEditCartonAddComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton-add.component';
import { InboundShipmentEditCartonEditComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton-edit.component';
import { InboundShipmentEditCartonLineListComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton-line-list.component';
import { InboundShipmentEditCartonLineAddComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton-line-add.component';
import { InboundShipmentEditCartonLineEditComponent } from './inbound-shipment-edit/inbound-shipment-edit-carton-line-edit.component';
import { InboundShipmentEditShippingInstructionComponent, InboundShipmentEditShippingInstructionComponentCartonPrintDialog } from './inbound-shipment-edit/inbound-shipment-edit-shipping-instruction.component';
import { InboundShipmentEditShippingComponent } from './inbound-shipment-edit/inbound-shipment-edit-shipping.component';

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
        InboundShipmentEditShippingInstructionComponentCartonPrintDialog     
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
