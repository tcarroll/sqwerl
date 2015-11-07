/*globals SC, Sqwerl*/

Sqwerl.SearchResults = SC.Record.extend({

    'limit': SC.Record.attr(Number),

    'offset': SC.Record.attr(Number),

    'things': SC.Record.attr(Array),

    'text': SC.Record.attr(String),

    'total': SC.Record.attr(Number)
});