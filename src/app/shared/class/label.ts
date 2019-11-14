export class CustomPrintLabel {
    constructor(
        public Quantity: number,
        public Border: string,
        public PageWidth: number,
        public PageHeight: number,
        public LabelWidth: number,
        public LabelHeight: number,
        public PageTopMargin: number,
        public PageLeftMargin: number,
        public GapDistanceX: number,
        public GapDistanceY: number
    ) {}
}
