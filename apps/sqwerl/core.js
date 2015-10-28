/*globals btoa, Configuration, SC, sc_require, Sqwerl:true, YES*/

sc_require('configuration');

try {
    var configuration = new Configuration();

    //noinspection JSValidateTypes
    Sqwerl = SC.Application.create({

        NAMESPACE: 'Sqwerl',

        VERSION: configuration.VERSION,

        anonymousUserId: configuration.anonymousUserId,

        anonymousUserName: configuration.anonymousUserName,

        applicationName: configuration.applicationName,

        baseUrl: configuration.baseUrl,

        catalogDatabaseName: configuration.catalogDatabaseName,

        currentPropertiesEditor: null,

        databases: null,

        defaultDatabaseName: configuration.defaultDatabaseName,

        editorMapping: {
            'accounts': 'account',
            'articles': 'article',
            'aspects': 'aspect',
            'authors': 'author',
            'books': 'book',
            'capabilities': 'capability',
            'categories': 'category',
            'courses': 'course',
            'databases': 'database',
            'documents': 'document',
            'feeds': 'feed',
            'groups': 'group',
            'home': 'home',
            'notes': 'note',
            'papers': 'paper',
            'podcasts': 'podcast',
            'projects': 'project',
            'roles': 'role',
            'tags': 'tag',
            'talks': 'talk',
            'types': 'collection',
            'users': 'user',
            'videos': 'video',
            'webPages': 'webPage'
        },

        isNavigationBusy: false,

        /**
         * Height (in pixels) of navigation view rows.
         */
        rowHeight: 36,

        /**
         * Unique identifiers for the types of data the server sends to this client. These identifiers are
         * used to track version changes in the client-server API.
         */
        serverDataTypes: {

            authentication: 'authentication',

            node: 'node',

            searchResults: 'searchResults',

            summary: 'summary',

            signOut: 'signOut',

            types: 'types'
        },

        /**
         * This application's data store. An in-memory cache of persistent things retrieved from
         * a server.
         */
        store: SC.Store.create().from('Sqwerl.RestDataSource'),

        /**
         * Default user name. Unless the user signs in, the user is assumed to be the guest user and is granted
         * the guest users account's permissions.
         */
        userName: 'guest',

        /**
         * Converts the given data to a data model object.
         * @param data An object.
         * @returns {SC.Object} A data model object.
         */
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
        },

        /**
         * Sends a GET request to a Sqwerl server.
         *
         * @param {String} url          Required URL to get.
         * @param {String} dataType     Required name of the type of data to get. This identifier is used to associate version numbers with data returned by the server.
         * @param callbackTarget        Required object to notify when the result of the GET is received.
         * @param callbackFunction      Required function to invoke when the result of the GET is received.
         * @param [callbackParameters]  Optional parameters to pass to the callback function.
         */
        getUrl: function (url, dataType, callbackTarget, callbackFunction, callbackParameters) {
            'use strict';
            SC.debug('%@: core.getUrl: url = \'%@\'', this, url);
            if ((url === null) || (url.length === 0)) {
                throw new Error('A URL to get is required.');
            }
            if (!dataType) {
                throw new Error('The name of the type of data to get is required.');
            }
            if (!callbackTarget) {
                throw new Error('The callback object is required.');
            }
            if (!callbackFunction) {
                throw new Error('The callback function is required.');
            }
            var request = new SC.Request();
            request.set('address', configuration.baseUrl + url);
            SC.debug('%@: core.getUrl: Base URL = \'%@\'', this, configuration.baseUrl);
            request.set('type', 'GET');
            SC.debug('%@: core.getUrl: Request address = \'%@\'', this, request.get('address'));
            request.header('Accept', 'vnd.sqwerl.com.%@+json; version=0.1,application/json'.fmt(dataType));
            request.set('isJSON', YES);
            request.notify(callbackTarget, callbackFunction, callbackParameters);
            request.send();
        },

        isNotSignedIn: function () {
            'use strict';
            return !this.get('isSignedIn');
        },

        isSignedIn: function () {
            'use strict';
            var userName = this.get('userName');
            return (userName !== this.get('anonymousUserName'));
        }.property('userName'),

        observes: function (f) {
            'use strict';
            return f.observes(Array.prototype.slice.call(arguments, 1));
        },

        property: function (f) {
            'use strict';
            return f.property(Array.prototype.slice.call(arguments, 1));
        },

        /**
         * Signs a user into his or her account.
         *
         * @param {String} id               Required user's unique identifier (name or e-mail address).
         * @param {String} password         Required user's password.
         * @param callbackTarget            Required object to notify about sign in attempt.
         * @param callbackFunction          Required function to invoke when sign in response is received.
         * @param callbackParameters        Optional parameters to pass to the given callback function.
         */
        signIn: function (id, password, callbackTarget, callbackFunction, callbackParameters) {
            'use strict';
            if (!callbackTarget) {
                throw new Error('The callback object is required.');
            }
            if (!callbackFunction) {
                throw new Error('The callback function is required.');
            }
            var request = SC.Request.getUrl('/' + Sqwerl.applicationName + '/signIn');
            request.header('accept', 'vnd.sqwerl.com.%@+json; version=0.1'.fmt('authentication'));
            request.header('authorization', btoa(id + ':' + password));
            request.set('isJSON', YES);
            request.notify(callbackTarget, callbackFunction, callbackParameters);
            request.send();
        },

        /**
         * Signs a user out of his or her account. The user returns to using the guest (anonymous) account.
         *
         * @param callbackTarget            Required object to notify about sign in attempt.
         * @param callbackFunction          Required function to invoke when sign in response is received.
         * @param [callbackParameters]      Optional parameters to pass to the given callback function.
         */
        signOut: function (callbackTarget, callbackFunction, callbackParameters) {
            'use strict';
            Sqwerl.getUrl(Sqwerl.baseUrl + '/' + Sqwerl.applicationName + '/signOut', Sqwerl.serverDataTypes.signOut, callbackTarget, callbackFunction, callbackParameters);
        }
    });
} catch (error) {
    SC.error('%@: An error has occurred.', this);
    SC.error(error.message);
}