import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatSortModule, MatDialogModule, MatSelectModule, MatMenuModule, MatToolbarModule, MatIconModule, MatListModule, MatTooltipModule } from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { CdkTableModule } from '@angular/cdk/table';
import { ToolModule } from '../shared/tool/tool.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { InboundShipmentComponent } from './inbound-shipment.component';

import { InboundShipmentListComponent } from './components/inbound-shipment-list/inbound-shipment-list.component';
import { InboundShipmentEditComponent, InboundShipmentEditComponentItemPrintDialog } from './components/inbound-shipment-edit/inbound-shipment-edit.component';
import { InboundShipmentEditLineComponent } from './components/inbound-shipment-edit/inbound-shipment-edit-line.component';
import { InboundShipmentEditLineListComponent, InboundShipmentEditLineComponentItemPrintDialog } from './inbound-shipment-edit/inbound-shipment-edit-line-list.component';
import { InboundShipmentEditLineEditComponent } from './components/inbound-shipment-edit/inbound-shipment-edit-line-edit.component';
import { InboundShipmentEditLineAddComponent } from './components/inbound-shipment-edit/inbound-shipment-edit-line-add.component';
import { InboundShipmentEditCartonComponent } from './components/inbound-shipment-edit/inbound-shipment-edit-carton.component';
import { InboundShipmentEditCartonListComponent, InboundShipmentEditCartonListComponentCartonPrintDialog, InboundShipmentEditCartonListComponentCartonLineDialog } from './components/inbound-shipment-edit/inbound-shipment-edit-carton-list.component';
import { InboundShipmentEditCartonAddComponent } from './components/inbound-shipment-edit/inbound-shipment-edit-carton-add.component';
import { InboundShipmentEditCartonEditComponent } from './components/inbound-shipment-edit/inbound-shipment-edit-carton-edit.component';
import { InboundShipmentEditCartonLineListComponent } from './components/inbound-shipment-edit/inbound-shipment-edit-carton-line-list.component';
import { InboundShipmentEditCartonLineAddComponent } from './components/inbound-shipment-edit/inbound-shipment-edit-carton-line-add.component';
import { InboundShipmentEditCartonLineEditComponent } from './components/inbound-shipment-edit/inbound-shipment-edit-carton-line-edit.component';
import { InboundShipmentEditShippingInstructionComponent, InboundShipmentEditShippingInstructionComponentCartonPrintDialog } from './components/inbound-shipment-edit/inbound-shipment-edit-shipping-instruction.component';
import { InboundShipmentEditShippingComponent } from './components/inbound-shipment-edit/inbound-shipment-edit-shipping.component';
//import { InboundShipmentSelectItemComponentDialog } from './components/inbound-shipment-edit/inbound-shipment-edit-


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
import { InboundShipmentEditCartonLineAddShellComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-carton-line-add-shell/inbound-shipment-edit-carton-line-add-shell.component';
import { InboundShipmentEditCartonLineEditShellComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-carton-line-edit-shell/inbound-shipment-edit-carton-line-edit-shell.component';
import { InboundShipmentEditShippingInstructionShellComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-shipping-instruction-shell/inbound-shipment-edit-shipping-instruction-shell.component';
import { InboundShipmentEditShippingShellComponent } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-shipping-shell/inbound-shipment-edit-shipping-shell.component';
import { inboundshipmentRouting } from './inbound-shipment.routing';

import { PurchaseOrderService } from './purchase-order.service';
import { InboundShipmentEditGuard } from './containers/inbound-shipment-edit-shell/inbound-shipment-edit-guard';
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
