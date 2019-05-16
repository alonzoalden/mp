export class CartonLine {
    constructor(
        public CartonLineID: number,
        public CartonID: number,
        public PurchaseOrderID: number,
        public PurchaseOrderLineID: number,
        public ItemName: string,                
        public ItemVendorSKU: string,           
        public TPIN: string,
        public Quantity: number,              
        public UpdatedOn: string,
        public CreatedOn: string
    ) {}
}

export class CartonLineInsert {
    constructor(
        public CartonID: number,
        public PurchaseOrderLineID: number,        
        public Quantity: number
    ) {}
}

export class CartonLineUpdate {
    constructor(
        public PurchaseOrderLineID: number,
        public Quantity: number,
    ) {}
}
