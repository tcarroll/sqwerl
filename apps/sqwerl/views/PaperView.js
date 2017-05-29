/*globals SC, Sqwerl*/

/**
 * Views for academic papers.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.PaperView = SC.TemplateView.create({
  authorsBinding: 'Sqwerl.PaperController.authors',
  categoriesBinding: 'Sqwerl.PaperController.categories',
  connectionCountBinding: 'Sqwerl.PaperController.connectionCount',
  connectionCountTextBinding: 'Sqwerl.PaperController.connectionCountText',
  createdOnBinding: 'Sqwerl.PaperController.createdOn',
  creatorBinding: 'Sqwerl.PaperController.creator',
  descriptionBinding: 'Sqwerl.PaperController.description',
  hasAuthorsBinding: 'Sqwerl.PaperController.hasAuthors',
  hasCategoriesBinding: 'Sqwerl.PaperController.hasCategories',
  hasConnectionsBinding: 'Sqwerl.PaperController.hasConnections',
  hasLinksBinding: 'Sqwerl.PaperController.hasLinks',
  hasMultipleAuthorsBinding: 'Sqwerl.PaperController.hasMultipleAuthors',
  hasMultipleCategoriesBinding: 'Sqwerl.PaperController.hasMultipleCategories',
  hasMultipleConnectionsBinding: 'Sqwerl.PaperController.hasMultipleConnections',
  hasMultipleLinksBinding: 'Sqwerl.PaperController.hasMultipleLinks',
  hasMultipleNotesBinding: 'Sqwerl.PaperController.hasMultipleNotes',
  hasMultipleReadByBinding: 'Sqwerl.PaperController.hasMultipleReadBy',
  hasMultipleRecommendationsBinding: 'Sqwerl.PaperController.hasMultipleRecommendations',
  hasMultipleRecommendedByBinding: 'Sqwerl.PaperController.hasMultipleRecommendedBy',
  hasMultipleTagsBinding: 'Sqwerl.PaperController.hasMultipleTags',
  hasNotesBinding: 'Sqwerl.PaperController.hasNotes',
  hasReadBinding: 'Sqwerl.PaperController.hasRead',
  hasReadByBinding: 'Sqwerl.PaperController.hasReadBy',
  hasRecommendationsBinding: 'Sqwerl.PaperController.hasRecommendations',
  hasRecommendedByBinding: 'Sqwerl.PaperController.hasRecommendedBy',
  hasTagsBinding: 'Sqwerl.PaperController.hasTags',
  linksBinding: 'Sqwerl.PaperController.links',
  nameBinding: 'Sqwerl.PaperController.name',
  notesBinding: 'Sqwerl.PaperController.notes',
  readByBinding: 'Sqwerl.PaperController.readBy',
  recommendationsBinding: 'Sqwerl.PaperController.recommendations',
  recommendedByBinding: 'Sqwerl.PaperController.recommendedBy',
  representationsBinding: 'Sqwerl.PaperController.representations',
  tagsBinding: 'Sqwerl.PaperController.tags',
  templateName: 'paper_view',
  titleBinding: 'Sqwerl.PaperController.title',
  typeIconBinding: 'Sqwerl.PaperController.typeIcon',
  urlBinding: 'Sqwerl.PaperController.url'
});
