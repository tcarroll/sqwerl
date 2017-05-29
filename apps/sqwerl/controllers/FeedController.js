/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages read-only views of RSS feeds.
 *
 * @type {Sqwerl.ViewController}
 */
Sqwerl.FeedController = Sqwerl.ViewController.create({

  connectionCount: Sqwerl.property(function () {
    'use strict';
    return this.sumConnections([
        'authors',
        'categories',
        'items',
        'links',
        'recommendations',
        'recommendedBy',
        'tags'
      ]) +
        ((this.get('webPage') ? 1 : 0)
    );
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

  hasMultipleRecommendedBy: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('recommendedBy');
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
  }),

  itemCount: Sqwerl.property(function () {
    'use strict';
    let items = this.get('items');
    return items && items.totalCount ? items.totalCount : 0;
  }),

  itemCountText: Sqwerl.property(function () {
     return this.itemCount().toLocaleString();
  }),

  /**
   * Returns an HTML anchor link to the value of this feed's subscription URL.
   *
   * @return {string} HTML markup for an <a> (anchor or hyperlink) tag.
   */
  pageLink: Sqwerl.property(function () {
    'use strict';
    return '<a href="' + encodeURI(this.get('feedUrl')) + '" target="_blank">' + this.get('name') + '</a>';
  })
});