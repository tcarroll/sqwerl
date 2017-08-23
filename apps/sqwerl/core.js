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

      /**
       * Maps the names of types of things to the root of the names of the user interface views that display those
       * things' properties.
       */
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
        'pictures': 'picture',
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

      /**
       * Is the application busy loading information to navigate to a different thing? By default, this application
       * is busy loading the initial things.
       * {boolean}
       */
      isNavigationBusy: true,

      /**
       * Height (in pixels) of navigation view rows.
       * {Number}
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
       * The signed in user's unique identifier.
       */
      userId: '/types/users/guest',

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
        if (Sqwerl.token) {
          request.header('x-access-token', Sqwerl.token);
        }
        request.set('isJSON', YES);
        request.notify(callbackTarget, callbackFunction, callbackParameters);
        request.send();
      },

      isNotSignedIn: function () {
        'use strict';
        var userName = this.get('userName');
        return (!userName) || (userName === this.get('anonymousUserName'));
      }.property('Sqwerl.isSignedIn'),

      isSignedIn: function () {
        'use strict';
        var userName = this.get('userName');
        return (userName !== this.get('anonymousUserName'));
      }.property('Sqwerl.userName'),

      observes: function (f) {
        'use strict';
        return f.observes(Array.prototype.slice.call(arguments, 1));
      },

      property: function (f) {
        'use strict';
        return f.property(Array.prototype.slice.call(arguments, 1));
      },

      updateUserSignInStatus: function () {
        var isSignedIn = false;
        var session = {};
        var token = document.cookie.match(/^(.*;)?sqwerl-session=[^;]+(.*)?$/);
        var userId = '/types/users/guest';
        var userName = 'guest';
        var wasSignedIn = Sqwerl.get('isSignedIn');
        if (token && (token.length > 0)) {
          // TODO - Check that token hasn't expired.
          session = JSON.parse(token[0].slice('sqwerl-session='.length));
          isSignedIn = session.userId && (session.userId !== '/types/users/guest');
          userId = session.userId || userId;
          userName = session.userName || userName;
        }
        if (this.store.dataSource && (typeof this.store.dataSource.clearCache == 'function')) {
          this.store.dataSource.clearCache();
        }
        Sqwerl.set('isSignedIn', isSignedIn);
        Sqwerl.set('userId', userId);
        Sqwerl.set('userName', userName);
      }
    });
    Sqwerl.updateUserSignInStatus();
} catch (error) {
    SC.error('%@: An error has occurred.', this);
    SC.error(error.message);
}

