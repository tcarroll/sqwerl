/*globals SC, sc_require, Sqwerl*/

sc_require('models/Thing');

/**
 * Groups of related users.
 */
Sqwerl.Group = Sqwerl.Thing.extend({

    'description': SC.Record.attr(String),

    'name': SC.Record.attr(String),

    'parent': SC.Record.toOne('Sqwerl.Group', { isMaster: SC.NO }),

    'roles': SC.Record.toMany('Sqwerl.Role', { isMaster: SC.NO }),

    'subgroups': SC.Record.toMany('Sqwerl.Group', { isMaster: SC.YES }),

    'users': SC.Record.toMany('Sqwerl.User', { isMaster: SC.NO })
});