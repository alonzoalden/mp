export class BOLRequest {
    constructor(
        public BOLRequestID: string,
        public PurchaseOrderID: number,
        public PickUpDate: Date,
        public Name: string,
        public AddressLine1: string,
        public AddressLine2: string,
        public City: string,
        public State: string,
        public PostalCode: string,
        public CountryID: string,
        public PhoneNumber: string,
        public BOLPath: string,
        public UpdatedOn: Date,
        public CreatedOn: Date,
        public BOLRequestLines: Array<BOLRequestLine>
    ) {}
}

export class BOLRequestLine {
    constructor(
        public BOLRequestLineID: string,
        public BOLRequestID: string,
        public Length: number,
        public Width: number,
        public Height: number,
        public Weight: number,
        public Pieces: number,
        public PackageType: string,
        public UpdatedOn: Date,
        public CreatedOn: Date
    ) {}
}