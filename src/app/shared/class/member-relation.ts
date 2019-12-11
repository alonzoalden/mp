export class MemberRelationItemNode {
    MemberID: string;
    Name: string;
    Children: MemberRelationItemNode[];
    ParentID: string;
    constructor() {
    }
}

export class MemberRelationFlatNode {
    public MemberID: string;
    public Name: string;
    public ParentID: string;
    public level: number;
    public expandable: boolean;
    constructor() {
    }
}

export class MemberRelationNode {
    constructor(
        public MemberID: string,
        public Name: string,
        public Email: string
    ) {
    }
}
