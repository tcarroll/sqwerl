/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages read-only views of application users.
 */
Sqwerl.UserController = Sqwerl.ViewController.create({

  connectionCount: Sqwerl.property(function () {
    'use strict';
    return this.sumConnections(['groups', 'hasAttended', 'hasListenedTo', 'hasRead', 'hasViewed', 'owns']);
  }),

  hasGroups: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('groups');
  }),

  hasHasAttended: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('hasAttended');
  }),

  hasHasListenedTo: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('hasListenedTo');
  }),

  hasHasRead: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('hasRead');
  }),

  hasHasViewed: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('hasViewed');
  }),

  hasIsReading: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('isReading');
  }),

  hasMultipleGroups: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('groups');
  }),

  hasMultipleHasAttended: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('hasAttended');
  }),

  hasMultipleHasListenedTo: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('hasListenedTo');
  }),

  hasMultipleHasRead: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('hasRead');
  }),

  hasMultipleHasViewed: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('hasViewed');
  }),

  hasMultipleIsReading: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('isReading');
  }),

  hasMultipleOwns: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('owns');
  }),

  hasOwns: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('owns');
  })
});