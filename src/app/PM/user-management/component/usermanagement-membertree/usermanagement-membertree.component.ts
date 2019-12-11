import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {MatBottomSheet, MatDialog, MatTree} from '@angular/material';
import {Store} from '@ngrx/store';
import {UsermanagementState} from '../../state/usermanagement.reducer';
import {MemberRelationFlatNode, MemberRelationItemNode, MemberRelationNode} from 'app/shared/class/member-relation';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {SelectionModel} from '@angular/cdk/collections';
import {BottomsheetExportData, UsermanegementMembertreeBottomsheet} from './usermanegement-membertree-bottomsheet';
import {Router} from '@angular/router';

@Component({
    selector: 'app-usermanagement-membertree',
    templateUrl: './usermanagement-membertree.component.html',
    styleUrls: ['./usermanagement-membertree.component.css']
})
export class UsermanagementMembertreeComponent implements OnInit, OnChanges {
    @Input() data: MemberRelationItemNode[];
    @Output() getMemberRelationTree = new EventEmitter();
    @Output() getUnRelatedMemberList = new EventEmitter();
    @Output() updateTree = new EventEmitter<MemberRelationItemNode[]>();
    @Input() unRelatedList: MemberRelationNode[];
    @Output() addToUnRelatedList = new EventEmitter<MemberRelationItemNode[]>();
    @Output() addMemberTree = new EventEmitter();
    @Output() deleteMemberTree = new EventEmitter();
    @Output() saveMemberTree = new EventEmitter<MemberRelationItemNode[]>();
    @Input() isTreeDataLoading: Boolean;
    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
    flatNodeMap = new Map<MemberRelationFlatNode, MemberRelationItemNode>();

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<MemberRelationItemNode, MemberRelationFlatNode>();

    /** A selected parent node to be inserted */
    selectedParent: MemberRelationFlatNode | null = null;

    treeControl: FlatTreeControl<MemberRelationFlatNode>;

    treeFlattener: MatTreeFlattener<MemberRelationItemNode, MemberRelationFlatNode>;

    dataSource: MatTreeFlatDataSource<MemberRelationItemNode, MemberRelationFlatNode>;

    /** The selection for checklist */
    checklistSelection = new SelectionModel<MemberRelationFlatNode>(true /* multiple */);

    /* Drag and drop */
    dragNode: any;
    dragNodeExpandOverWaitTimeMs = 300;
    dragNodeExpandOverNode: any;
    dragNodeExpandOverTime: number;
    dragNodeExpandOverArea: string;
    @ViewChild('emptyItem', {static: false}) emptyItem: ElementRef;
    @ViewChild('tree', {static: false}) tree: MatTree<any>;

    constructor(
        public dialog: MatDialog,
        private store: Store<UsermanagementState>,
        private _bottomSheet: MatBottomSheet,
        private cdf: ChangeDetectorRef,
        private zone: NgZone,
        private router: Router
    ) {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<MemberRelationFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        this.router.onSameUrlNavigation = 'reload';
    }

    ngOnDestory() {
        this.router.onSameUrlNavigation = 'ignore';
    }

