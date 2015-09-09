/*globals SC, Sqwerl*/

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
