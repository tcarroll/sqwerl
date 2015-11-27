/*globals SC, Sqwerl*/

Sqwerl.SearchItemController = SC.ObjectController.create({

    firstFoundInProperty: Sqwerl.property(function () {
        'use strict';
        var foundInProperties = this.get('foundInProperties');
        return (foundInProperties && (foundInProperties.length > 0)) ? foundInProperties[0] : null;
    }),

    hasFoundInProperties: Sqwerl.property(function () {
        'use strict';
        var foundInProperties = this.get('foundInProperties');
        return foundInProperties && (foundInProperties.length > 0);
    }),

    hasMoreThanOneFoundInProperty: Sqwerl.property(function () {
        'use strict';
        var foundInProperties = this.get('foundInProperties');
        return foundInProperties && (foundInProperties.length > 1);
    }),

    relativeUrl: Sqwerl.property(function () {
        'use strict';
        return '#' + encodeURI(this.get('id'));
    }),

    typeName: Sqwerl.property(function () {
        'use strict';
        return 'Thing';
    })
});