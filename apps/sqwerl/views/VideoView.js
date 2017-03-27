/*globals SC, Sqwerl*/

/**
 * Views that show information about videos.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.VideoView = SC.TemplateView.create({
  authorsBinding: 'Sqwerl.VideoController.authors',
  categoriesBinding: 'Sqwerl.VideoController.categories',
  connectionCountBinding: 'Sqwerl.VideoController.connectionCount',
  connectionCountTextBinding: 'Sqwerl.VideoController.connectionCountText',
  descriptionBinding: 'Sqwerl.VideoController.description',
  hasAuthorsBinding: 'Sqwerl.VideoController.hasAuthors',
  hasCategoriesBinding: 'Sqwerl.VideoController.hasCategories',
  hasConnectionsBinding: 'Sqwerl.VideoController.hasConnections',
  hasLinksBinding: 'Sqwerl.VideoController.hasLinks',
  hasMultipleAuthorsBinding: 'Sqwerl.VideoController.hasMultipleAuthors',
  hasMultipleCategoriesBinding: 'Sqwerl.VideoController.hasMultipleCategories',
  hasMultipleConnectionsBinding: 'Sqwerl.VideoController.hasMultipleConnections',
  hasMultipleLinksBinding: 'Sqwerl.VideoController.hasMultipleLinks',
  hasMultipleNotesBinding: 'Sqwerl.VideoController.hasMultipleNotes',
  hasMultipleRecommendationsBinding: 'Sqwerl.VideoController.hasMultipleRecommendations',
  hasMultipleTagsBinding: 'Sqwerl.VideoController.hasMultipleTags',
  hasMultipleViewedByBinding: 'Sqwerl.VideoController.hasMultipleViewedBy',
  hasNotesBinding: 'Sqwerl.VideoController.hasNotes',
  hasRecommendationsBinding: 'Sqwerl.VideoController.hasRecommendations',
  hasRecommendedByBinding: 'Sqwerl.VideoController.hasRecommendedBy',
  hasTagsBinding: 'Sqwerl.VideoController.hasTags',
  hasViewedBinding: 'Sqwerl.VideoController.hasViewed',
  hasViewedByBinding: 'Sqwerl.VideoController.hasViewedBy',
  linksBinding: 'Sqwerl.VideoController.links',
  nameBinding: 'Sqwerl.VideoController.name',
  notesBinding: 'Sqwerl.VideoController.notes',
  pageLinkBinding: 'Sqwerl.VideoController.pageLink',
  recommendationsBinding: 'Sqwerl.VideoController.recommendations',
  recommendedByBinding: 'Sqwerl.VideoController.recommendedBy',
  tagsBinding: 'Sqwerl.VideoController.tags',
  titleBinding: 'Sqwerl.VideoController.title',
  templateName: 'video_view',
  typeIconBinding: 'Sqwerl.VideoController.typeIcon',
  urlBinding: 'Sqwerl.VideoController.url',
  viewedByBinding: 'Sqwerl.VideoController.viewedBy'
});
