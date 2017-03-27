/*globals SC, Sqwerl*/

/**
 * Views of projects. Projects are named collections of tasks that must be accomplished in order to achieve a goal.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.ProjectView = SC.TemplateView.create({
  categoriesBinding: 'Sqwerl.ProjectController.categories',
  childrenBinding: 'Sqwerl.ProjectController.children',
  descriptionBinding: 'Sqwerl.ProjectController.description',
  hasCategoriesBinding: 'Sqwerl.ProjectController.hasCategories',
  hasConnectionsBinding: 'Sqwerl.ProjectController.hasConnections',
  hasLinksBinding: 'Sqwerl.ProjectController.hasLinks',
  hasMultipleConnectionsBinding: 'Sqwerl.ProjectController.hasMultipleConnections',
  linksBinding: 'Sqwerl.ProjectController.links',
  nameBinding: 'Sqwerl.ProjectController.name',
  templateName: 'project_view',
  typeIconBinding: 'Sqwerl.ProjectController.typeIcon'
});
