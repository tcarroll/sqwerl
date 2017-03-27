/*globals SC, Sqwerl*/

/**
 * Summarized views of search results. Summarized views of things that matched a search request.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.SearchItemView = SC.TemplateView.create({

  firstFoundInPropertyBinding: 'Sqwerl.SearchItemController.firstFoundInProperty',

  foundInPropertiesBinding: 'Sqwerl.SearchItemController.foundInProperties',

  hasFoundInPropertiesBinding: 'Sqwerl.SearchItemController.hasFoundInProperties',

  hasMoreThanOneFoundInPropertyBinding: 'Sqwerl.SearchItemController.hasMoreThanOneFoundInProperty',

  linksBinding: 'Sqwerl.SearchItemController.links',

  nameBinding: 'Sqwerl.SearchItemController.name',

  pathNameBinding: 'Sqwerl.SearchItemController.pathName',

  relativeUrlBinding: 'Sqwerl.SearchItemController.relativeUrl',

  rowIdBinding: 'Sqwerl.SearchItemController.rowId',

  templateName: 'search_item'
});