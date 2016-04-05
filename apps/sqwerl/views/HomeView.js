/*globals SC, Sqwerl*/

Sqwerl.HomeView = SC.TemplateView.create({
    defaultDatabaseDescriptionBinding: 'Sqwerl.HomeController.defaultDatabaseDescription',
    numberOfThingsBinding: 'Sqwerl.HomeController.numberOfThings',
    templateName: 'home_view'
});