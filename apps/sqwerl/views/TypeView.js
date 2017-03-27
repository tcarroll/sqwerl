/*globals SC, Sqwerl*/

/**
 * Views that display information about types of things.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.TypeView = SC.TemplateView.create({
  childrenBinding: 'Sqwerl.TypeController.children',
  descriptionBinding: 'Sqwerl.TypeController.description',
  hasConnectionsBinding: 'Sqwerl.TypeController.hasConnections',
  hasMultipleConnectionsBinding: 'Sqwerl.TypeController.hasMultipleConnections',
  nameBinding: 'Sqwerl.TypeController.name',
  shortDescriptionBinding: 'Sqwerl.TypeController.shortDescription',
  templateName: 'type_view',
  typeIconBinding: 'Sqwerl.TypeController.typeIcon'
});
