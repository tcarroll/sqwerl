/**
 * Collections of things that have been changed.
 */
Sqwerl.DatabaseChanges = SC.Record.extend({

  limit: SC.Record.attr(Number),

  members: SC.Record.attr(Array),

  offset: SC.Record.attr(Number),

  totalCount: SC.Record.attr(Number)
});