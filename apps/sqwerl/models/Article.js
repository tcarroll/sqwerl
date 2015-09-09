/*globals SC, sc_require, Sqwerl*/

sc_require('models/Thing');

/**
 * Published articles.
 */
Sqwerl.Article = Sqwerl.Thing.extend({

    'authors': SC.Record.toMany('Sqwerl.Author', { isMaster: SC.NO }),

    'categories': SC.Record.toMany('Sqwerl.Category', { isMaster: SC.NO }),

    'description': SC.Record.attr(String),

    'links': SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

    'name': SC.Record.attr(String),

    'notes': SC.Record.toMany('Sqwerl.Note', { isMaster: SC.NO }),

    'readBy': SC.Record.toMany('Sqwerl.User', { isMaster: SC.NO }),

    'recommendations': SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

    'recommendedBy': SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

    'tags': SC.Record.toMany('Sqwerl.Tag', { isMaster: SC.NO })
});