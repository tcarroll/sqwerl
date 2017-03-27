/*globals SC, Sqwerl*/

/**
 * Views of documents.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.DocumentView = SC.TemplateView.create({
  authorsBinding: 'Sqwerl.DocumentController.authors',
  categoriesBinding: 'Sqwerl.DocumentController.categories',
  connectionCountBinding: 'Sqwerl.DocumentController.connectionCount',
  connectionCountTextBinding: 'Sqwerl.DocumentController.connectionCountText',
  descriptionBinding: 'Sqwerl.DocumentController.description',
  hasAuthorsBinding: 'Sqwerl.DocumentController.hasAuthors',
  hasCategoriesBinding: 'Sqwerl.DocumentController.hasCategories',
  hasConnectionsBinding: 'Sqwerl.DocumentController.hasConnections',
  hasLinksBinding: 'Sqwerl.DocumentController.hasLinks',
  hasMultipleAuthorsBinding: 'Sqwerl.DocumentController.hasMultipleAuthors',
  hasMultipleCategoriesBinding: 'Sqwerl.DocumentController.hasMultipleCategories',
  hasMultipleConnectionsBinding: 'Sqwerl.DocumentController.hasMultipleConnections',
  hasMultipleLinksBinding: 'Sqwerl.DocumentController.hasMultipleLinks',
  hasMultipleNotesBinding: 'Sqwerl.DocumentController.hasMultipleNotes',
  hasMultipleReadByBinding: 'Sqwerl.DocumentController.hasMultipleReadBy',
  hasMultipleRecommendationsBinding: 'Sqwerl.DocumentController.hasMultipleRecommendations',
  hasMultipleTagsBinding: 'Sqwerl.DocumentController.hasMultipleTags',
  hasNotesBinding: 'Sqwerl.DocumentController.hasNotes',
  hasReadByBinding: 'Sqwerl.DocumentController.hasReadBy',
  hasRecommendationsBinding: 'Sqwerl.DocumentController.hasRecommendations',
  hasRecommendedByBinding: 'Sqwerl.DocumentController.hasRecommendedBy',
  hasTagsBinding: 'Sqwerl.DocumentController.hasTags',
  linksBinding: 'Sqwerl.DocumentController.links',
  nameBinding: 'Sqwerl.DocumentController.name',
  notesBinding: 'Sqwerl.DocumentController.notes',
  readByBinding: 'Sqwerl.DocumentController.readBy',
  recommendationsBinding: 'Sqwerl.DocumentController.recommendations',
  recommendedByBinding: 'Sqwerl.DocumentController.recommendedBy',
  representationsBinding: 'Sqwerl.DocumentController.representations',
  tagsBinding: 'Sqwerl.DocumentController.tags',
  templateName: 'document_view',
  titleBinding: 'Sqwerl.DocumentController.title',
  typeIconBinding: 'Sqwerl.DocumentController.typeIcon',
  urlBinding: 'Sqwerl.DocumentController.url'
});
