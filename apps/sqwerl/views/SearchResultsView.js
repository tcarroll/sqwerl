/*globals SC, Sqwerl*/

Sqwerl.SearchResultsView = SC.TemplateView.create({
    hasOnlyOneBinding: 'Sqwerl.SearchResultsController.hasOnlyOne',
    hasMoreThanOneBinding: 'Sqwerl.SearchResultsController.hasMoreThanOne',
    isShowingPartialResultsBinding: 'Sqwerl.SearchResultsController.isShowingPartialResults',
    limitBinding: 'Sqwerl.SearchResultsController.limit',
    searchItemsBinding: 'Sqwerl.SearchResultsController.searchItems',
    startingAtBinding: 'Sqwerl.SearchResultsController.startingAt',
    templateName: 'search_results',
    textBinding: 'Sqwerl.SearchResultsController.text',
    totalBinding: 'Sqwerl.SearchResultsController.total'
});