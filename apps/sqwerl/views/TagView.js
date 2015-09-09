/*globals SC, Sqwerl*/

Sqwerl.TagView = SC.TemplateView.create({
    connectionCountBinding: 'Sqwerl.TagController.connectionCount',
    descriptionBinding: 'Sqwerl.TagController.description',
    hasConnectionsBinding: 'Sqwerl.TagController.hasConnections',
    hasMultipleConnectionsBinding: 'Sqwerl.TagController.hasMultipleConnections',
    hasMultipleTaggedBinding: 'Sqwerl.TagController.hasMultipleTagged',
    hasTaggedBinding: 'Sqwerl.TagController.hasTagged',
    nameBinding: 'Sqwerl.TagController.name',
    taggedBinding: 'Sqwerl.TagController.tagged',
    templateName: 'tag_view',
    textBinding: 'Sqwerl.TagController.text',
    typeIconBinding: 'Sqwerl.TagController.typeIcon'
});
