/*globals SC, Sqwerl*/

/**
 * Views that show information about web pages.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.WebPageView = SC.TemplateView.create({
  authorsBinding: 'Sqwerl.WebPageController.authors',
  categoriesBinding: 'Sqwerl.WebPageController.categories',
  connectionCountBinding: 'Sqwerl.WebPageController.connectionCount',
  connectionCountTextBinding: 'Sqwerl.WebPageController.connectionCountText',
  createdOnBinding: 'Sqwerl.WebPageController.createdOn',
  creatorBinding: 'Sqwerl.WebPageController.creator',
  descriptionBinding: 'Sqwerl.WebPageController.description',
  feedsBinding: 'Sqwerl.WebPageController.feeds',
  hasAuthorsBinding: 'Sqwerl.WebPageController.hasAuthors',
  hasCategoriesBinding: 'Sqwerl.WebPageController.hasCategories',
  hasConnectionsBinding: 'Sqwerl.WebPageController.hasConnections',
  hasFeedsBinding: 'Sqwerl.WebPageController.hasFeeds',
  hasLinksBinding: 'Sqwerl.WebPageController.hasLinks',
  hasMultipleAuthorsBinding: 'Sqwerl.WebPageController.hasMultipleAuthors',
  hasMultipleCategoriesBinding: 'Sqwerl.WebPageController.hasMultipleCategories',
  hasMultipleConnectionsBinding: 'Sqwerl.WebPageController.hasMultipleConnections',
  hasMultipleFeedsBinding: 'Sqwerl.WebPageController.hasMultipleFeeds',
  hasMultipleLinksBinding: 'Sqwerl.WebPageController.hasMultipleLinks',
  hasMultipleNotesBinding: 'Sqwerl.WebPageController.hasMultipleNotes',
  hasMultipleReadByBinding: 'Sqwerl.WebPageController.hasMultipleReadBy',
  hasMultipleRecommendationsBinding: 'Sqwerl.WebPageController.hasMultipleRecommendations',
  hasMultipleRecommendedByBinding: 'Sqwerl.WebPageController.hasMultipleRecommendedBy',
  hasMultipleTagsBinding: 'Sqwerl.WebPageController.hasMultipleTags',
  hasNotesBinding: 'Sqwerl.WebPageController.hasNotes',
  hasReadBinding: 'Sqwerl.WebPageController.hasRead',
  hasReadByBinding: 'Sqwerl.WebPageController.hasReadBy',
  hasRecommendationsBinding: 'Sqwerl.WebPageController.hasRecommendations',
  hasRecommendedByBinding: 'Sqwerl.WebPageController.hasRecommendedBy',
  hasTagsBinding: 'Sqwerl.WebPageController.hasTags',
  linksBinding: 'Sqwerl.WebPageController.links',
  nameBinding: 'Sqwerl.WebPageController.name',
  notesBinding: 'Sqwerl.WebPageController.notes',
  pageLinkBinding: 'Sqwerl.WebPageController.pageLink',
  readByBinding: 'Sqwerl.WebPageController.readBy',
  recommendationsBinding: 'Sqwerl.WebPageController.recommendations',
  recommendedByBinding: 'Sqwerl.WebPageController.recommendedBy',
  tagsBinding: 'Sqwerl.WebPageController.tags',
  templateName: 'webpage_view',
  titleBinding: 'Sqwerl.WebPageController.title',
  typeIconBinding: 'Sqwerl.WebPageController.typeIcon',
  urlBinding: 'Sqwerl.WebPageController.url'
});
