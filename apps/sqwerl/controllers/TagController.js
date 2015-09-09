/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages read-only views of tags (keywords).
 */
Sqwerl.TagController = Sqwerl.ViewController.create({

    connectionCount: Sqwerl.property(function () {
        'use strict';
        return this.sumConnections(['categories', 'notes', 'tagged']);
    }),

    hasCategories: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('categories');
    }),

    hasMultipleCategories: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('categories');
    }),

    hasMultipleTagged: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('tagged');
    }),

    hasNotes: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('notes');
    }),

    hasTagged: Sqwerl.property(function () {
        'use strict';
        var tagged = this.get('tagged');
        return tagged && (tagged.totalCount > 0);
    })
});

