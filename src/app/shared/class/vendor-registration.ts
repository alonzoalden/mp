export class VendorRegistration {
    constructor(
        public VendorRegistrationID: number,
        public VendorID: string,
        public CompanyName: string,
        public Address: string,
        public City: string,
        public State: string,
        public PostalCode: string,
        public Region: string,
        public FirstName: string,
        public LastName: string,
        public PhoneNumber: string,
        public Email: string,
        public UpdatedOn: string,
        public CreatedOn: string,
    ) {
    }
}

export class VendorRegistrationB2B {
    constructor(
        public VendorRegistrationID: number,
        public VendorID: string,
        public CompanyName: string,
        public Address: string,
        public City: string,
        public State: string,
        public PostalCode: string,
        public Region: string,
        public FirstName: string,
        public LastName: string,
        public PhoneNumber: string,
        public Email: string,
        public UpdatedOn: string,
        public CreatedOn: string,
        public MerchantID: string,
        public ShopTitle: string,
        public MemberID: string
    ) {
    }
}
