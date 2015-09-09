/*globals SC, sc_require, Sqwerl*/

sc_require('models/Thing');

/**
 * Key words or phrases that describe things, and that can be used to find and group similar things.
 */
Sqwerl.Tag = Sqwerl.Thing.extend({

    description: SC.Record.attr(String),

    tagged: SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.YES }),

    text: SC.Record.attr(String)
});