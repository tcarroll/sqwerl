/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages read-only views of security roles.
 */
Sqwerl.RoleController = Sqwerl.ViewController.create({

    connectionCount: Sqwerl.property(function () {
        'use strict';
        return this.sumConnections(['capabilities', 'groups']);
    }),

    hasCapabilities: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('capabilities');
    }),

    hasGroups: Sqwerl.property(function () {
        'use strict';
        return this.hasAtLeastOne('groups');
    }),

    hasMultipleCapabilities: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('capabilities');
    }),

    hasMultipleGroups: Sqwerl.property(function () {
        'use strict';
        return this.hasMoreThanOne('groups');
    }),

    singleCapabilityName: Sqwerl.property(function () {
        'use strict';
        return this.hasCapabilities() && this.get('capabilities').get('members')[0].name;
    }),

    singleGroupName: Sqwerl.property(function () {
        'use strict';
        return this.hasGroups() && this.get('groups').get('members')[0].name;
    })
});