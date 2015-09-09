/*globals SC, Sqwerl*/

Sqwerl.SearchResultsController = SC.ObjectController.create({

    hasMoreThanOne: Sqwerl.property(function () {
        'use strict';
        return (this.get('total') > 1);
    })
});