/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages read-only views of authors.
 */
Sqwerl.AuthorController = Sqwerl.ViewController.create({

    connectionCount: Sqwerl.property(function () {
        'use strict';
        return this.sumConnections(['authorOf', 'instructed', 'linkedInUrl', 'links', 'spokeAt', 'tags']);
    }),

    hasAuthorOf: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('authorOf');
    }),

    hasInstructed: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('instructed');
    }),

    hasLinks: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('links');
    }),

    hasMultipleAuthorOf: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('authorOf');
    }),

    hasMultipleInstructed: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('instructed');
    }),

    hasMultipleLinks: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('links');
    }),

    hasMultipleSpokeAt: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('spokeAt');
    }),

    hasMultipleTags: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('tags');
    }),

    hasSpokeAt: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('spokeAt');
    }),

    hasTags: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('tags');
    })
});
