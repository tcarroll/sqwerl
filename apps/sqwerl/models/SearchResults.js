/*globals SC, Sqwerl*/

Sqwerl.SearchResults = SC.Record.extend({

    'limit': SC.Record.attr(Number),

    'offset': SC.Record.attr(Number),

    'searchItems': SC.Record.toMany('Sqwerl.SearchItem', { isMaster: SC.YES }),

    'text': SC.Record.attr(String),

    'total': SC.Record.attr(Number)
});