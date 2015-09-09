/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/** @class
 *
 * Controller that manages read-only views of definitions of types of things.
 *
 * @extends Sqwerl.ViewController
 */
Sqwerl.TypeController = Sqwerl.ViewController.create({

    childCount: Sqwerl.property(function () {
        'use strict';
        return this.get('children').get('totalCount');
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

