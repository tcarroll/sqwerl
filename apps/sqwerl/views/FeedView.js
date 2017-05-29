/*globals SC, Sqwerl*/

/**
 * Views of RSS feeds.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.FeedView = SC.TemplateView.create({
  authorsBinding: 'Sqwerl.FeedController.authors',
  categoriesBinding: 'Sqwerl.FeedController.categories',
  connectionCountBinding: 'Sqwerl.FeedController.connectionCount',
  connectionCountTextBinding: 'Sqwerl.FeedController.connectionCountText',
  createdOnBinding: 'Sqwerl.FeedController.createdOn',
  creatorBinding: 'Sqwerl.FeedController.creator',
  descriptionBinding: 'Sqwerl.FeedController.description',
  feedWebPageLinkBinding: 'Sqwerl.FeedController.feedWebPageLink',
  hasAuthorsBinding: 'Sqwerl.FeedController.hasAuthors',
  hasCategoriesBinding: 'Sqwerl.FeedController.hasCategories',
  hasConnectionsBinding: 'Sqwerl.FeedController.hasConnections',
  hasItemsBinding: 'Sqwerl.FeedController.hasItems',
  hasLinksBinding: 'Sqwerl.FeedController.hasLinks',
  hasMultipleAuthorsBinding: 'Sqwerl.FeedController.hasMultipleAuthors',
  hasMultipleCategoriesBinding: 'Sqwerl.FeedController.hasMultipleCategories',
  hasMultipleConnectionsBinding: 'Sqwerl.FeedController.hasMultipleConnections',
  hasMultipleItemsBinding: 'Sqwerl.FeedController.hasMultipleItems',
  hasMultipleLinksBinding: 'Sqwerl.FeedController.hasMultipleLinks',
  hasMultipleRecommendationsBinding: 'Sqwerl.FeedController.hasMultipleRecommendations',
  hasMultipleRecommendedByBinding: 'Sqwerl.FeedController.hasMultipleRecommendedBy',
  hasMultipleTagsBinding: 'Sqwerl.FeedController.hasMultipleTags',
  hasRecommendationsBinding: 'Sqwerl.FeedController.hasRecommendations',
  hasRecommendedByBinding: 'Sqwerl.FeedController.hasRecommendedBy',
  hasTagsBinding: 'Sqwerl.FeedController.hasTags',
  feedUrlBinding: 'Sqwerl.FeedController.feedUrl',
  itemCountBinding: 'Sqwerl.FeedController.itemCount',
  itemCountTextBinding: 'Sqwerl.FeedController.itemCountText',
  itemsBinding: 'Sqwerl.FeedController.items',
  linksBinding: 'Sqwerl.FeedController.links',
  nameBinding: 'Sqwerl.FeedController.name',
  pageLinkBinding: 'Sqwerl.FeedController.pageLink',
  recommendationsBinding: 'Sqwerl.FeedController.recommendations',
  recommendedByBinding: 'Sqwerl.FeedController.recommendedBy',
  tagsBinding: 'Sqwerl.FeedController.tags',
  templateName: 'feed_view',
  typeIconBinding: 'Sqwerl.FeedController.typeIcon',
  webPageBinding: 'Sqwerl.FeedController.webPage'
});
