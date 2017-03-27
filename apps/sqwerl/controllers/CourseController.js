/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages read-only views of academic courses.
 */
Sqwerl.CourseController = Sqwerl.ViewController.create({

  attendedByCount: Sqwerl.property(function () {
    return this.sumConnections(['attendedBy']);
  }),

  categoriesCount: Sqwerl.property(function () {
    return this.sumConnections(['categories']);
  }),

  connectionCount: Sqwerl.property(function () {
    'use strict';
    return this.sumConnections(['attendedBy', 'categories', 'instructors', 'links', 'notes', 'recommendations', 'recommendedBy', 'tags']);
  }),

  hasAttendedBy: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('attendedBy');
  }),

  hasCategories: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('categories');
  }),

  hasInstructors: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('instructors');
  }),

  hasLinks: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('links');
  }),

  hasMultipleAttendedBy: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('attendedBy');
  }),

  hasMultipleCategories: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('categories');
  }),

  hasMultipleInstructors: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('instructors');
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

  hasTags: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('tags');
  }),

  instructorsCount: Sqwerl.property(function () {
    return this.sumConnections(['instructors']);
  }),

  linksCount: Sqwerl.property(function () {
    return this.sumConnections(['links']);
  })
});