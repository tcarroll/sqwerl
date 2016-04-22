/*globals SC, Sqwerl*/

Sqwerl.Addition = SC.Record.extend({

    addedBy: SC.Record.toOne(Sqwerl.User),

    additions: SC.Record.toMany(Sqwerl.Thing),

    dateAdded: SC.Record.attr(SC.DateTime, { format: 'YYYYmmdd HH:MM:SS.sss Z'}),
});