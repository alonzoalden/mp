export class PayoutLog {
    constructor(
        public vendor: string,
        public PayoutStartDate: string,
        public PayoutEndDate: string,
        public PayoutLogID: string
    ) {
    }
}

export class Payout {
    constructor(
        public Order: string,
        public Vendor: string,
        public PurchasedFrom: string,
        public SellingPrice: string,
        public MerchantPrice: string,
        public PurchasedOn: string,
        public PromotionPrice: string,
        public BillTo: string,
        public ShippingState: string,
        public Status: string,
        public IsBundle: string,
        public BundleItemID: string,
        public OrderDate: string,
        public TPIN: string,
        public Quantity: string,
        public ThreePLShippingFee: string,
        public Warranty: string,
        public WarrantyFee: string,
        public ServiceStartDate: string,
        public StorageFeeStartDate: string,
        public StorageDaysWithFee: string,
        public Height: string,
        public Width: string,
        public Length: string,
        public Volume: string,
        public StorageFee: string,
        public Location: string,
        public ReturnShippingFee: string,
        public SKU: string,
    ) {
    }
}

