/*globals SC, Sqwerl*/

/**
 * The Sqwerl client application's initial--or home--view. The view of a Sqwerl database that the Sqwerl client
 * application shows users when they start the application.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.HomeView = SC.TemplateView.create({
  defaultDatabaseBinding: 'Sqwerl.HomeController.defaultDatabase',
  defaultDatabaseThingCountBinding: 'Sqwerl.HomeController.defaultDatabaseThingCount',
  guestUserNameBinding: 'Sqwerl.HomeController.guestUserName',
  isSignedInBinding: 'Sqwerl.HomeController.isSignedIn',
  linkBinding: 'Sqwerl.HomeController.link',
  recentChangesBinding: 'Sqwerl.HomeController.recentChanges',
  templateName: 'home_view'
});