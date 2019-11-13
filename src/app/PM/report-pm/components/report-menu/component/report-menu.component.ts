import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-report-menu',
    templateUrl: './report-menu.component.html',
    styleUrls: ['./report-menu.component.css']
})
export class ReportMenuComponent implements OnInit {
    links = [
        {label: 'Item Inventory', value: 'item'},
        // {label: 'Vendor Inventory', value: 'vendor'}
    ];


    constructor(
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    navigation(link) {
        this.router.navigate(['/PM/report/' + link.value]);
    }


}
