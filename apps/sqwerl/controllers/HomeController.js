/*globals SC, sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages the home/initial view's properties.
 */
Sqwerl.HomeController = Sqwerl.ViewController.create({

    catalogDatabase: null,

    defaultDatabase: null,

    defaultDatabaseDescription: Sqwerl.property(function () {
        'use strict';
        var controller = this,
            result = '';
        if (this.defaultDatabase) {
            result = this.defaultDatabase.get('description');
        } else {
            this.fetchDatabase(Sqwerl.defaultDatabaseName, function (results) {
                controller.set('defaultDatabase', controller.convertToModel(results));
            });
        }
        return result;
    }),

    numberOfThings: Sqwerl.property(function () {
        'use strict';
        var controller = this,
            thingCount = 0;
        if (this.catalogDatabase && this.defaultDatabase) {
            thingCount = this.catalogDatabase.get('thingCount') + this.defaultDatabase.get('thingCount');
        } else {
            if (!this.catalogDatabase) {
                this.fetchDatabase(Sqwerl.catalogDatabaseName, function (results) {
                    controller.set('catalogDatabase', controller.convertToModel(results));
                });
            }
            if (!this.defaultDatabase) {
                this.fetchDatabase(Sqwerl.defaultDatabaseName, function (results) {
                    controller.set('defaultDatabase', controller.convertToModel(results));
                });
            }
        }
        return thingCount;
    }, 'catalogDatabase', 'defaultDatabase'),

    fetchDatabase: function (databaseName, callback) {
        'use strict';
        var id = '/types/databases/' + databaseName;
        Sqwerl.store.find(SC.Query.create({
            conditions: 'id = {id}',
            parameters: {
                id: id,
                onError: function (response) {
                    // TODO
                },
                onSuccess: function (results) {
                    callback(results);
                }
            }
        }));
    },

    convertToModel: function (data) {
        'use strict';
        var model = SC.Object.create(),
            property,
            value;
        for (property in data) {
            if (data.hasOwnProperty(property)) {
                value = data[property];
                if ((value instanceof Array) || (typeof value !== 'object')) {
                    model.set(property, value);
                } else if (value instanceof Object) {
                    model.set(property, this.convertToModel(value));
                }
            }
        }
        return model;
    }
});