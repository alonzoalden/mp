import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,   
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatMenuTrigger,
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

import { ComponentsModule } from './shared/component/components.module';
import { ToolModule } from './shared/tool/tool.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';

import { routing } from './app.routing';

import { environment } from '../environments/environment';

import { AppService } from './app.service';

import { RequestInterceptor } from './core/request.interceptor';
import { ResponseInterceptor } from './core/response.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { APP_BASE_HREF } from '@angular/common';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { BrowserCompatibilityComponent } from './browser-compatibility/browser-compatibility.component';
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ItemVariationData } from './item/item-variation-data';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
  
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        BrowserCompatibilityComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        // HttpClientInMemoryWebApiModule.forRoot(ItemVariationData),
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          }),
        ComponentsModule,
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: [ environment.webapiURL ],
                sendAccessToken: true
            }
        }),
        BrowserAnimationsModule,
        AnimateOnScrollModule.forRoot(),
        DeviceDetectorModule.forRoot(),
        routing
    ],
    exports: [
        CdkTableModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatFormFieldModule,
        ToolModule
    ],
    bootstrap: [ AppComponent ],
    providers: [
            AppService,
            AuthGuard,
            { provide: APP_BASE_HREF, useValue: '/'},
            { provide: OAuthStorage, useValue: localStorage },
            { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
            { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
        ]
    })

export class AppModule { }
