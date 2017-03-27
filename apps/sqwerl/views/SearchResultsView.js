/*globals SC, Sqwerl*/

/**
 * Views of search results. Views that show summary information about things that matched a search request.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.SearchResultsView = SC.TemplateView.create({
  hasOnlyOneBinding: 'Sqwerl.SearchResultsController.hasOnlyOne',
  hasMoreThanOneBinding: 'Sqwerl.SearchResultsController.hasMoreThanOne',
  isShowingPartialResultsBinding: 'Sqwerl.SearchResultsController.isShowingPartialResults',
  isSortedDescendinglyByLinksBinding: 'Sqwerl.SearchResultsController.isSortedDescendinglyByLinks',
  isSortedDescendinglyByNameBinding: 'Sqwerl.SearchResultsController.isSortedDescendinglyByName',
  isSortedDescendinglyByTypeBinding: 'Sqwerl.SearchResultsController.isSortedDescendinglyByType',
  isSortedAscendinglyByLinksBinding: 'Sqwerl.SearchResultsController.isSortedAscendinglyByLinks',
  isSortedAscendinglyByNameBinding: 'Sqwerl.SearchResultsController.isSortedAscendinglyByName',
  isSortedAscendinglyByTypeBinding: 'Sqwerl.SearchResultsController.isSortedAscendinglyByType',
  limitBinding: 'Sqwerl.SearchResultsController.limit',
  searchItemsBinding: 'Sqwerl.SearchResultsController.searchItems',
  startingAtBinding: 'Sqwerl.SearchResultsController.startingAt',
  templateName: 'search_results',
  textBinding: 'Sqwerl.SearchResultsController.text',
  totalBinding: 'Sqwerl.SearchResultsController.total'
});