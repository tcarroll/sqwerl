/*globals SC, sc_require, Sqwerl*/
/*jslint unparam: true */

sc_require('models/Account');
sc_require('models/Article');
sc_require('models/Author');
sc_require('models/Book');
sc_require('models/Category');
sc_require('models/Course');
sc_require('models/Database');
sc_require('models/Databases');
sc_require('models/Document');
sc_require('models/Feed');
sc_require('models/Group');
sc_require('models/Note');
sc_require('models/Representation');
sc_require('models/Role');
sc_require('models/Tag');
sc_require('models/Talk');
sc_require('models/Thing');
sc_require('models/ThingChange');
sc_require('models/Type');
sc_require('models/User');
sc_require('models/Video');
sc_require('models/View');
sc_require('models/WebPage');

/**
 * Accesses remote REST (Representational State Transfer) resources.
 */
Sqwerl.RestDataSource = SC.DataSource.create({

  /**
   * Maps query URLs to the unique data store keys for the queries' results. Used to avoid fetching data
   * from the server that we've already fetched.
   */
  storedKeys: {},

  types: {
    'accounts': Sqwerl.Account,
    'articles': Sqwerl.Article,
    'authors': Sqwerl.Author,
    'books': Sqwerl.Book,
    'categories': Sqwerl.Category,
    'courses': Sqwerl.Course,
    'databases': Sqwerl.Database,
    'documents': Sqwerl.Document,
    'feeds': Sqwerl.Feed,
    'groups': Sqwerl.Group,
    'notes': Sqwerl.Note,
    'papers': Sqwerl.Paper,
    'podcasts': Sqwerl.Podcast,
    'projects': Sqwerl.Project,
    'roles': Sqwerl.Role,
    'tags': Sqwerl.Tag,
    'talks': Sqwerl.Talk,
    'thingChange': Sqwerl.ThingChange,
    'types': Sqwerl.Type,
    'users': Sqwerl.User,
    'videos': Sqwerl.Video,
    'views': Sqwerl.View,
    'webPages': Sqwerl.WebPage
  },

  /**
   *
   * @param store
   * @param createStoreKeys
   * @param updateStoreKeys
   * @param destroyStoreKeys
   * @param params
   * @returns {boolean}
   */
  commitRecords: function (store, createStoreKeys, updateStoreKeys, destroyStoreKeys, params) {
    'use strict';
    return false;
  },

  fetch: function (store, query) {
    'use strict';
    var handled = true,
        id = '',
        limit = '',
        offset = '',
        onError,
        onSuccess,
        parameterSeparator = '?',
        parameters,
        properties = '',
        recordType = Sqwerl.Thing,
        responseBody,
        storeKey,
        summary = '',
        url = '';
    if (query.hasOwnProperty('parameters')) {
      parameters = query.parameters;
      if (parameters.hasOwnProperty('id') && parameters.id) {
        id = parameters.id;
        if (parameters.hasOwnProperty('summary') && parameters.summary) {
          summary = "/summary";
          if (parameters.hasOwnProperty('properties') && parameters.properties) {
            properties = parameterSeparator + "properties=" + parameters.properties;
            parameterSeparator = "&";
          }
        }
        onError = parameters.onError;
        onSuccess = parameters.onSuccess;
        if (parameters.hasOwnProperty('limit') && (!isNaN(parameters.limit))) {
          limit += (parameterSeparator + 'limit=' + parameters.limit);
          parameterSeparator = '&';
        }
        if (parameters.hasOwnProperty('offset') && (!isNaN(parameters.offset))) {
          offset += (parameterSeparator + 'offset=' + parameters.offset);
        }
      } else {
        SC.error('%@: Data source fetch query is missing the required ID of the thing to fetch', this);
      }
    } else {
      SC.error('%@: Data source fetch query is missing query parameters', this);
    }
    url = id + summary + properties + limit + offset;
    if (this.storedKeys.hasOwnProperty(url)) {
      storeKey = this.storedKeys[url];
      if (onSuccess) {
        onSuccess(store.readDataHash(storeKey));
      }
      store.dataSourceDidFetchQuery(query, storeKey);
    } else {
      parameters.storedKeys = this.storedKeys;
      Sqwerl.getUrl(
        url,
        Sqwerl.serverDataTypes.summary,
        this,
        function (response, parameters) {
          if (SC.ok(response)) {
            responseBody = response.body();
            responseBody.isSummary = (summary.length > 0);
            if (!responseBody.isSummary) {
              recordType = Sqwerl.RestDataSource.types[Sqwerl.RestDataSource.typeName(id)];
            }
            storeKey = store.loadRecord(recordType, responseBody, '<' + id + '>');
            SC.debug('%@: Loaded record of type \'%@\' with id \'<%@>\'', this, recordType, id);
            if (!responseBody.isSummary) {
              parameters.storedKeys[url] = storeKey;
            }
            store.dataSourceDidFetchQuery(query, storeKey);
            if (onSuccess) {
              onSuccess(responseBody);
            }
          } else {
            // TODO - Handle retrying the query. The query may have failed due to network problems,
            // or the server going down temporarily.
            store.dataSourceDidErrorQuery(query, response);
            if (onError) {
              onError(response);
            }
          }
        },
        {
          storedKeys: this.storedKeys
        }
      );
    }
    return handled;
  },

  retrieveRecords: function (store, storeKeys, ids) {
    'use strict';
    return false;
  },

  typeName: function (id) {
    'use strict';
    var components = id.split('/');
    return (components.length > 2) ? components[2] : 'types';
  }
});
/*jslint unparam:false */