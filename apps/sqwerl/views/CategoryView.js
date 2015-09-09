/*globals SC, Sqwerl*/

Sqwerl.CategoryView = SC.TemplateView.create({
    childCountBinding: 'Sqwerl.CategoryController.childCount',
    childrenBinding: 'Sqwerl.CategoryController.children',
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
