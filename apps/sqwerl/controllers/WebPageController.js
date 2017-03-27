/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages a read-only views of web pages.
 */
Sqwerl.WebPageController = Sqwerl.ViewController.create({

  connectionCount: Sqwerl.property(function () {
    'use strict';
    return this.sumConnections(['authors', 'categories', 'feeds', 'links', 'notes', 'readBy', 'recommendations', 'recommendedBy', 'tags']);
  }),

  hasAuthors: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('authors');
  }),

  hasCategories: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('categories');
  }),

  hasFeeds: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('feeds');
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

  hasMultipleFeeds: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('feeds');
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
  })
});