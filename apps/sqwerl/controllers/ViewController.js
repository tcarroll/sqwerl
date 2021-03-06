/*globals SC, Sqwerl*/

/**
 * Base controller for all of view controllers.
 *
 * @type {SC.ObjectController}
 */
Sqwerl.ViewController = SC.ObjectController.extend({

  /**
   * Maps the names of the types of things to the names of the CSS classes of each type's icon.
   */
  typesToIcons: {
    '': 'ti-folder',
    'articles': 'ti-gallery',
    'authors': 'ti-pencil',
    'books': 'ti-book',
    'capabilities': 'ti-folder',
    'categories': 'ti-folder',
    'courses': 'ti-folder',
    'databases': 'ti-server',
    'documents': 'ti-files',
    'feeds': 'ti-rss-alt',
    'groups': 'ti-folder',
    'notes': 'ti-notepad',
    'papers': 'ti-file',
    'roles': 'ti-folder',
    'tags': 'ti-tag',
    'types': 'ti-folder',
    'users': 'ti-user',
    'videos': 'ti-video-clapper',
    'views': 'ti-folder',
    'webPages': 'ti-world'
  },

  /**
   * Returns the number of connections (links) that this thing has to other things as a string of how users
   * expect numbers to be formatted.
   *
   * @return {string} Text that corresponds to an integer number that is the number of outgoing links from this
   *                  thing to other related things.
   */
  connectionCountText: Sqwerl.property(function () {
    'use strict';
    let connectionCount = this.connectionCount;
    let text = '';
    if (connectionCount && (typeof connectionCount === 'function')) {
      text = this.connectionCount().toLocaleString();
    }
    return text;
  }),

  /**
   * Returns the total count of items in the value of the this view's property with the given name.
   *
   * @param {string} propertyName     Name of one of this view's properties whose value is a summary of a
   *                                  collection of things.
   * @returns {number} Non-negative integer.
   */
  count: function (propertyName) {
    'use strict';
    var value = this.get(propertyName);
    return value ? (value.hasOwnProperty('totalCount') ? value.totalCount : 1) : 0;
  },

  /**
   * Returns whether the total count of items in the value of this view's property with the given name is greater
   * than zero.
   *
   * @param {string} propertyName     Name of one of this view's properties whose value is a summary of a collection
   *                                  of things.
   * @returns {boolean}               True if the collection contains at least one member.
   */
  hasAtLeastOne: function (propertyName) {
    'use strict';
    var value = this.get(propertyName);
    return value && value.hasOwnProperty('totalCount') ? (value.get('totalCount') > 0) : false;
  },

  /**
   * Is this view's thing connected (linked) to other things?
   *
   * @returns {boolean} true if this view's thing is connected (linked) to other things.
   */
  hasConnections: Sqwerl.property(function () {
    'use strict';
    return this.get('connectionCount') > 0;
  }),

  /**
   * Returns whether the total count of items in the value of this view's property with the given name is greater
   * than one.
   *
   * @param {string} propertyName     Name of one of this view's properties whose value is a summary of a collection
   *                                  of things.
   * @returns {boolean}               True if the collection contains more than one member.
   */
  hasMoreThanOne: function (propertyName) {
    'use strict';
    var collection = this.get(propertyName);
    return collection && (collection.totalCount > 1);
  },

  /**
   * Is the current user signed in to an account?
   *
   * @returns {Boolean} true if the user is signed into an account (authenticated), false if the user is a guest user.
   */
  isSignedIn: Sqwerl.property(function () {
    return Sqwerl.isSignedIn();
  }),

  /**
   * Does this view's thing has more than one connection (link) to other things?
   *
   * @returns {boolean} true if this view's thing is linked to more than one other thing.
   */
  hasMultipleConnections: Sqwerl.property(function () {
    'use strict';
    return this.get('connectionCount') > 1;
  }),

  /**
   * Returns an HTML anchor link to the value of this thing's url property.
   *
   * @return {string} HTML markup for an <a> (anchor or hyperlink) tag.
   */
  pageLink: Sqwerl.property(function () {
    'use strict';
    return '<a href="' + encodeURI(this.get('url')) + '" target="_blank">' + this.get('name') + '</a>';
  }),

  /**
   * Returns the sum of items in the collections of things stored in this view's properties with the given names.
   *
   * @param {array} propertyNames     Array of names of this view's properties whose values are collections of things.
   * @returns {number}                Non-negative integer.
   */
  sumConnections: function (propertyNames) {
    'use strict';
    var controller = this,
      sum = 0;
    propertyNames.forEach(function (propertyName) {
      sum += controller.count(propertyName);
    });
    return sum;
  },

  /**
   * Returns the name of a CSS style for an icon that represents the model's type of thing.
   *
   * @returns {string} A non-null string.
   */
  typeIcon: Sqwerl.property(function () {
    'use strict';
    var id = this.get('id'),
      typeName = '';
    if (id) {
      typeName = Sqwerl.idToTypeId(id);
    }
    return this.typesToIcons[typeName];
  })
});