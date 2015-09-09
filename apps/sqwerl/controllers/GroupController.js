/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages read-only views of groups of users.
 */
Sqwerl.GroupController = Sqwerl.ViewController.create({

    connectionCount: Sqwerl.property(function () {
        'use strict';
        return this.sumConnections(['roles', 'subgroups', 'users']);
    }),

    hasMultipleRoles: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('roles');
    }),

    hasMultipleSubgroups: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('subgroups');
    }),

    hasMultipleUsers: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('users');
    }),

    hasRoles: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('roles');
    }),

    hasSubgroups: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('subgroups');
    }),

    hasUsers: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('users');
    })
});