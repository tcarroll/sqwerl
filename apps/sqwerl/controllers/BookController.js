/*globals sc_require, Sqwerl, window*/

sc_require('controllers/ViewController');

/**
 * Controller that manages read-only views of books.
 */
Sqwerl.BookController = Sqwerl.ViewController.create({

    /**
     * {Boolean}
     */
    isLinkGraphVisible: false,

    connectionCount: Sqwerl.property(function () {
        'use strict';
        return this.sumConnections(['authors', 'categories', 'comments', 'links', 'notes', 'readBy', 'recommendations', 'recommendedBy', 'tags']);
    }),

    displayLinks: Sqwerl.property(function () {
        'use strict';
        return this.isLinkGraphVisible ? 'display: block' : 'display: none';
    }, 'isLinkGraphVisible'),

    displayProperties: Sqwerl.property(function () {
        'use strict';
        return this.isLinkGraphVisible ? 'display: none' : 'display: block';
    }, 'isLinkGraphVisible'),

    graphUrl: Sqwerl.property(function () {
        'use strict';
        var baseUri = window.location.href;
        if (baseUri && baseUri.endsWith('/graph')) {
            baseUri = baseUri.slice(0, baseUri.length - 6);
        }
        baseUri += '/graph';
        return baseUri;
    }),

    hasAuthors: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('authors');
    }),

    hasCategories: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('categories');
    }),

    hasComments: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('comments');
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

    hasMultipleComments: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('comments');
    }),

    hasMultipleLinks: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('links');
    }),

    hasMultipleNotes: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('notes');
    }),

    hasMultipleReadBy: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('readBy');
    }),

    hasMultipleRecommendations: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('recommendations');
    }),

    hasMultipleTags: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('tags');
    }),

    hasNotes: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('notes');
    }),

    hasRead: Sqwerl.property(function () {
        'use strict';
        // TODO
        return false;
    }),

    hasReadBy: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('readBy');
    }),

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
    }),

    thumbnailFileName: Sqwerl.property(function () {
        'use strict';
        var fileName = this.get('thumbnail');
        return fileName || '';
    }),

    toggleView: function () {
        'use strict';
        this.set('isLinkGraphVisible', !this.get('isLinkGraphVisible'));
        this.notifyPropertyChange('displayLinks');
        this.notifyPropertyChange('displayProperties');
    }
});