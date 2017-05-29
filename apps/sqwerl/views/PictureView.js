/*globals SC, Sqwerl*/

/**
 * Views of pictures.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.PictureView = SC.TemplateView.create({
  categoriesBinding: 'Sqwerl.PictureController.categories',
  connectionCountBinding: 'Sqwerl.PictureController.connectionCount',
  connectionCountTextBinding: 'Sqwerl.PictureController.connectionCountText',
  createdOnBinding: 'Sqwerl.PictureController.createdOn',
  creatorBinding: 'Sqwerl.PictureController.creator',
  descriptionBinding: 'Sqwerl.PictureController.description',
  hasAuthorsBinding: 'Sqwerl.PictureController.hasAuthors',
  hasCategoriesBinding: 'Sqwerl.PictureController.hasCategories',
  hasConnectionsBinding: 'Sqwerl.PictureController.hasConnections',
  hasLinksBinding: 'Sqwerl.PictureController.hasLinks',
  hasMultipleAuthorsBinding: 'Sqwerl.PictureController.hasMultipleAuthors',
  hasMultipleCategoriesBinding: 'Sqwerl.PictureController.hasMultipleCategories',
  hasMultipleConnectionsBinding: 'Sqwerl.PictureController.hasMultipleConnections',
  hasMultipleLinksBinding: 'Sqwerl.PictureController.hasMultipleLinks',
  hasMultipleTagsBinding: 'Sqwerl.PictureController.hasMultipleTags',
  hasTagsBinding: 'Sqwerl.PictureController.hasTags',
  linksBinding: 'Sqwerl.PictureController.links',
  nameBinding: 'Sqwerl.PictureController.name',
  tagsBinding: 'Sqwerl.PictureController.tags',
  templateName: 'picture_view',
  typeIconBinding: 'Sqwerl.PictureController.typeIcon'
});