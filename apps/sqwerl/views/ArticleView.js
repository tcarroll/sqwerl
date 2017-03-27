/*globals SC, Sqwerl*/

/**
 * Views of things that are articles from periodicals.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.ArticleView = SC.TemplateView.create({
  authorsBinding: 'Sqwerl.ArticleController.authors',
  categoriesBinding: 'Sqwerl.ArticleController.categories',
  connectionCountBinding: 'Sqwerl.ArticleController.connectionCount',
  connectionCountTextBinding: 'Sqwerl.ArticleController.connectionCountText',
  createdOnBinding: 'Sqwerl.ArticleController.createdOn',
  creatorBinding: 'Sqwerl.ArticleController.creator',
  descriptionBinding: 'Sqwerl.ArticleController.description',
  hasAuthorsBinding: 'Sqwerl.ArticleController.hasAuthors',
  hasCategoriesBinding: 'Sqwerl.ArticleController.hasCategories',
  hasConnectionsBinding: 'Sqwerl.ArticleController.hasConnections',
  hasLinksBinding: 'Sqwerl.ArticleController.hasLinks',
  hasMultipleAuthorsBinding: 'Sqwerl.ArticleController.hasMultipleAuthors',
  hasMultipleCategoriesBinding: 'Sqwerl.ArticleController.hasMultipleCategories',
  hasMultipleConnectionsBinding: 'Sqwerl.ArticleController.hasMultipleConnections',
  hasMultipleLinksBinding: 'Sqwerl.ArticleController.hasMultipleLinks',
  hasMultipleNotesBinding: 'Sqwerl.ArticleController.hasMultipleNotes',
  hasMultipleReadByBinding: 'Sqwerl.ArticleController.hasMultipleReadBy',
  hasMultipleRecommendationsBinding: 'Sqwerl.ArticleController.hasMultipleRecommendations',
  hasMultipleTagsBinding: 'Sqwerl.ArticleController.hasMultipleTags',
  hasNotesBinding: 'Sqwerl.ArticleController.hasNotes',
  hasReadByBinding: 'Sqwerl.ArticleController.hasReadBy',
  hasRecommendationsBinding: 'Sqwerl.ArticleController.hasRecommendations',
  hasRecommendedByBinding: 'Sqwerl.ArticleController.hasRecommendedBy',
  hasTagsBinding: 'Sqwerl.ArticleController.hasTags',
  linksBinding: 'Sqwerl.ArticleController.links',
  nameBinding: 'Sqwerl.ArticleController.name',
  notesBinding: 'Sqwerl.ArticleController.notes',
  readByBinding: 'Sqwerl.ArticleController.readBy',
  recommendationsBinding: 'Sqwerl.ArticleController.recommendations',
  recommendedByBinding: 'Sqwerl.ArticleController.recommendedBy',
  tagsBinding: 'Sqwerl.ArticleController.tags',
  templateName: 'article_view',
  typeIconBinding: 'Sqwerl.ArticleController.typeIcon'
});
