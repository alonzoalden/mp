import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppOriginalComponent } from './app-original.component';
import { routing } from './app-original.routing';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderOriginalComponent } from './header/header-original.component';
import { InboundShipmentPreviewDialogComponent } from './inbound-shipment/inbound-shipment-preview/inbound-shipment-preview-dialog.component';

@NgModule({
    declarations: [
        AppOriginalComponent,
        HeaderOriginalComponent,
        InboundShipmentPreviewDialogComponent
    ],
    imports: [
        CommonModule,
        routing,
        TranslateModule
    ],
    entryComponents: [
        InboundShipmentPreviewDialogComponent,
    ]
    // providers: [
    //     PMAuthGuard
    // ]
})
export class AppOriginalModule { }
