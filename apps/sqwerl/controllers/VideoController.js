/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages read-only views of videos.
 */
Sqwerl.VideoController = Sqwerl.ViewController.create({

  connectionCount: Sqwerl.property(function () {
    'use strict';
    return this.sumConnections(['authors', 'categories', 'links', 'notes', 'tags', 'recommendations', 'recommendedBy', 'viewedBy']);
  }),

  hasAuthors: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('authors');
  }),

  hasCategories: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('categories');
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

  hasMultipleLinks: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('links');
  }),

  hasMultipleNotes: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('notes');
  }),

  hasMultipleRecommendations: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('recommendations');
  }),

  hasMultipleRecommendedBy: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('recommendedBy');
  }),

  hasMultipleTags: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('tags');
  }),

  hasMultipleViewedBy: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('viewedBy');
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

  hasTags: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('tags');
  }),

  hasViewedBy: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('viewedBy');
  })
});