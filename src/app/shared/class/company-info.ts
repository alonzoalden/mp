export class CompanyInfo {
    constructor(
        public VendorID: string,
        public CompanyName: string,
        public Email: string,
        public PhoneNumber: string,
        public CreatedOn: string,

        public ShippingStoreName: string,
        public ShippingAddress: string,
        public ShippingAddress2: string,
        public ShippingCity: string,
        public ShippingState: string,
        public ShippingZip: string,
        public ShippingCountryID: string,
        public ShippingCountryName: string,

        public BillingAddress: string,
        public BillingAddress2: string,
        public BillingCity: string,
        public BillingState: string,
        public BillingZip: string,
        public BillingCountryID: string,
        public BillingCountryName: string,

    ) {}
}
