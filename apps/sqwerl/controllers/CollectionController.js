/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages read-only views of collections of things.
 */
Sqwerl.CollectionController = Sqwerl.ViewController.create({

    childCount: Sqwerl.property(function () {
        'use strict';
        var children = this.get('children');
        return children ? children.get('totalCount') : 0;
    }),

    hasChildren: Sqwerl.property(function () {
        'use strict';
        var children = this.get('children');
        return children && (children.totalCount > 0);
    }),

    hasMultipleChildren: Sqwerl.property(function () {
        'use strict';
        var children = this.get('children');
        return children && (children.totalCount > 1);
    })
});