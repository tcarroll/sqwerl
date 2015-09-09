/*globals SC, Sqwerl*/

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
