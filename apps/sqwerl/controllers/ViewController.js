/*globals SC, Sqwerl*/

Sqwerl.ViewController = SC.ObjectController.extend({

    /**
     * Maps the names of the types of things to the names of the CSS classes of each type's icon.
     */
    typesToIcons: {
        '': 'ti-folder',
        'articles': 'ti-gallery',
        'authors': 'ti-pencil',
        'books': 'ti-book',
        'capabilities': 'ti-folder',
        'categories': 'ti-folder',
        'courses': 'ti-folder',
        'databases': 'ti-server',
        'documents': 'ti-files',
        'feeds': 'ti-rss-alt',
        'groups': 'ti-folder',
        'notes': 'ti-notepad',
        'papers': 'ti-file',
        'roles': 'ti-folder',
        'tags': 'ti-tag',
        'types': 'ti-folder',
        'users': 'ti-user',
        'videos': 'ti-video-clapper',
        'views': 'ti-folder',
        'webPages': 'ti-world'
    },

    /**
     * Returns the total count of items in the value of the this view's property with the given name.
     *
     * @param {string} propertyName     Required name of one of this view's properties whose value is a summary of a colletion of things.
     * @returns {number} Non-negative integer.
     */
    count: function (propertyName) {
        'use strict';
        var value = this.get(propertyName);
        return value ? (value.hasOwnProperty('totalCount') ? value.totalCount : 1) : 0;
    },

    /**
     * Returns whether the total count of items in the value of this view's property with the given name is greater than zero.
     *
     * @param {string} propertyName     Required name of one of this view's properties whose value is a summary of a colletion of things.
     * @returns {boolean}               True if the collection contains at least one member.
     */
    hasAtLeastOne: function (propertyName) {
        'use strict';
        var value = this.get(propertyName);
        return value && value.hasOwnProperty('totalCount') ? (value.get('totalCount') > 0) : false;
    },

    /**
     * Is this view's thing connected (linked) to other things?
     *
     * @returns {boolean} true if this view's thing is connected (linked) to other things.
     */
    hasConnections: Sqwerl.property(function () {
        'use strict';
        return this.get('connectionCount') > 0;
    }),

    /**
     * Returns whether the total count of items in the value of this view's property with the given name is greater than one.
     *
     * @param {string} propertyName     Required name of one of this view's properties whose value is a summary of a collection of things.
     * @returns {boolean}               True if the collection contains more than one member.
     */
    hasMoreThanOne: function (propertyName) {
        'use strict';
        var collection = this.get(propertyName);
        return collection && (collection.totalCount > 1);
    },

    /**
     * Does this view's thing has more than one connection (link) to other things?
     *
     * @returns {boolean} true if this view's thing is linked to more than one other thing.
     */
    hasMultipleConnections: Sqwerl.property(function () {
        'use strict';
        return this.get('connectionCount') > 1;
    }),

    /**
     * Returns the sum of items in the collections of things stored in this view's properties with the given names.
     *
     * @param {array} propertyNames     Required array of names of this view's properties whose values are collections of things.
     * @returns {number}                Non-negative integer.
     */
    sumConnections : function (propertyNames) {
        'use strict';
        var sum = 0,
            that = this;
        propertyNames.forEach(function (propertyName) {
            sum += that.count(propertyName);
        });
        return sum;
    },

    /**
     * Returns the name of a CSS style for an icon that represents the model's type of thing.
     * @returns {string} A non-null string.
     */
    typeIcon: Sqwerl.property(function () {
        'use strict';
        var components,
            id = this.get('id'),
            typeName = '';
        if (id) {
            components = this.get('id').split('/');
            typeName = (components.length > 2) ? components[2] : (components.length > 0) ? components[1] : '';
        }
        return this.typesToIcons[typeName];
    })
});