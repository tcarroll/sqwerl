/*globals SC, sc_require, Sqwerl*/

sc_require('models/Thing');

/**
 * Arrangements of things collected together for viewing and browsing.
 */
Sqwerl.View = Sqwerl.Thing.extend({

    children: SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

    description: SC.Record.attr(String),

    name: SC.Record.attr(String)
});