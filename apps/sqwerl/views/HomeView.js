/*globals SC, Sqwerl*/

Sqwerl.HomeView = SC.TemplateView.create({
  defaultDatabaseBinding: 'Sqwerl.HomeController.defaultDatabase',
  defaultDatabaseThingCountBinding: 'Sqwerl.HomeController.defaultDatabaseThingCount',
  guestUserNameBinding: 'Sqwerl.HomeController.guestUserName',
  isSignedInBinding: 'Sqwerl.HomeController.isSignedIn',
  linkBinding: 'Sqwerl.HomeController.link',
  recentChangesBinding: 'Sqwerl.HomeController.recentChanges',
  templateName: 'home_view'
});