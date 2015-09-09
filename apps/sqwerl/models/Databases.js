/*globals SC, sc_require, Sqwerl*/

sc_require('models/Thing');

/**
 * Collections of databases of things.
 */
Sqwerl.Databases = Sqwerl.Thing.extend({

    children: SC.Record.toMany('Sqwerl.Database', { isMaster: SC.NO }),

    name: SC.Record.attr(String),

    shortDescription: SC.Record.attr(String)
});