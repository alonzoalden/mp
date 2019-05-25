import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
    selector: 'browser-compatibility',
    templateUrl: './browser-compatibility.component.html',
})

export class BrowserCompatibilityComponent implements OnInit, OnDestroy {

    constructor(private deviceService: DeviceDetectorService, private router: Router) {
    }
    
    ngOnInit() {
        (<HTMLElement>document.getElementById('main-nav')).hidden = true;
        this.verifyBrowserCompatibility();
    }
    ngAfterViewInit(){
        
    }
    ngOnDestroy(): void {
        
    }

    verifyBrowserCompatibility() {
        const disabledBrowsers = {
          'IE': 1,
          'MS-Edge': 1
        }    
        const browser = this.deviceService.getDeviceInfo().browser;
        if (!disabledBrowsers[browser]) this.router.navigate(['/home']);
    }
}