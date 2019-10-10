export class VendorAttachment {
    constructor(
        public VendorAttachmentID: number,
        public VendorID: string,
        public Title: string,
        public UploadedFile: string,
        public Exclude: boolean,
        public Remove: boolean,
        public UpdatedOn: string,
        public CreatedOn: string,
    ) {}
}

export class VendorAttachmentInsert {
    constructor(
        public VendorID: string,
        public Title: string,
        public UploadedFile: string
    ) {}
}

export class VendorAttachmentUpdate {
    constructor(
        public VendorID: string,
        public Title: string,
        public UploadedFile: string,
        public Exclude: boolean,
        public Remove: boolean
    ) {}
}

export class VendorAttachmentList {
    constructor(
        public Value: number,
        public Label: string
    ) {}
}
