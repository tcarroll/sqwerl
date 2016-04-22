/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages view that is displayed when the application is loading a thing's information.
 */
Sqwerl.LoadingController = SC.ObjectController.create({

    name: Sqwerl.property(function () {
        'use strict';
        return this.content ? this.content.get('name') : '';
    })
});