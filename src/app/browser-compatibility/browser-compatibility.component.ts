import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'browser-compatibility',
    templateUrl: './browser-compatibility.component.html',
})

export class BrowserCompatibilityComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        const mainNav = (<HTMLElement>document.getElementById('main-nav'));
        if (mainNav) {
            mainNav.hidden = true;
        }
    }
}
