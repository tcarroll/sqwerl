/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages read-only views of projects.
 */
Sqwerl.ProjectController = Sqwerl.ViewController.create({

    connectionCount: Sqwerl.property(function () {
        'use strict';
        return this.sumConnections(['categories', 'links']);
    }),

    hasCategories: Sqwerl.property(function () {
        'use strict';
        var categories = this.get('categories');
        return categories && (categories.childrenCount > 0);
    }),

    hasLinks: Sqwerl.property(function () {
        'use strict';
        var links = this.get('links');
        return links && (links.totalCount > 0);
    }),

    hasMultipleCategories: Sqwerl.property(function () {
        'use strict';
        var categories = this.get('categories');
        return categories && categories.totalCount > 0;
    }),

    hasMultipleLinks: Sqwerl.property(function () {
        'use strict';
        var links = this.get('links');
        return links && links.totalCount > 0;
    })
});

