/*globals SC, Sqwerl*/

Sqwerl.SearchResultsView = SC.TemplateView.create({
    hasMoreThanOneBinding: 'Sqwerl.SearchResultsController.hasMoreThanOne',
    templateName: 'search_results',
    textBinding: 'Sqwerl.SearchResultsController.text',
    thingsBinding: 'Sqwerl.SearchResultsController.things',
    totalBinding: 'Sqwerl.SearchResultsController.total'
});