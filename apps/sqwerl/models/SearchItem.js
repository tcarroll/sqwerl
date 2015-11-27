/*globals SC, Sqwerl*/

Sqwerl.SearchItem = SC.Record.extend({

    foundInProperties: SC.Record.attr(Array),

    index: SC.Record.attr(Number),

    links: SC.Record.attr(Number),

    name: SC.Record.attr(String)
});