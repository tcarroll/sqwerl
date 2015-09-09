/*globals NO, SC, Sqwerl, static_url, YES*/

/**
 * List items that represent persistent things.
 */
Sqwerl.TreeNode = SC.Object.extend({

    hasChildTreeNodes: NO,

    isTreeItemContent: YES,

    /**
     * This tree node's parent tree node.
     * {Sqwerl.TreeNode}
     */
    parentTreeNode: null,

    treeItemIsExpanded: NO,

    treeItemIsGrouped: NO,

    childrenCount: Sqwerl.property(function () {
        'use strict';
        var node = this.get('node');
        return node ? node.get('childrenCount') : 0;
    }),

    description: Sqwerl.property(function () {
        'use strict';
        var node = this.get('node');
        return node ? node.get('description') : '';
    }),

    displayName: Sqwerl.property(function () {
        'use strict';
        var node = this.get('node');
        return node ? node.get('name') : '';
    }),

    getSortKey: function () {
        'use strict';
        var node = this.get("node");
        return node ? node.getSortKey() : '';
    },

    instances: Sqwerl.property(function () {
        'use strict';
        var node = this.get('node');
        return node ? node.get('instances') : null;
    }),

    itemIcon: Sqwerl.property(function () {
        'use strict';
        var node = this.get('node');
        return node ? node.get('itemIcon') : null;
    }),

    itemIconTitle: Sqwerl.property(function () {
        'use strict';
        var node = this.get('node');
        return node ? node.get('itemIconTitle') : null;
    }),

    name: Sqwerl.property(function () {
        'use strict';
        var node = this.get('node');
        return node ? node.get('name') : '';
    }),

    shortDescription: Sqwerl.property(function () {
        'use strict';
        var node = this.get('node');
        return node ? node.get('shortDescription') : null;
    }),

    title: Sqwerl.property(function () {
        'use strict';
        var node = this.get('node');
        return node ? node.get('title') : null;
    }),

    treeItemBranchIndexes: Sqwerl.property(function (parent, index) {
        'use strict';
        return null;
    }),

    treeItemChildren: Sqwerl.property(function () {
        'use strict';
        return (this.childTreeNodes || []);
    }),

    treeItemDisclosureState: function () {
        'use strict';
        var childrenCount,
            disclosureState = SC.LEAF_NODE,
            node;
        if (this.get('treeItemIsExpanded')) {
            disclosureState = SC.BRANCH_OPEN;
        } else {
            node = this.get('node');
            if (node) {
                if (this.hasChildTreeNodes) {
                    disclosureState = SC.BRANCH_CLOSED;
                } else {
                    childrenCount = node.get('childrenCount');
                    disclosureState = (childrenCount && (childrenCount > 0)) ? SC.BRANCH_CLOSED : SC.LEAF_NODE;
                }
            }
        }
        return disclosureState;
    },

    typeName: Sqwerl.property(function () {
        'use strict';
        var node = this.get('node');
        return node ? node.get('typeName') : null;
    })
});