/*globals SC, sc_require, Sqwerl*/

sc_require('models/Thing');

/**
 * Pictures, images, icons, and other visual depictions.
 */
Sqwerl.Picture = Sqwerl.Thing.extend({

  'authors': SC.Record.toMany('Sqwerl.Author', { isMaster: SC.NO }),

  'categories': SC.Record.toMany('Sqwerl.Category', { isMaster: SC.NO }),

  'description': SC.Record.attr(String),

  'links': SC.Record.toMany('Sqwerl.Thing', { isMaster: SC.NO }),

  'name': SC.Record.attr(String),

  'tags': SC.Record.toMany('Sqwerl.Tag', { isMaster: SC.NO })
});