/*globals SC, sc_require, Sqwerl*/

sc_require('models/Thing');

/**
 * Named collections of related things.
 */
Sqwerl.Category = Sqwerl.Thing.extend({

    categories: SC.Record.toMany('Sqwerl.Category', { isMaster: SC.NO }),

    children: SC.Record.toMany('Sqwerl.Category', { isMaster: SC.YES }),

    description: SC.Record.attr(String),

    name: SC.Record.attr(String)
});