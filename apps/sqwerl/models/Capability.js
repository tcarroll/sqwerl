/*globals SC, sc_require, Sqwerl*/

sc_require('models/Thing');

/**
 * Actions that users are granted permission to perform.
 */
Sqwerl.Capability = Sqwerl.Thing.extend({

    name: SC.Record.attr(String),

    roles: SC.Record.toMany('Sqwerl.Role', { isMaster: SC.NO })
});
