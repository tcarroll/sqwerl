/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages read-only views of RSS feeds.
 */
Sqwerl.FeedController = Sqwerl.ViewController.create({

    connectionCount: Sqwerl.property(function () {
        'use strict';
        return this.sumConnections(['authors', 'categories', 'items', 'links', 'recommendations', 'recommendedBy', 'tags']) + ((this.get('webPage') ? 1 : 0) + (this.get('feedUrl') ? 1 : 0));
    }),

    /**
     * Returns a text string that is a relative URL to an RSS feed's web page.
     *
     * @returns {string} A URL.
     */
    feedWebPageLink: Sqwerl.property(function () {
        'use strict';
        var webPage = this.get('webPage');
        return webPage ? ('#' + webPage.id) : '';
    }),

    hasAuthors: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('authors');
    }),

    hasCategories: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('categories');
    }),

    hasItems: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('items');
    }),

    hasLinks: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('links');
    }),

    hasMultipleAuthors: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('authors');
    }),

    hasMultipleCategories: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('categories');
    }),

    hasMultipleItems: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('items');
    }),

    hasMultipleLinks: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('links');
    }),

    hasMultipleRecommendations: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('recommendations');
    }),

    hasMultipleTags: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('tags');
    }),

    hasNonEmptyCollectionOf: function (propertyName) {
        'use strict';
        var value = this.get(propertyName);
        return value && (value.totalCount > 0);
    },

    hasRecommendations: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('recommendations');
    }),

    hasRecommendedBy: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('recommendedBy');
    }),

    hasTags: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('tags');
    })
});