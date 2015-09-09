/*globals SC, sc_require, Sqwerl*/

sc_require('models/Thing');

/**
 * Users: people or entities who use Sqwerl.
 */
Sqwerl.User = SC.Record.extend({

    'account': SC.Record.toOne('Sqwerl.Account', { isMaster: SC.NO }),

    'created': SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

    'description': SC.Record.attr(String),

    'emails': SC.Record.attr(String),

    'firstName': SC.Record.attr(String),

    'groups': SC.Record.toMany('Sqwerl.Group', { isMaster: SC.NO }),

    'handle': SC.Record.attr(String),

    'hasAttended': SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

    'hasListenedTo': SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

    'hasRead': SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

    'hasViewed': SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

    'lastName': SC.Record.attr(String),

    'middleNameOrInitial': SC.Record.attr(String),

    'name': SC.Record.attr(String),

    'owns': SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

    'shortDescription': SC.Record.attr(String)
});