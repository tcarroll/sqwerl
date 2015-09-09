/*globals SC, sc_require, Sqwerl*/

sc_require('models/Thing');

/**
 * Users' accounts that allow them to use Sqwerl.
 */
Sqwerl.Account = Sqwerl.Thing.extend({

    shortDescription: SC.Record.attr(String),

    user: SC.Record.toOne('Sqwerl.User', { isMaster: SC.NO })
});