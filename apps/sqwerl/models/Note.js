/*globals SC, sc_require, Sqwerl*/

sc_require('models/Thing');

/**
 * Notes that summarize other things.
 */
Sqwerl.Note = Sqwerl.Thing.extend({

    done: SC.Record.attr(Boolean),

    name: SC.Record.attr(String),

    notesFor: SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

    representations: SC.Record.attr('Sqwerl.Representation', { isMaster: SC.YES })
});
