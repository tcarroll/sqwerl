sc_require('models/Thing');

Sqwerl.Home = SC.Object.extend({

  'defaultDatabase': SC.Record.toOne('Sqwerl.Database', { isMaster: SC.NO })
});