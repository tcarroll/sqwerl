/*globals SC, sc_require, Sqwerl*/

sc_require('models/Thing');

/**
 * Types of things. Definitions of the properties shared by things of the same type.
 */
Sqwerl.Type = Sqwerl.Thing.extend({

    'children': SC.Record.toMany('Sqwerl.Type', { isMaster: SC.NO }),

    'description': SC.Record.attr(String),

    'name': SC.Record.attr(String),

    'shortDescription': SC.Record.attr(String),

    'version': SC.Record.attr(String)
});