    openBottomSheet(parentNode: MemberRelationItemNode): void {
        const bottomSheetRef = this._bottomSheet.open(UsermanegementMembertreeBottomsheet, {
            data: {
                memberList: this.unRelatedList,
                parentNode: parentNode
            }
        });
        bottomSheetRef.instance.event.subscribe((data: BottomsheetExportData) => {
            const newItem = new MemberRelationItemNode();
            newItem.Name = data.member.Name;
            newItem.MemberID = data.member.MemberID;
            newItem.ParentID = data.parentNode.MemberID;
            newItem.Children = [];
            this.insertItem(data.parentNode, newItem);
            this.updateTreeData();
            this.treeControl.expand(this.nestedNodeMap.get(data.parentNode));
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.data && changes.data.currentValue) {
            this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
            this.treeControl = new FlatTreeControl<MemberRelationFlatNode>(this.getLevel, this.isExpandable);
            this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
            this.dataSource.data = this.data;
            setTimeout(() => {
                this.treeControl.collapseAll();
                this.treeControl.expandAll();
            });

        }
    }

    ngOnInit() {
        this.getMemberRelationTree.emit();
        this.getUnRelatedMemberList.emit();
    }

    updateTreeData() {
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        this.dataSource.data = this.data;
        this.tree.renderNodeChanges(this.data);
    }

    trackBy = (_: number, node: MemberRelationItemNode) => node.MemberID + node.Name;

    getLevel = (node: MemberRelationFlatNode) => node.level;

    isExpandable = (node: MemberRelationFlatNode) => node.expandable;

    getChildren = (node: MemberRelationItemNode): MemberRelationItemNode[] => node.Children;

    hasChild = (_: number, _nodeData: MemberRelationFlatNode) => _nodeData.expandable;

    transformer = (node: MemberRelationItemNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode = existingNode && existingNode.MemberID === node.MemberID
            ? existingNode
            : new MemberRelationFlatNode();
        flatNode.MemberID = node.MemberID;
        flatNode.Name = node.Name;
        flatNode.level = level;
        flatNode.expandable = (node.Children && node.Children.length > 0);
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    };

    descendantsAllSelected(node: MemberRelationFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        return descendants.every(child => this.checklistSelection.isSelected(child));
    }

    descendantsPartiallySelected(node: MemberRelationFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }

    todoItemSelectionToggle(node: MemberRelationFlatNode): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants)
            : this.checklistSelection.deselect(...descendants);
    }

    addNewItem(node: MemberRelationFlatNode) {
        this.treeControl.expand(node);
        const parentNode: MemberRelationItemNode = this.flatNodeMap.get(node);
        this.openBottomSheet(parentNode);
    }

    handleDragStart(event, node) {
        event.dataTransfer.setData('foo', 'bar');
        event.dataTransfer.setDragImage(this.emptyItem.nativeElement, 0, 0);
        this.dragNode = node;
        this.treeControl.collapse(node);
    }

    handleDragOver(event, node) {
        event.preventDefault();
        if (node === this.dragNodeExpandOverNode) {
            if (this.dragNode !== node && !this.treeControl.isExpanded(node)) {
                if ((new Date().getTime() - this.dragNodeExpandOverTime) > this.dragNodeExpandOverWaitTimeMs) {
                    this.treeControl.expand(node);
                }
            }
        } else {
            this.dragNodeExpandOverNode = node;
            this.dragNodeExpandOverTime = new Date().getTime();
        }
        const percentageX = event.offsetX / event.target.clientWidth;
        const percentageY = event.offsetY / event.target.clientHeight;
        if (percentageY < 0.25) {
            this.dragNodeExpandOverArea = 'above';
        } else if (percentageY > 0.75) {
            this.dragNodeExpandOverArea = 'below';
        } else {
            this.dragNodeExpandOverArea = 'center';
        }
    }

    handleDrop(event, node: MemberRelationFlatNode) {
        event.preventDefault();
        if (node !== this.dragNode) {
            let newItem: MemberRelationItemNode;
            if (this.dragNodeExpandOverArea === 'above') {
                newItem = this.copyPasteItemAbove(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
            } else if (this.dragNodeExpandOverArea === 'below') {
                newItem = this.copyPasteItemBelow(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
            } else {
                newItem = this.copyPasteItem(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
            }
            this.deleteItem(this.flatNodeMap.get(this.dragNode));
            this.treeControl.expandDescendants(this.dragNode);
            this.updateTreeData();
        }
        this.dragNode = null;
        this.dragNodeExpandOverNode = null;
        this.dragNodeExpandOverTime = 0;
    }

    handleDragEnd(event) {
        this.dragNode = null;
        this.dragNodeExpandOverNode = null;
        this.dragNodeExpandOverTime = 0;
    }

    insertItem(parent: MemberRelationItemNode, item: MemberRelationItemNode): MemberRelationItemNode {
        if (!parent.Children) {
            parent.Children = [];
        }
        const newItem = {MemberID: item.MemberID, Name: item.Name, ParentID: item.ParentID} as MemberRelationItemNode;
        parent.Children.push(newItem);
        this.updateTree.emit(this.data);
        return newItem;
    }

    insertItemAbove(node: MemberRelationItemNode, item: MemberRelationItemNode): MemberRelationItemNode {
        const parentNode = this.getParentFromNodes(node);
        const newItem = {MemberID: item.MemberID, Name: item.Name, ParentID: item.ParentID} as MemberRelationItemNode;
        if (parentNode != null) {
            parentNode.Children.splice(parentNode.Children.indexOf(node), 0, newItem);
        } else {
            this.data.splice(this.data.indexOf(node), 0, newItem);
        }
        this.updateTree.emit(this.data);
        return newItem;
    }

    insertItemBelow(node: MemberRelationItemNode, item: MemberRelationItemNode): MemberRelationItemNode {
        const parentNode = this.getParentFromNodes(node);
        const newItem = {MemberID: item.MemberID, Name: item.Name, ParentID: item.ParentID} as MemberRelationItemNode;
        if (parentNode != null) {
            parentNode.Children.splice(parentNode.Children.indexOf(node) + 1, 0, newItem);
        } else {
            this.data.splice(this.data.indexOf(node) + 1, 0, newItem);
        }
        this.updateTree.emit(this.data);
        return newItem;
    }

    getParentFromNodes(node: MemberRelationItemNode): MemberRelationItemNode {
        for (let i = 0; i < this.data.length; ++i) {
            const currentRoot = this.data[i];
            const parent = this.getParent(currentRoot, node);
            if (parent != null) {
                return parent;
            }
        }
        return null;
    }

    getParent(currentRoot: MemberRelationItemNode, node: MemberRelationItemNode): MemberRelationItemNode {
        if (currentRoot.Children && currentRoot.Children.length > 0) {
            for (let i = 0; i < currentRoot.Children.length; ++i) {
                const child = currentRoot.Children[i];
                if (child === node) {
                    return currentRoot;
                } else if (child.Children && child.Children.length > 0) {
                    const parent = this.getParent(child, node);
                    if (parent != null) {
                        return parent;
                    }
                }
            }
        }
        return null;
    }

    deleteItem(node: MemberRelationItemNode) {
        this.deleteNode(this.data, node);
        this.updateTree.emit(this.data);
    }

    copyPasteItem(from: MemberRelationItemNode, to: MemberRelationItemNode): MemberRelationItemNode {
        const newItem = this.insertItem(to, from);
        if (from.Children) {
            from.Children.forEach(child => {
                this.copyPasteItem(child, newItem);
            });
        }
        return newItem;
    }

    copyPasteItemAbove(from: MemberRelationItemNode, to: MemberRelationItemNode): MemberRelationItemNode {
        const newItem = this.insertItemAbove(to, from);
        if (from.Children) {
            from.Children.forEach(child => {
                this.copyPasteItem(child, newItem);
            });
        }
        return newItem;
    }

    copyPasteItemBelow(from: MemberRelationItemNode, to: MemberRelationItemNode): MemberRelationItemNode {
        const newItem = this.insertItemBelow(to, from);
        if (from.Children) {
            from.Children.forEach(child => {
                this.copyPasteItem(child, newItem);
            });
        }
        return newItem;
    }

    deleteNode(nodes: MemberRelationItemNode[], nodeToDelete: MemberRelationItemNode) {
        const index = nodes.indexOf(nodeToDelete, 0);
        if (index > -1) {
            nodes.splice(index, 1);
        } else {
            nodes.forEach(node => {
                if (node.Children && node.Children.length > 0) {
                    this.deleteNode(node.Children, nodeToDelete);
                }
            });
        }
    }

    deleteButtonItem(node: MemberRelationFlatNode) {
        this.deleteWithAddNode(this.data, this.flatNodeMap.get(node));
        this.updateTree.emit(this.data);
        this.updateTreeData();
    }

    deleteWithAddNode(nodes: MemberRelationItemNode[], nodeToDelete: MemberRelationItemNode) {
        const index = nodes.indexOf(nodeToDelete, 0);
        if (index > -1) {
            const addList: MemberRelationItemNode[] = this.opentree(nodes[index]);
            nodes.splice(index, 1);
            this.addToUnRelatedList.emit(addList);
        } else {
            nodes.forEach(node => {
                if (node.Children && node.Children.length > 0) {
                    this.deleteWithAddNode(node.Children, nodeToDelete);
                }
            });
        }
    }

    opentree(tree: MemberRelationItemNode) {
        const result = [];
        result.push({MemberID: tree.MemberID, Name: tree.Name, Email: null});
        const flat = nodes => {
            if (nodes.Children && nodes.Children.length > 0) {
                nodes.Children.forEach(node => {
                    result.push(node);
                    flat(node);
                });
            }
        };
        flat(tree);
        return result;
    }

    expandAll() {
        this.treeControl.expandAll();
    }

    collapseAll() {
        this.treeControl.collapseAll();
    }

    saveMemberTreeBtn() {
        this.saveMemberTree.emit(this.data);
    }
}
