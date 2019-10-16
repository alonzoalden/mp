import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationComponent } from './notification/notification.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
    declarations: [
        NotificationComponent,
        DialogComponent
    ],
    imports: [
        CommonModule,
        SimpleNotificationsModule.forRoot(),
    ],
    providers: [
        NotificationComponent
    ],
    exports: [
        NotificationComponent
    ]
})
export class ToolModule { }
