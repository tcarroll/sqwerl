/*globals SC, sc_require, Sqwerl*/

sc_require('models/Thing');

/**
 * Talks or presentations given to an audience.
 */
Sqwerl.Talk = Sqwerl.Thing.extend({

    'attendedBy': SC.Record.toMany('Sqwerl.User', { isMaster: SC.NO }),

    'categories': SC.Record.toMany('Sqwerl.Category', { isMaster: SC.NO }),

    'description': SC.Record.attr(String),

    'listeners': SC.Record.toMany('Sqwerl.User', { isMaster: SC.NO }),

    'name': SC.Record.attr(String),

    'notes': SC.Record.toMany('Sqwerl.Note', { isMaster: SC.NO }),

    'recommendations': SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

    'recommendedBy': SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

    'speakers': SC.Record.toMany('Sqwerl.Authors', { isMaster: SC.NO }),

    'tags': SC.Record.toMany('Sqwerl.Tag', { isMaster: SC.NO })
});