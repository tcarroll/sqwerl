/*globals SC, sc_require, Sqwerl*/

sc_require('models/Thing');

/**
 * People, or entities, who have authored a work.
 */
Sqwerl.Author = Sqwerl.Thing.extend({

    authorOf: SC.Record.toMany(Sqwerl.Thing, { isMaster: SC.NO }),

    description: SC.Record.attr(String),

    firstName: SC.Record.attr(String),

    instructed: SC.Record.toMany('Sqwerl.Course', { isMaster: SC.NO }),

    lastName: SC.Record.attr(String),

    linkedInUrl: SC.Record.attr(String),

    links: SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

    middleNameOrInitial: SC.Record.attr(String),

    spokeAt: SC.Record.toMany('Sqwerl.Talk', { isMaster: SC.NO }),

    tags: SC.Record.toMany('Sqwerl.Tag', { isMaster: SC.NO })
});
