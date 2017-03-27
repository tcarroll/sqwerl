/*globals SC, Sqwerl*/

/**
 * Views of named collections of related things.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.CategoryView = SC.TemplateView.create({
  childCountBinding: 'Sqwerl.CategoryController.childCount',
  childCountTextBinding: 'Sqwerl.CategoryController.childCount',
  childrenBinding: 'Sqwerl.CategoryController.children',
  connectionCountTextBinding: 'Sqwerl.CategoryController.connectionCountText',
  descriptionBinding: 'Sqwerl.CategoryController.description',
  hasChildrenBinding: 'Sqwerl.CategoryController.hasChildren',
  hasConnectionsBinding: 'Sqwerl.CategoryController.hasConnections',
  hasMultipleChildrenBinding: 'Sqwerl.CategoryController.hasMultipleChildren',
  hasMultipleConnectionsBinding: 'Sqwerl.CategoryController.hasMultipleConnections',
  nameBinding: 'Sqwerl.CategoryController.name',
  shortDescriptionBinding: 'Sqwerl.CategoryController.shortDescription',
  templateName: 'category_view',
  typeIconBinding: 'Sqwerl.CategoryController.typeIcon'
});
