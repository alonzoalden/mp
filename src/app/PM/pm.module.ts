import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PmComponent} from './pm.component';
import {routing} from './pm.routing';
import {TranslateModule} from '@ngx-translate/core';
import {PMAuthGuard} from './guard/pm.guard';


@NgModule({
    declarations: [
        PmComponent
    ],
    imports: [
        CommonModule,
        routing,
        TranslateModule
    ],
    providers: [
        PMAuthGuard
    ]
})
export class PMModule {
}
