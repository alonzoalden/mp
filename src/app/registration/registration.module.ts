import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatSortModule, MatCheckboxModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ToolModule } from '../shared/tool/tool.module';
import { RegistrationComponent } from './registration.component';
import { registrationRouting } from './registration.routing';
import { RegistrationService } from './registration.service';
import { TranslateModule } from '@ngx-translate/core';
import { RegistrationB2bComponent } from './registration-b2b.component';

@NgModule({
    declarations: [
        RegistrationComponent,
        RegistrationB2bComponent
    ],
    imports: [
        TranslateModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        CdkTableModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        ToolModule,
        registrationRouting
    ],
    providers: [
        RegistrationService
    ]
})

export class RegistrationModule { }
