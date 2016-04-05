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
        if (this.defaultDatabase) {
            thingCount = this.defaultDatabase.get('thingCount');
        } else {
            this.fetchDatabase(Sqwerl.defaultDatabaseName, function (results) {
                controller.set('defaultDatabase', controller.convertToModel(results));
            });
        }
        return thingCount.toLocaleString();
    }),

    fetchDatabase: function (databaseName, callback) {
        'use strict';
        var id = '/types/databases/' + databaseName;
        return Sqwerl.store.find(SC.Query.create({
            conditions: 'id = {id}',
            parameters: {
                id: id,
                onError: function (response) {
                    // TODO
                    console.log('Error: ' + response);
                },
                onSuccess: function (results) {
                    callback(results);
                }
            }
        }));
    },

    convertToModel: function (data) {
        'use strict';
        var controller = this,
            model = SC.Object.create(),
            value;
        Object.keys(data).forEach(function (property) {
            value = data[property];
            if ((value instanceof Array) || (typeof value !== 'object')) {
                model.set(property, value);
            } else if (value instanceof Object) {
                model.set(property, controller.convertToModel(value));
            }
        });
        return model;
    }
});