/*globals SC, Sqwerl*/

// TOOD - Is this used?
Sqwerl.CollectionView = SC.TemplateView.create({
  childCountBinding: 'Sqwerl.CollectionController.childCount',
  childCountTextBinding: 'Sqwerl.CollectionController.childCountText',
  descriptionBinding: 'Sqwerl.CollectionController.description',
  hasChildrenBinding: 'Sqwerl.CollectionController.hasChildren',
  hasConnectionsBinding: 'Sqwerl.CollectionController.hasConnections',
  hasMultipleChildrenBinding: 'Sqwerl.CollectionController.hasMultipleChildren',
  hasMultipleConnectionsBinding: 'Sqwerl.CollectionController.hasMultipleConnections',
  nameBinding: 'Sqwerl.CollectionController.name',
  shortDescriptionBinding: 'Sqwerl.CollectionController.shortDescription',
  templateName: 'collection_view',
  typeIconBinding: 'Sqwerl.CollectionController.typeIcon'
});
