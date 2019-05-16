export class SalesOrderLine {
    constructor(
        public SalesOrderLineID: number,
        public SalesOrderID: string,
        public Location: string,
        public ItemID: string,
        public ItemType: string,
        public ItemName: string,
        public ItemVendorSKU: string,
        public ItemImage: string,
        public TPIN: string,
        public URLKey: string,        
        public UnitPrice: number,
        public Quantity: number,
        public FulfilledQuantity: number,
        public TaxAmount: number,
        public TaxRate: number,
        public DiscountAmount: number,
        public DiscountRate: number,
        public LineSubTotal: number,
        public MerchantStatus: string,
        public UpdatedOn: string,
        public CreatedOn: string,

        public IsBundled: boolean,
        public CancellationReason: string
    ) {}
}
