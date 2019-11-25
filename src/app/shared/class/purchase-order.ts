export class PurchaseOrder {
    constructor(
        public PurchaseOrderID: number,
        public TransactionDate: Date,
        public ShipmentDate: Date,
        public PackingSlipNumber: string,
        public Status: string,
        public UpdatedOn: string,
        public CreatedOn: string,

        public PurchaseOrderLines: Array<PurchaseOrderLine>,
        public Cartons: Array<Carton>,
        public InboundShippingMethods: Array<InboundShippingMethod>
    ) {}
}

export class PurchaseOrderUpdate {
    constructor(
        public Status: string
    ) {}
}

export class PurchaseOrderLine {
    constructor(
        public PurchaseOrderLineID: number,
        public PurchaseOrderID: number,
        public ItemID: number,
        public ItemName: string,
        public ItemVendorSKU: string,
        public TPIN: string,
        public URLKey: string,
        public FOBPrice: number,
        public Quantity: number,
        public CartonQuantity: number,
        public ReceivedQty: number,
        public UpdatedOn: string,
        public CreatedOn: string,

        public PrevItemID: number,
        public pendingAdd: boolean
    ) {}
}

export class Carton {
    constructor(
        public CartonID: number,
        public PurchaseOrderID: number,
        public PackingSlipNumber: string,
        public CartonNumber: string,
        public Position: number,
        public Length: number,
        public Width: number,
        public Height: number,
        public Weight: number,
        public LabelQty: number,
        public UpdatedOn: string,
        public CreatedOn: string,

        public CartonLines: Array<CartonLine>,

        public pendingAdd: boolean
    ) {}
}

export class PurchaseOrderLineInsert {
    constructor(
        public PurchaseOrderID: number,
        public ItemID: number,
        public FOBPrice: number,
        public Quantity: number
    ) {}
}

export class PurchaseOrderLineList {
    constructor(
        public Value: number,
        public Label: string,
        public ItemName: string,
        public VendorSKU: string,
        public TPIN: string
    ) {}
}

export class CartonInsert {
    constructor(
        public PurchaseOrderID: number,
        public Position: number,
        public Length: number,
        public Width: number,
        public Height: number,
        public Weight: number,
        public LabelQty: number,

        public CartonLines: Array<CartonLineInsert>
    ) {}
}

export class CartonLine {
    constructor(
        public CartonLineID: number,
        public CartonID: number,
        public PurchaseOrderID: number,
        public PurchaseOrderLineID: number,
        public ItemName: string,                // show
        public ItemVendorSKU: string,           // show
        public TPIN: string,
        public URLKey: string,                    // show
        public Quantity: number,               // show
        public RemainingQuantity: number,               // show
        public UpdatedOn: string,
        public CreatedOn: string,

        public PrevPurchaseOrderLineID: number,
        public pendingAdd: boolean
    ) {}
}

export class CartonLineInsert {
    constructor(
        public CartonID: number,
        public PurchaseOrderLineID: number,        // from dropdown list
        public Quantity: number
    ) {}
}

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

export class PurchaseOrderMerchantInvoice {
    constructor(
        public PurchaseOrderMerchantInvoiceID: number,
        public PurchaseOrderID: number,
        public ShippingAmount: number,
        public InvoiceAmount: number,
        public FilePath: string,
        public UpdatedOn: Date,
        public CreatedOn: Date,
        public Position: number,
        public pendingAdd: boolean
    ) {}
}
