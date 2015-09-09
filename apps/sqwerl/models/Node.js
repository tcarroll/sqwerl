/*globals NO, SC, Sqwerl, static_url, YES*/

/**
 * Persistent things.
 */
Sqwerl.Node = SC.Object.extend({
    /**
     * The number of child nodes this node has.
     * {Number}
     */
    childrenCount: 0,

    /**
     * This node's unique identifier.
     * {String}
     */
    id: null,

    /**
     * Does this node provide a summary of a persistent thing's state? If false then this node contains all of
     * a persistent thing's state (rather than just a summary).
     * {Boolean}
     */
    isSummary: NO,

    /**
     * This node's name.
     * {String}
     */
    name: '',

    /**
     * Prefix for keys to internationalized text that describes nodes.
     */
    prefix: 'node.',

    /**
     * Text that briefly describes this node.
     * {String}
     */
    shortDescription: '',

    /**
     * This node's title.
     * {String}
     */
    title: '',

    /**
     * Returns this node's name that should be used when sorting nodes alphabetically.
     *
     * @return {String} A non-null, possibly empty, string.
     */
    getSortKey: function () {
        'use strict';
        var sortKey = '';
        if (this.hasOwnProperty('sortKey')) {
            sortKey = this.sortKey;
        } else {
            sortKey = this.name;
        }
        return sortKey || '';
    },

    /**
     * Initializes this node's state from a given object's values.
     *
     * @param {Object} data     This node's required, initial state.
     */
    initialize: function (data) {
        'use strict';
        var p;
        for (p in data) {
            if (data.hasOwnProperty(p)) {
                this[p] = data[p];
            }
        }
        this.record = data;
    },

    /**
     * Returns an icon to use to represent this node.
     *
     * @returns An icon or null.
     */
    itemIcon: Sqwerl.property(function () {
        'use strict';
        return Sqwerl.Node.typeIcons[this.get('typeId')];
    }),

    /**
     * Returns the title string for the icon that represents this node.
     *
     * @returns A string or null.
     */
    itemIconTitle: Sqwerl.property(function () {
        'use strict';
        return Sqwerl.Node.typeIconTitles[this.get('typeId')];
    }),

    /**
     * Returns the plural (lower-cased) name for this type of node.
     *
     * @returns A string or null.
     */
    pluralTypeName: Sqwerl.property(function () {
        'use strict';
        return this.pluralTypeNameForTypeNamed(this.get('typeId'));
    }),

    /**
     * Returns a (lower-cased) plural name to use to label things of a given type.
     *
     * @param typeName  Required unique name of a type of node.
     * @returns A non-null, possibly empty, string.
     */
    pluralTypeNameForTypeNamed: Sqwerl.property(function (typeName) {
        'use strict';
        return (this.prefix + typeName + '.pluralName').loc();
    }),

    /**
     * Returns a (lower-cased) name to use to label a single thing of a given type.
     *
     * @param typeName      Required unique name of a type of node.
     * @returns A non-null, possibly empty, string.
     */
    singularNameForTypeNamed: function (typeName) {
        'use strict';
        return (this.prefix + typeName + '.singularName').loc();
    },

    /**
     * Returns the unique identifier for this node's type.
     *
     * @returns A string or null.
     */
    typeId: Sqwerl.property(function () {
        'use strict';
        var components = this.get('id').split('/');
        return (components.length > 2) ? components[2] : 'types';
    }),

    /**
     * Returns the unique name for this node's type.
     *
     * @returns A non-null, possibly empty, string.
     */
    typeName: Sqwerl.property(function () {
        'use strict';
        return (this.prefix + this.get('typeId') + '.name').loc();
    })
});

Sqwerl.Node.mixin({
    /**
     * Id's for the icons that represent types of nodes.
     */
    typeIcons: {
        'accounts': 'ti-id-badge',
        'actions': 'ti-bolt-alt',
        'articles': 'ti-gallery',
        'authors': 'ti-pencil',
        'books': 'ti-book',
        'capabilities': 'ti-unlock',
        'categories': 'ti-folder',
        'courses': 'ti-medal-alt',
        'databases': 'ti-server',
        'documents': 'ti-files',
        'facets': 'ti-target',
        'feeds': 'ti-rss-alt',
        'groups': 'ti-user',
        'notes': 'ti-notepad',
        'papers': 'ti-file',
        'podcasts': 'ti-file',
        'projects': 'ti-calendar',
        'roles': 'ti-face-smile',
        'tags': 'ti-tag',
        'talks': 'ti-comment',
        'tasks': 'ti-check-box',
        'types': 'ti-folder',
        'users': 'ti-user',
        'videos': 'ti-video-clapper',
        'views': 'ti-eye',
        'webPages': 'ti-world'
    },

    /**
     * The titles for the icons that represent this types of nodes.
     */
    typeIconTitles: {
        'accounts': 'Account',
        'actions': 'Action',
        'articles': 'Article',
        'authors': 'Author',
        'books': 'Book',
        'capabilities': 'Capability',
        'categories': 'Category',
        'courses': 'Course',
        'databases': 'Database',
        'documents': 'Document',
        'facets': 'Facet',
        'feeds': 'Feed',
        'groups': 'Group',
        'notes': 'Notes',
        'papers': 'Paper',
        'projects': 'Project',
        'roles': 'Role',
        'tags': 'Tag',
        'talks': 'Talk',
        'tasks': 'Task',
        'types': 'Type',
        'users': 'User',
        'videos': 'Video',
        'views': 'View',
        'webPages': 'Web page'
    }
});