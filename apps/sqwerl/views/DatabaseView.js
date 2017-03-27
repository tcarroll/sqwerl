/*globals SC, Sqwerl*/

/**
 * Views of databases of things.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.DatabaseView = SC.TemplateView.create({
  descriptionBinding: 'Sqwerl.DatabaseController.description',
  nameBinding: 'Sqwerl.DatabaseController.name',
  numberOfThingsBinding: 'Sqwerl.DatabaseController.numberOfThings',
  recentChangesBinding: 'Sqwerl.DatabaseController.recentChanges',
  templateName: 'database_view',
  thingCountBinding: 'Sqwerl.DatabaseController.thingCount',
  typeIcon: 'Sqwerl.DatabaseController.typeIcon'
});
