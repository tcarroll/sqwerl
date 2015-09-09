/*globals SC, Sqwerl*/

/**
 * Abstract base type for all things.
 */
Sqwerl.Thing = SC.Record.extend({

    canRead: SC.Record.toMany('Sqwerl.User', { isMaster: SC.NO }),

    canWrite: SC.Record.toMany('Sqwerl.User', { isMaster: SC.NO }),

    createdOn: SC.Record.attr(SC.DateTime, { format: 'YYYYmmdd HH:MM:SS.sss Z'}),

    creator: SC.Record.toOne('Sqwerl.User', { isMaster: SC.NO }),

    displayName: function () {
        'use strict';
        return this.hasOwnProperty('name') ? this.get('name') : this.get('id');
    },

    isPolymorphic: true,

    owner: SC.Record.toOne('Sqwerl.User', { isMaster: SC.NO }),

    primaryKey: 'id'
});