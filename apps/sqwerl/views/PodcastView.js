/*globals SC, Sqwerl*/

/**
 * Views of podcasts.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.PodcastView = SC.TemplateView.create({
  authorsBinding: 'Sqwerl.PodcastController.authors',
  categoriesBinding: 'Sqwerl.PodcastController.categories',
  connectionCountBinding: 'Sqwerl.PodcastController.connectionCount',
  connectionCountTextBinding: 'Sqwerl.PodcastController.connectionCountText',
  createdOnBinding: 'Sqwerl.PodcastController.createdOn',
  creatorBinding: 'Sqwerl.PodcastController.creator',
  descriptionBinding: 'Sqwerl.PodcastController.description',
  episodesBinding: 'Sqwerl.PodcastController.episodes',
  feedWebPageLinkBinding: 'Sqwerl.PodcastController.feedWebPageLink',
  hasAuthorsBinding: 'Sqwerl.PodcastController.hasAuthors',
  hasCategoriesBinding: 'Sqwerl.PodcastController.hasCategories',
  hasConnectionsBinding: 'Sqwerl.PodcastController.hasConnections',
  hasEpisodesBinding: 'Sqwerl.PodcastController.hasEpisodes',
  hasLinksBinding: 'Sqwerl.PodcastController.hasLinks',
  hasListenersBinding: 'Sqwerl.PodcastController.hasListeners',
  hasMultipleAuthorsBinding: 'Sqwerl.PodcastController.hasMultipleAuthors',
  hasMultipleCategoriesBinding: 'Sqwerl.PodcastController.hasMultipleCategories',
  hasMultipleConnectionsBinding: 'Sqwerl.PodcastController.hasMultipleConnections',
  hasMultipleEpisodesBinding: 'Sqwerl.PodcastController.hasMultipleEpisodes',
  hasMultipleLinksBinding: 'Sqwerl.PodcastController.hasMultipleLinks',
  hasMulitpleListenersBinding: 'Sqwerl.PodcastController.hasMultipleListeners',
  hasMultipleRecommendationsBinding: 'Sqwerl.PodcastController.hasMultipleRecommendations',
  hasMultipleRecommendedByBinding: 'Sqwerl.PodcastController.hasMultipleRecommendedBy',
  hasMultipleTagsBinding: 'Sqwerl.PodcastController.hasMultipleTags',
  hasRecommendationsBinding: 'Sqwerl.PodcastController.hasRecommendations',
  hasRecommendedByBinding: 'Sqwerl.PodcastController.hasRecommendedBy',
  hasTagsBinding: 'Sqwerl.PodcastController.hasTags',
  feedUrlBinding: 'Sqwerl.PodcastController.feedUrl',
  linksBinding: 'Sqwerl.PodcastController.links',
  nameBinding: 'Sqwerl.PodcastController.name',
  pageLinkBinding: 'Sqwerl.PodcastController.pageLink',
  recommendationsBinding: 'Sqwerl.PodcastController.recommendations',
  recommendedByBinding: 'Sqwerl.PodcastController.recommendedBy',
  tagsBinding: 'Sqwerl.PodcastController.tags',
  templateName: 'podcast_view',
  typeIconBinding: 'Sqwerl.PodcastController.typeIcon',
  webPageBinding: 'Sqwerl.PodcastController.webPage'
});