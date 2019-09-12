export class SalesOrder {
    constructor(
        public OrderID: number,
        public IncrementID: string,
        public TransactionDate: Date,
        // public CustomerID: number,
        // public CustomerFirstName: string,
        // public CustomerMiddleName: string,
        // public CustomerLastName: string,
        // public CustomerEmail: string,        
        public SalesSource: string,
        public ShippingMethod: string,
        public Status: string,
        public FulfilledBy: string,
        public VendorTotal: number,

        public LineCount: number,
        public ItemID: string,
        public ItemName: string,
        public ItemImage: string,
        public URLKey: string,


        public ShipByDate: Date,
        public CustomerName: string,
        public ShipAddressAddressLine1: string,
        public ShipAddressAddressLine2: string,
        public ShipAddressCity: string,
        public ShipAddressState: string,
        public ShipAddressPostalCode: string,
        public ShipAddressCountry: string,
        public ShipAddressPhoneNumber: string,
        public CreatedOn: Date,

        public MerchantStatus: string
    ) {}
}
