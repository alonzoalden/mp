export class VendorList {
    constructor(
        public VendorID: number,
        public Description: string,
        public VendorName: string
    ) {
    }
}

export class Vendor {
    constructor(
        public VendorID: string,
        public ExternalID: string,
        public NetSuiteInternalID: string,
        public NetSuiteEntityID: string,
        public NetSuiteLeadInternalID: string,
        public NetSuiteLeadEntityID: string,
        public MerchantID: string,
        public CompanyName: string,
        public DefaultBillingAddressID: string,
        public DefailtShippingAddressID: string,
        public Email: string,
        public Phone: string,
        public MerchantTerm: string,
        public ShopTitle: string,
        public ErrorMessage: string,
        public isNew: boolean,
        public CommissionPercentage?: number,
        public FreeStorageMonths?: number,
        public ServiceStartDate?: Date,
        public UpdatedOn?: Date,
        public CreatedOn?: Date,
        public BindLabel?: string,
        public MemberID?: Number
    ) {
    }
}
