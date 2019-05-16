import { MatNativeDateModule } from "@angular/material";

export class Dashboard {
    constructor(
        public DashboardID: string,
        public Name: string,
        public Notification: string,
        public UpdatedOn: Date,
        public CreatedOn: Date,

        public DashboardNews: Array<DashboardNews>
    ) {}
}

export class DashboardNews {
    constructor(
        public DashboardNewsID: string,
        public DashboardID: string,
        public Subject: string,
        public News: string,
        public UpdatedOn: Date,
        public CreatedOn: Date
    ) {}
}

export class DashboardVendorNotification {
    constructor(
        public IsShippingAddressComplete: boolean,
        public IsBillingAddressComplete: boolean,
        public LateOrderCount: number
    ) {}
}

export class DashboardSalesOrderSummary {
    constructor(
        public Status: string,
        public OrderCount: number,
        public OrderAmount: number
    ) {}
}

export class ItemSalesTotal {
    constructor(
        public ItemID: number,
        public ItemName: string,
        public ItemVendorSKU: string,
        public TPIN: string,
        public URLKey: string,        
        public Quantity: number,
        public Amount: number,
    ) {}
}

export class InboundShipmentStatusCount {
    constructor(
        public Status: string,
        public Count: number
    ) {}
}

export class SalesStatusTotal {
    constructor(
        public Status: string,
        public VendorTotal: number
    ) {}
}

export class CurrentSalesOrderSummary {
    constructor(
        public Status: string,
        public OrderCount: number,
        public LineCount: number,
        public VendorTotalQty: number,
        public VendorTotalAmount: number
    ) {}
}

export class SalesOrderSummary {
    constructor(
        public NumberOfDays: number,
        public SalesQuantity: number,
        public SalesAmount: number
    ) {}
}
