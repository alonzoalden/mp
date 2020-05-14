export class Contact {
    constructor(
        public VendorContactID: string,
        public ExternalID: string,
        public VendorID: string,
        public ExternalVendorID: string,
        public ExternalItemID: string,
        public ItemID: string,
        public SKU: string,
        public ItemName: string,
        public Message: string,
        public ExpectedOrderQuantity: string,
        public Name: string,
        public Email: string,
        public CreatedOn: string
    ) {
    }
}
