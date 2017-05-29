/*globals SC, Sqwerl*/

/**
 * Views of talks given by presenters to audiences.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.TalkView = SC.TemplateView.create({
  attendedByBinding: 'Sqwerl.TalkController.attendedBy',
  categoriesBinding: 'Sqwerl.TalkController.categories',
  connectionCountBinding: 'Sqwerl.TalkController.connectionCount',
  connectionCountTextBinding: 'Sqwerl.TalkController.connectionCountText',
  createdOnBinding: 'Sqwerl.TalkController.createdOn',
  creatorBinding: 'Sqwerl.TalkController.creator',
  descriptionBinding: 'Sqwerl.TalkController.description',
  hasAttendedBinding: 'Sqwerl.TalkController.hasAttended',
  hasAttendedByBinding: 'Sqwerl.TalkController.hasAttendedBy',
  hasCategoriesBinding: 'Sqwerl.TalkController.hasCategories',
  hasConnectionsBinding: 'Sqwerl.TalkController.hasConnections',
  hasLinksBinding: 'Sqwerl.TalkController.hasLinks',
  hasListenedToBinding: 'Sqwerl.TalkController.hasListenedTo',
  hasListenersBinding: 'Sqwerl.TalkController.hasListeners',
  hasMultipleAttendedByBinding: 'Sqwerl.TalkController.hasMultipleAttendedBy',
  hasMultipleCategoriesBinding: 'Sqwerl.TalkController.hasMultipleCategories',
  hasMultipleConnectionsBinding: 'Sqwerl.TalkController.hasMultipleConnections',
  hasMultipleLinksBinding: 'Sqwerl.TalkController.hasMultipleLinks',
  hasMultipleListenersBinding: 'Sqwerl.TalkController.hasMultipleListeners',
  hasMultipleNotesBinding: 'Sqwerl.TalkController.hasMultipleNotes',
  hasMultipleRecommendationsBinding: 'Sqwerl.TalkController.hasMultipleRecommendations',
  hasMultipleRecommendedByBinding: 'Sqwerl.TalkController.hasMultipleRecommendedBy',
  hasMultipleSpeakersBinding: 'Sqwerl.TalkController.hasMultipleSpeakers',
  hasMultipleTagsBinding: 'Sqwerl.TalkController.hasMultipleTags',
  hasNotesBinding: 'Sqwerl.TalkController.hasNotes',
  hasRecommendationsBinding: 'Sqwerl.TalkController.hasRecommendations',
  hasRecommendedByBinding: 'Sqwerl.TalkController.hasRecommendedBy',
  hasSpeakersBinding: 'Sqwerl.TalkController.hasSpeakers',
  hasTagsBinding: 'Sqwerl.TalkController.hasTags',
  listenersBinding: 'Sqwerl.TalkController.listeners',
  nameBinding: 'Sqwerl.TalkController.name',
  notesBinding: 'Sqwerl.TalkController.notes',
  recommendationsBinding: 'Sqwerl.TalkController.recommendations',
  recommendedByBinding: 'Sqwerl.TalkController.recommendedBy',
  representationsBinding: 'Sqwerl.TalkController.representations',
  speakersBinding: 'Sqwerl.TalkController.speakers',
  tagsBinding: 'Sqwerl.TalkController.tags',
  templateName: 'talk_view',
  typeIconBinding: 'Sqwerl.TalkController.typeIcon'
});
