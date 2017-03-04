sc_require('models/DatabaseChanges');

/**
 * A collection of a similar type of change made to zero or more things. For example: things that a user created,
 * modified, or removed.
 */
Sqwerl.DatabaseChange = SC.Record.extend({

  by: SC.Record.attr(String),

  changes: SC.Record.attr(Sqwerl.DatabaseChanges),

  date: SC.Record.attr(SC.DateTime),

  type: SC.Record.attr(String)
});