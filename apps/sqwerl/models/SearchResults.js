/*globals SC, Sqwerl*/

Sqwerl.SearchResults = SC.Record.extend({

    'things': SC.Record.attr(Array),

    'text': SC.Record.attr(String),

    'total': SC.Record.attr(Number)
});