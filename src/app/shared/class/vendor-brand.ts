export class VendorBrand {
    constructor(
        public VendorBrandID: number,
        public VendorID: string,
        public BrandName: string,
        public UpdatedOn: string,
        public CreatedOn: string,

        public pendingAdd: boolean
    ) {}
}
