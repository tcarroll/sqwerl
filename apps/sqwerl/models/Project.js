/*globals SC, sc_require, Sqwerl*/

sc_require('models/Thing');

/**
 * Named collections of tasks to accomplish.
 */
Sqwerl.Project = Sqwerl.Thing.extend({

    categories: SC.Record.toMany('Sqwerl.Category', { isMaster: SC.NO }),

    children: SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

    description: SC.Record.attr(String),

    links: SC.Record.attr('Sqwerl.Thing', { isMaster: SC.NO }),

    name: SC.Record.attr(String)
});