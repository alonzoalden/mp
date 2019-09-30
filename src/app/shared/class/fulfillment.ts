export class Fulfillment {
    constructor(
        public FulfillmentID: number,
        public PurchaseOrderID: string,
        public SalesOrderID: string,

        public InternalID: string,
        public ShipDate: string,
        public Carrier: string,
        public ShippingMethod: string,
        public SellerMemo: string,

        public TrackingNumber: string,
        public UpdatedOn: string,
        public CreatedOn: string,

        public ShipmentTrackings: Array<ShipmentTracking>,
        public FulfillmentSalesOrderLines: Array<FulfillmentSalesOrderLine>
    ) {}
}

export class ShipmentTracking {
    constructor(
        public ShipmentTrackingID: number,
        public FulfillmentID: string,
        public TrackingNumber: string,
        public CreatedOn: string
    ) {}
}

export class FulfillmentSalesOrderLine {
    constructor(
        public PurchaseOrderLineID: number,
        public SalesOrderLineID: number,
        public FulfillmentLineID: number,
        public ItemID: string,
        public ItemName: string,
        public ItemVendorSKU: string,
        public ItemImage: string,
        public TPIN: string,
        public URLKey: string,
        public Quantity: number,
        public FulfilledQuantity: number,
        public RemainingQuantity: number,
        public PackageQuantity: number
    ) {}
}
