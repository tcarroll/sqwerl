/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages read-only views of talks.
 */
Sqwerl.TalkController = Sqwerl.ViewController.create({

    connectionCount: Sqwerl.property(function () {
        'use strict';
        return this.sumConnections(['attendedBy', 'categories', 'links', 'listeners', 'notes', 'recommendations', 'recommendedBy', 'speakers', 'tags']);
    }),

    hasAttendedBy: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('attendedBy');
    }),

    hasCategories: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('categories');
    }),

    hasLinks: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('links');
    }),

    hasListeners: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('listeners');
    }),

    hasMultipleAttendedBy: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('attendedBy');
    }),

    hasMultipleCategories: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('categories');
    }),

    hasMultipleLinks: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('links');
    }),

    hasMultipleListeners: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('listeners');
    }),

    hasMultipleNotes: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('notes');
    }),

    hasMultipleRecommendations: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('recommendations');
    }),

    hasMultipleSpeakers: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('speakers');
    }),

    hasMultipleTags: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('tags');
    }),

    hasNotes: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('notes');
    }),

    hasRecommendations: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('recommendations');
    }),

    hasRecommendedBy: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('recommendedBy');
    }),

    hasSpeakers: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('speakers');
    }),

    hasTags: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('tags');
    })
});

