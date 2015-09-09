/*globals SC, sc_require, Sqwerl*/

sc_require('models/Thing');

/**
 * Named locations where types of things are defined and where things are stored.
 */
Sqwerl.Database = Sqwerl.Thing.extend({

    description: SC.Record.attr(String),

    name: SC.Record.attr(String),

    shortDescription: SC.Record.attr(String)
});