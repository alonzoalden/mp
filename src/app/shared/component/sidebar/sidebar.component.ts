import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'item', title: 'Item',  icon: 'content_paste', class: '' },
    { path: 'purchase-order', title: 'Inbound Shipment',  icon: 'library_books', class: '' },
    { path: 'sales-order', title: 'Sales Order',  icon: 'library_books', class: '' }
];

@Component({
    selector: 'o-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() { }

    ngOnInit() {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if (window.screen.width > 991) {
            return false;
        }
        return true;
    }
}
