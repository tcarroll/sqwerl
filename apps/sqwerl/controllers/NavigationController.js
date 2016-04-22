/*globals NO, SC, sc_require, Sqwerl, window, YES*/

sc_require('models/TreeNode');

/**
 * Controller for user interface view that allows users to navigate through a hierarchy of things.
 */
Sqwerl.NavigationController = SC.TreeController.extend({

    allowsMultipleSelection: NO,

    /**
     * The id of this navigation controller's current thing. The ID of the thing that this controller is focused on.
     * {string}
     */
    current: null,

    /**
     * The names of the things on the path to this navigation controller's current thing.
     * {string}
     */
    currentPath: null,

    /**
     * The url to go to in order to go back to the previously displayed thing.
     */
    goBackUrl: '',

    /**
     * Functions that load data for list items.
     */
    itemLoadFunctions: {},

    /**
     * The indices (offsets) of things--within a collection of things--that we are currently downloading from
     * the server.
     */
    loadingOffsets: {},

    /**
     * The node that was previously selected.
     */
    oldSelectedNode: null,

    /**
     * The current node's parent node.
     */
    parent: null,

    /**
     * The name of the current node's parent node.
     */
    parentName: '',

    /**
     * Array of nodes that form a path to the current node.
     */
    trail: null,

    /**
     * Creates, and returns, a function that loads a node's children from the server.
     *
     * @param {number} offset           The node's offset (index within a collection of nodes).
     * @param {string} id               The node's unique identifier.
     * @param {number} childCount       The number of children the node has.
     * @param {number} childIndex       The starting index of the node's children to load.
     * @returns {function}              A function that loads a node's children's data from the server.
     */
    createLoadChildrenFunction: function (offset, id, childCount, childIndex) {
        'use strict';
        var controller = this,
            loadFunction = this.itemLoadFunctions[id + offset];
        if (!loadFunction) {
            loadFunction = function () {
                controller.loadChildren(offset, id, childCount, childIndex);
            };
            this.itemLoadFunctions[id + offset] = loadFunction;
        }
        return loadFunction;
    },

    /**
     * Goes to the home (initial, starting) location.
     */
    goHome: function () {
        'use strict';
        SC.routes.set('location', '');
    },

    /**
     * Navigates to the thing at the given path.
     *
     * @param {string} path             Path to a thing.
     * @param {function} errorCallback  Function to execute if unable to navigate.
     */
    goTo: function (path, errorCallback) {
        'use strict';
        var controller = this,
            id;
        SC.info('%@: Go to: %@', this, path);
        Sqwerl.mainPage.setNavigationBusy(true, this.oldSelectedNode);
        if (this.oldSelectedNode) {
            id = this.oldSelectedNode.get('id');
            Sqwerl.store.find(SC.Query.create({
                conditions: 'id = {id}',
                parameters: {
                    id: id,
                    onError: function (response) {
                        SC.error('%@: Could not fetch the thing with the id \'%@\'.', this, id);
                        Sqwerl.mainPage.setNavigationBusy(false);
                        controller.oldSelectedNode = null;
                        errorCallback(response);
                    },
                    onSuccess: function (results) {
                        Sqwerl.mainPage.showContent(controller.typeForId(id), results);
                        Sqwerl.mainPage.setNavigationBusy(false);
                        controller.oldSelectedNode = null;
                    }
                }
            }));
        } else {
            Sqwerl.store.find(SC.Query.create({
                conditions: 'id = {id}',
                parameters: {
                    id: ((path === '/') ? '/types/views/initial' : path) + '/summary?properties=children',
                    onError: function (response) {
                        SC.error('%@: Could not fetch data at \'%@\'.', this, path);
                        Sqwerl.mainPage.setNavigationBusy(false);
                        errorCallback(response);
                    },
                    onSuccess: function (results) {
                        controller.nodeFound(path, results, errorCallback);
                    }
                },
                recordType: Sqwerl.Thing
            }));
        }
    },

    /**
     * Navigates back up to the current node's parent node.
     */
    goUp: function () {
        'use strict';
        var current = this.get('current'),
            parent = this.get('parent'),
            parentId,
            target;
        parentId = (current ? (parent || current) : parent);
        if (parentId) {
            target = parentId.split('/').slice(0, parentId.length - 1).join('/');
            SC.routes.set('location', (target.length === 0) ? '/' : target);
        }
    },

    /**
     * Loads information, from a server, about a thing's children.
     *
     * @param {number} offset           The thing's offset (index within a collection of things).
     * @param {string} id               The thing's unique identifier.
     * @param {number} childCount       The number of children the thing has.
     * @param {number} childIndex       The starting index of the thing's children to load.
     */
    loadChildren: function (offset, id, childCount, childIndex) {
        'use strict';
        var controller = this;
        if (!this.loadingOffsets.hasOwnProperty(offset)) {
            this.loadingOffsets[offset] = '';
            Sqwerl.store.find(SC.Query.create({
                conditions: 'id={id}',
                parameters: {
                    id: id,
                    limit: 25,
                    offset: offset,
                    onSuccess: function (results) {
                        var children,
                            content = controller.get('content'),
                            i,
                            node;
                        children = content.get('children');
                        if (!children) {
                            children = new Array(childCount);
                            content.set('children', children);
                        }
                        for (i = 0; (i < 25) && ((i + offset) < childCount); i += 1) {
                            node = new Sqwerl.Node();
                            node.initialize(results.children.members[i]);
                            node.set('pathId', (id + '/' + node.get('id').split('/').pop()).replace(/ /g, '-'));
                            children[childIndex + i].load = null;
                            children[childIndex + i].set('node', node);
                        }
                        delete controller.itemLoadFunctions[id + offset];
                        delete controller.loadingOffsets[offset];
                    },
                    properties: 'children',
                    summary: true
                },
                recordType: Sqwerl.Thing
            }));
        }
    },

    nodeFound: function (path, results, errorCallback) {
        'use strict';
        var controller = this,
            current = this.get('current'),
            length,
            parent,
            pathComponents,
            trailComponents;
        if (results.hasOwnProperty('children') && (results.children.totalCount > 0)) {
            trailComponents = results.path.split('/');
            if (path === '/') {
                this.set('parent', null);
                this.set('parentName', '');
                this.set('goBackUrl', '');
                this.set('trail', {ids: ['/'], paths: ['/']});
                this.set('current', null);
                this.set('currentPath', null);
            } else {
                length = trailComponents.length;
                this.set('parent', '/' + trailComponents.slice(1, length - 1).join('/'));
                this.set('parentName', trailComponents[length - 2]);
                pathComponents = path.split('/');
                this.set('trail', {
                    ids: (pathComponents.length < 2) ? ['/'] : pathComponents.slice(0, pathComponents.length - 1),
                    names: trailComponents.slice(0, length - 1)
                });
                this.set('goBackUrl', '#' + encodeURI(pathComponents.slice(0, pathComponents.length - 1).join('/')));
                Sqwerl.mainPage.showContent(controller.typeForId(path), results);
                this.set('current', path);
                this.set('currentPath', results.path);
            }
            this.populate(results);
        } else {
            parent = this.get('parent');
            pathComponents = path.split('/');
            if (parent) {
                trailComponents = results.path.split('/');
                length = trailComponents.length;
                if (length > 0) {
                    if (current === pathComponents.slice(0, length - 1).join('/')) {
                        this.set('current', path);
                        this.set('currentPath', trailComponents.slice(0, trailComponents.length - 1).join('/'));
                    }
                    parent = current;
                    this.set('parent', current);
                }
                this.set('trail', {
                    ids: parent.split('/'),
                    names: this.get('currentPath').split('/')
                });
            } else {
                this.set('current', path);
                this.set('currentPath', results.path);
                trailComponents = path.split('/');
                length = trailComponents.length;
                if (length > 0) {
                    this.set('parent', trailComponents.slice(0, length - 1).join('/'));
                }
            }
        }
        Sqwerl.store.find(SC.Query.create({
            conditions: 'id = {id}',
            parameters: {
                id: (path === '/') ? '/types/views/initial' : path,
                onError: function (response) {
                    SC.error('%@: Could not fetch data at \'%@\'.', this, path);
                    Sqwerl.mainPage.setNavigationBusy(false);
                    errorCallback(response);
                },
                onSuccess: function (results) {
                    Sqwerl.mainPage.showContent((path === '/') ? 'home' : controller.typeForId(path), results);
                    Sqwerl.mainPage.setNavigationBusy(false);
                }
            }
        }));
    },

    /**
     * Invoked when the current node changes.
     */
    onSelectionChanged: Sqwerl.observes(function () {
        'use strict';
        var components,
            controller = this,
            id,
            node,
            path,
            pathComponents,
            selectedTreeNode,
            url;
        if (this.didChangeFor('selectionDidChange', 'selection')) {
            selectedTreeNode = this.getPath('selection.firstObject');
            if (selectedTreeNode) {
                node = selectedTreeNode.get('node');
                if (node) {
                    if (node.hasOwnProperty('childrenCount')) {
                        path = encodeURI(node.get('id'));
                        this.oldSelectedNode = null;
                        SC.routes.set('location', path.replace(/%20/g, '-'));
                    } else {
                        if (this.oldSelectedNode && (!this.oldSelectedNode.hasOwnProperty('childrenCount'))) {
                            components = this.get('current').split('/');
                            this.set('parent', components.slice(0, components.length).join('/'));
                        } else {
                            this.set('parent', this.get('current'));
                        }
                        pathComponents = this.get('currentPath').split('/');
                        this.set('goBackUrl', this.get('parent'));
                        this.set('parentName', pathComponents[pathComponents.length - 1]);
                        id = node.get('id');
                        components = id.split('/');
                        this.set('trail', { ids: this.get('parent').split('/'), names: this.get('currentPath').split('/') });
                        url = window.location.protocol + '//' +
                                window.location.host +
                                window.location.pathname + '#' +
                                encodeURI(controller.get('parent') + '/' + components.slice(-1)[0]).replace(/%20/g, '-');
                        if (this.oldSelectedNode && (id.split('/').slice(-1)[0] === this.oldSelectedNode.get('id').split('/').slice(-1)[0])) {
                            /* TODO - Refactor - Copied from goTo function.*/
                            Sqwerl.store.find(SC.Query.create({
                                conditions: 'id = {id}',
                                parameters: {
                                    id: id,
                                    onError: function (response) {
                                        SC.error('%@: Could not fetch the thing with the id \'%@\'.', this, id);
                                        Sqwerl.mainPage.setNavigationBusy(false);
                                        controller.oldSelectedNode = null;
                                        // TODO - Notify user of error.
                                    },
                                    onSuccess: function (results) {
                                        Sqwerl.mainPage.showContent(controller.typeForId(id), results);
                                        Sqwerl.mainPage.setNavigationBusy(false);
                                        controller.oldSelectedNode = null;
                                    }
                                }
                            }));
                            /* TODO - End Refactor */
                        }
                        this.oldSelectedNode = node;
                        window.location.assign(url);
                    }
                }
            } else {
                Sqwerl.mainPage.showContent('home', null);
            }
        }
    }, 'selection'),

    /**
     * Populates a navigation control with items.
     *
     * @param {object} data     Data that describes the things to display within a navigation control.
     */
    populate: function (data) {
        'use strict';
        var controller = this,
            oldRootNode = this.get('content'),
            rootNode;
        if (oldRootNode) {
            oldRootNode.children.forEach(function (childTreeNode) {
                childTreeNode.set('node', null);
            });
            oldRootNode.set('node', null);
            oldRootNode.set('children', null);
        }
        rootNode = Sqwerl.TreeNode.create({
            children: null,
            id: data.id,
            name: 'root',
            path: data.path,
            treeItemChildren: Sqwerl.property(function () {
                var children = [],
                    selectedTreeNode = controller.get('content'),
                    i,
                    j = 0,
                    totalChildCount = data.children.totalCount,
                    treeNode;
                if (!this.children) {
                    data.children.members.forEach(function (view) {
                        var node = new Sqwerl.Node();
                        node.id = view.id;
                        node.isSummary = true;
                        node.initialize(view);
                        node.set('pathId', (data.id + '/' + node.get('id').split('/').pop()).replace(/ /g, '-'));
                        treeNode = new Sqwerl.TreeNode();
                        treeNode.set('node', node);
                        treeNode.set('parentTreeNode', rootNode);
                        children.push(treeNode);
                    });
                    this.loadingOffsets = {};
                    for (i = children.length; i < totalChildCount; i += j) {
                        for (j = 0; (j < 25) && ((i + j) < totalChildCount); j += 1) {
                            treeNode = new Sqwerl.TreeNode();
                            treeNode.childIndex = i + j;
                            treeNode.set('shortDescription', 'treeController.loadingNodeShortDescription'.loc());
                            treeNode.load = controller.createLoadChildrenFunction(i, selectedTreeNode.get('id'), totalChildCount, treeNode.childIndex);
                            children.push(treeNode);
                        }
                    }
                    selectedTreeNode.children = children;
                } else {
                    Sqwerl.mainPage.mainPane.horizontalSplitView.navigationView.navigationScrollView.set('verticalScrollOffset', 0);
                }
                return this.children;
            }, 'guid').cacheable(),
            treeItemIsExpanded: YES
        });
        this.set('content', rootNode);
        Sqwerl.mainPage.mainPane.horizontalSplitView.navigationView.navigationScrollView.set('verticalScrollOffset', 0);
    },

    /**
     * Returns the unique identifier for the type of thing with the given ID.
     *
     * @param {string} id   A thing's unique identifier.
     * @returns {string}    The id of the thing's type.
     */
    typeForId: function (id) {
        'use strict';
        var components = id.split('/');
        return (components.length > 2) ? components[2] : 'types';
    }
});