/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages read-only views of podcasts.
 */
Sqwerl.PodcastController = Sqwerl.ViewController.create({

  connectionCount: Sqwerl.property(function () {
    'use strict';
    return this.sumConnections([
        'authors',
        'categories',
        'episodes',
        'links',
        'listeners',
        'recommendations',
        'recommendedBy',
        'tags'
      ]) +
      ((this.get('webPage') ? 1 : 0) + (this.get('feedUrl') ? 1 : 0)
      );
  }),

  /**
   * Returns a text string that is a relative URL to a podcast's web page.
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

  hasEpisodes: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('episodes');
  }),

  hasLinks: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('links');
  }),

  hasListeners: Sqwerl.property(function () {
    'use strict';
    return this.hasAtLeastOne('listeners');
  }),

  hasMultipleAuthors: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('authors');
  }),

  hasMultipleCategories: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('categories');
  }),

  hasMultipleEpisodes: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('episodes');
  }),

  hasMultipleLinks: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('links');
  }),

  hasMultipleListeners: Sqwerl.property(function () {
    'use strict';
    return this.hasMoreThanOne('listeners');
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

  /**
   * Returns an HTML anchor link to the value of this podcast's subscription URL.
   *
   * @return {string} HTML markup for an <a> (anchor or hyperlink) tag.
   */
  pageLink: Sqwerl.property(function () {
    return '<a href="' + encodeURI(this.get('feedUrl')) + '" target="_blank">' + this.get('name') + '</a>';
  })
});