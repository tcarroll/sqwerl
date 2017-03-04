/**
 * References to persistent things that have changed: been created, modified, or removed.
 */
Sqwerl.ThingChange = SC.Record.extend({

  id: SC.Record.attr(String),

  name: SC.Record.attr(String),

  path: SC.Record.attr(String)
});