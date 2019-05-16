export class InboundShippingMethod {
    constructor(
        public InboundShippingMethodID: number,
        public PurchaseOrderID: number,
        public Title: string,
        public BillingOfLading: string,
        public ContainerNumber: string,
        public UpdatedOn: Date,
        public CreatedOn: Date
    ) {}
}

export class InboundShippingMethodInsert {
    constructor(
        public PurchaseOrderID: number,
        public Title: string,
        public BillingOfLading: string,
        public ContainerNumber: string
    ) {}
}
