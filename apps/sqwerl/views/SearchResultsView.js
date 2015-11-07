/*globals SC, Sqwerl*/

Sqwerl.SearchResultsView = SC.TemplateView.create({
    hasMoreThanOneBinding: 'Sqwerl.SearchResultsController.hasMoreThanOne',
    isShowingPartialResultsBinding: 'Sqwerl.SearchResultsController.isShowingPartialResults',
    limitBinding: 'Sqwerl.SearchResultsController.limit',
    startingAtBinding: 'Sqwerl.SearchResultsController.startingAt',
    templateName: 'search_results',
    textBinding: 'Sqwerl.SearchResultsController.text',
    thingsBinding: 'Sqwerl.SearchResultsController.things',
    totalBinding: 'Sqwerl.SearchResultsController.total'
});