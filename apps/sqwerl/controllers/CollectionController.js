/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages read-only views of collections of things.
 *
 * @type {Sqwerl.ViewController}
 */
Sqwerl.CollectionController = Sqwerl.ViewController.create({

  childCount: Sqwerl.property(function () {
    'use strict';
    var children = this.get('children');
    return children ? children.get('totalCount') : 0;
  }),

  /**
   * Returns the number of items in this collection in a way that users expect numbers to be formatted.
   *
   * @return {string} Text that corresponds to an integer number that is the number of items in this collection
   */
  childCountText: Sqwerl.property(function () {
    'use strict';
    return this.childCount().toLocaleString();
  }),

  hasChildren: Sqwerl.property(function () {
    'use strict';
    var children = this.get('children');
    return children && (children.totalCount > 0);
  }),

  hasMultipleChildren: Sqwerl.property(function () {
    'use strict';
    var children = this.get('children');
    return children && (children.totalCount > 1);
  })
});