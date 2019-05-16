export class Carton {
    constructor(
        public CartonID: number,
        public PurchaseOrderID: number,
        public PackingSlipNumber: string,  // show
        public CartonNumber: string,        // show
        public Position: number,
        public Length: number,
        public Width: number,
        public Height: number,
        public Weight: number,
        public LabelQty: number,
        public UpdatedOn: string,        // show
        public CreatedOn: string        // show
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
    ) {}
}
