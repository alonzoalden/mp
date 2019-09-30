export class Member {
    constructor(
        public MemberID: number,
        public FirstName: string,
        public LastName: string,
        public VendorID: string,
        public VendorName: string,
        public IsDropship: boolean,
        public Email: string,
        public InviteGUID: string,
        public IsConfirmed: boolean,
        public IsAdmin: boolean,
        public IsSuperAdmin: boolean,
        public IsPM: boolean,

        public DefaultLanguage: string,
        public DefaultPageSize: number,

        public IsActive: boolean,
        public UpdatedOn: string,
        public CreatedOn: string,
        public Password: string,
        public ConfirmPassword: string
    ) {}
}

export class MemberInsert {
    constructor(
        public FirstName: string,
        public LastName: string,
        public VendorID: string,
        public Email: string,
        public IsAdmin: boolean,
        public IsSuperAdmin: boolean,
        public Password: string,
        public ConfirmPassword: string
    ) {}
}

export class MemberVendor {
    constructor(
        public MemberVendorID: number,
        public MemberID: number,
        public VendorID: number,
        public VendorName: number,
        public MerchantID: string,
        public UpdatedOn: string,
        public CreatedOn: string,
    ) {}
}
