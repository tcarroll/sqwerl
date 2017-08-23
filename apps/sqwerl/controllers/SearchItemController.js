/*globals Handlebars, SC, Sqwerl*/

Sqwerl.SearchItemController = SC.ObjectController.extend({

  model: null,

  firstFoundInProperty: Sqwerl.property(function () {
    'use strict';
    var foundInProperties = this.model.foundInProperties;
    return (foundInProperties && (foundInProperties.length > 0)) ? foundInProperties[0] : null;
  }),

  foundInProperties: Sqwerl.property(function () {
    'use strict';
    return this.model.foundInProperties;
  }),

  hasFoundInProperties: Sqwerl.property(function () {
    'use strict';
    var foundInProperties = this.model.foundInProperties;
    return foundInProperties && (foundInProperties.length > 0);
  }),

  hasMoreThanOneFoundInProperty: Sqwerl.property(function () {
    'use strict';
    var foundInProperties = this.model.foundInProperties;
    return foundInProperties && (foundInProperties.length > 1);
  }),

  links: Sqwerl.property(function () {
    'use strict';
    return this.model.links;
  }),

  name: Sqwerl.property(function () {
    'use strict';
    return this.model.name;
  }),

  pathName: Sqwerl.property(function () {
    'use strict';
    var path = Handlebars.helpers.thingPath.call(this.model),
      searchText = Sqwerl.mainPage.get('searchText');
    if (searchText) {
      path = Sqwerl.highlightSearchTextInValue(searchText.toLowerCase(), path);
    }
    return path;
  }),

  relativeUrl: Sqwerl.property(function () {
    'use strict';
    return '#' + encodeURI(this.model.id);
  }),

  rowId: Sqwerl.property(function () {
    'use strict';
    return this.model && this.model.index ? this.model.index.toLocaleString() : '';
  }),

  typeIcon: Sqwerl.property(function () {
    'use strict';
    var typeId = Sqwerl.idToTypeId(this.model.id);
    return (typeId ? Sqwerl.Node.typeIcons[typeId] : 'ti-folder') + ' search-results-type-icon';
  }),

  typeName: Sqwerl.property(function () {
    'use strict';
    return Handlebars.helpers.typeOfThingName.call(this.model);
  })
});