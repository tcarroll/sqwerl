/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages read-only views of pictures.
 */
Sqwerl.PictureController = Sqwerl.ViewController.create({

  connectionCount: Sqwerl.property(function () {
    'use strict';
    return this.sumConnections(['authors', 'categories', 'links', 'tags']);
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

  hasMultipleTags: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('tags');
  }),

  hasTags: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('tags');
  })
});