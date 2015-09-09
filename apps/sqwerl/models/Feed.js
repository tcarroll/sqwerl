/*globals SC, sc_require, Sqwerl*/

sc_require('models/Thing');

/**
 * RSS feeds.
 */
Sqwerl.Feed = Sqwerl.Thing.extend({

    'authors': SC.Record.toMany('Sqwerl.Author', { isMaster: SC.NO }),

    'categories': SC.Record.toMany('Sqwerl.Category', { isMaster: SC.NO }),

    'description': SC.Record.attr(String),

    'feedUrl': SC.Record.attr(String),

    'items': SC.Record.toMany('Sqwerl.WebPage', { isMaster: SC.NO }),

    'links': SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

    'name': SC.Record.attr(String),

    'recommendations': SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

    'recommendedBy': SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

    'tags': SC.Record.toMany('Sqwerl.Tag', { isMaster: SC.NO }),

    'webPage': SC.Record.toOne('Sqwerl.WebPage', { isMaster: SC.NO })
});