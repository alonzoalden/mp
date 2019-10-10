export class ShipmentTracking {
    constructor(
        public ShipmentTrackingID: number,
        public FulfillmentID: string,
        public Carrier: string,
        public TItle: string,
        public TackingNumber: string,
        public SellerMemo: string
    ) {}
}
