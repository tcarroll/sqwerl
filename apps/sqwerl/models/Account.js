/*globals SC, sc_require, Sqwerl*/

sc_require('models/Thing');

/**
 * Users' accounts that allow them to use Sqwerl.
 */
Sqwerl.Account = Sqwerl.Thing.extend({

  description: SC.Record.attr(String),

  isEnabled: SC.Record.attr(Boolean),

  isLocked: SC.Record.attr(Boolean),

  lastSignedInTime: SC.Record.attr(SC.DateTime, { format: 'YYYY-mm-ddTHH:MM:SS.sssZ' }),

  mustChangePassword: SC.Record.attr(Boolean),

  name: SC.Record.attr(String),

  user: SC.Record.toOne('Sqwerl.User', {isMaster: SC.NO})
})
;