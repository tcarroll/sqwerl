/*globals SC, Sqwerl*/

/**
 * Views of books (published written works).
 *
 * @type {SC.TemplateView}
 */
Sqwerl.BookView = SC.TemplateView.create({
  authorsBinding: 'Sqwerl.BookController.authors',
  categoriesBinding: 'Sqwerl.BookController.categories',
  connectionCountBinding: 'Sqwerl.BookController.connectionCount',
  connectionCountTextBinding: 'Sqwerl.BookController.connectionCountText',
  createdOnBinding: 'Sqwerl.BookController.createdOn',
  creatorBinding: 'Sqwerl.BookController.creator',
  displayLinksBinding: 'Sqwerl.BookController.displayLinks',
  displayPropertiesBinding: 'Sqwerl.BookController.displayProperties',
  graphUrlBinding: 'Sqwerl.BookController.graphUrl',
  hasAuthorsBinding: 'Sqwerl.BookController.hasAuthors',
  hasCategoriesBinding: 'Sqwerl.BookController.hasCategories',
  hasCommentsBinding: 'Sqwerl.BookController.hasComments',
  hasConnectionsBinding: 'Sqwerl.BookController.hasConnections',
  hasLinksBinding: 'Sqwerl.BookController.hasLinks',
  hasMultipleAuthorsBinding: 'Sqwerl.BookController.hasMultipleAuthors',
  hasMultipleCategoriesBinding: 'Sqwerl.BookController.hasMultipleCategories',
  hasMultipleConnectionsBinding: 'Sqwerl.BookController.hasMultipleConnections',
  hasMultipleCommentsBinding: 'Sqwerl.BookController.hasMultipleComments',
  hasMultipleLinksBinding: 'Sqwerl.BookController.hasMultipleLinks',
  hasMultipleNotesBinding: 'Sqwerl.BookController.hasMultipleNotes',
  hasMultipleReadingBinding: 'Sqwerl.BookController.hasMultipleReading',
  hasMultipleReadByBinding: 'Sqwerl.BookController.hasMultipleReadBy',
  hasMultipleRecommendedByBinding: 'Sqwerl.BookController.hasMultipleRecommendedBy',
  hasMultipleRecommendationsBinding: 'Sqwerl.BookController.hasMultipleRecommendations',
  hasMultipleTagsBinding: 'Sqwerl.BookController.hasMultipleTags',
  hasNotesBinding: 'Sqwerl.BookController.hasNotes',
  hasReadBinding: 'Sqwerl.BookController.hasRead',
  hasReadByBinding: 'Sqwerl.BookController.hasReadBy',
  hasReadingBinding: 'Sqwerl.BookController.hasReading',
  hasRecommendationsBinding: 'Sqwerl.BookController.hasRecommendations',
  hasRecommendedByBinding: 'Sqwerl.BookController.hasRecommendedBy',
  hasTagsBinding: 'Sqwerl.BookController.hasTags',
  linksBinding: 'Sqwerl.BookController.links',
  nameBinding: 'Sqwerl.BookController.name',
  notesBinding: 'Sqwerl.BookController.notes',
  readByBinding: 'Sqwerl.BookController.readBy',
  readingBinding: 'Sqwerl.BookController.reading',
  recommendationsBinding: 'Sqwerl.BookController.recommendations',
  recommendedByBinding: 'Sqwerl.BookController.recommendedBy',
  representationsBinding: 'Sqwerl.BookController.representations',
  tagsBinding: 'Sqwerl.BookController.tags',
  templateName: 'book_view',
  titleBinding: 'Sqwerl.BookController.title',
  thumbnailBinding: 'Sqwerl.BookController.thumbnail',
  thumbnailFileNameBinding: 'Sqwerl.BookController.thumbnailFileName',
  typeIconBinding: 'Sqwerl.BookController.typeIcon'
});
