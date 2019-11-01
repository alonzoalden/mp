import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppOriginalComponent } from './app-original.component';
import { routing } from './app-original.routing';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderOriginalComponent } from './header/header-original.component';


@NgModule({
    declarations: [
        AppOriginalComponent,
        HeaderOriginalComponent
    ],
    imports: [
        CommonModule,
        routing,
        TranslateModule
    ],
    // providers: [
    //     PMAuthGuard
    // ]
})
export class AppOriginalModule { }
