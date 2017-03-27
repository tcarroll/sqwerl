/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages read-only views of categories.
 *
 * @type {Sqwerl.ViewController}
 */
Sqwerl.CategoryController = Sqwerl.ViewController.create({

  childCount: Sqwerl.property(function () {
    'use strict';
    var children = this.get('children');
    return children ? children.get('totalCount') : 0;
  }),

  /**
   * Returns text that indicates the number of this category's children in a way that users expect numbers to be
   * formatted.
   *
   * @return {string} Text that corresponds to an integer number that is this category's number of children.
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