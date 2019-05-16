export class BatchUpdate {
    constructor(
        public BatchUpdateID: string,
        public TableName: string,        
        public FieldName: string,
        public FieldLabel: string,
        public FieldTypeID: string,
        public CreatedOn: string,

        public FieldType: FieldType,
        public FieldDropDowns: Array<FieldDropDown>,
    ) {}
}

export class FieldType {
    constructor(
        public FieldTypeID: string,
        public Label: string,        
        public Type: string
    ) {}
}

export class FieldDropDown {
    constructor(
        public FieldDropDownID: string,
        public FieldTypeID: string,        
        public Label: string,
        public Value: string
    ) {}
}

export class BatchUpdateValue {
    constructor(
        public TableName: string,
        public FieldName: string,        
        public WhereField: string,
        public WhereValue: string,
        public UpdateValue: string,
    ) {}
}