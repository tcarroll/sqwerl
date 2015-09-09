/*globals SC, Sqwerl*/

/**
 * Named collections of capabilities granted to users or groups of users so that they can perform a role.
 */
Sqwerl.Role = Sqwerl.Thing.extend({

    'capabilities': SC.Record.toMany('Sqwerl.Capability', { isMaster: SC.NO }),

    'description': SC.Record.attr(String),

    'groups': SC.Record.toMany('Sqwerl.Group', { isMaster: SC.NO }),

    'name': SC.Record.attr(String)
});