/*globals SC, Sqwerl*/

/**
 * Views of academic courses.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.CourseView = SC.TemplateView.create({
  attendedByBinding: 'Sqwerl.CourseController.attendedBy',
  categoriesBinding: 'Sqwerl.CourseController.categories',
  connectionCountBinding: 'Sqwerl.CourseController.connectionCount',
  connectionCountTextBinding: 'Sqwerl.CourseController.connectionCountText',
  descriptionBinding: 'Sqwerl.CourseController.description',
  hasAttendedBinding: 'Sqwerl.CourseController.hasAttended',
  hasAttendedByBinding: 'Sqwerl.CourseController.hasAttendedBy',
  hasCategoriesBinding: 'Sqwerl.CourseController.hasCategories',
  hasConnectionsBinding: 'Sqwerl.CourseController.hasConnections',
  hasInstructorsBinding: 'Sqwerl.CourseController.hasInstructors',
  hasLinksBinding: 'Sqwerl.CourseController.hasLinks',
  hasMultipleAttendedByBinding: 'Sqwerl.CourseController.hasMultipleAttendedBy',
  hasMultipleCategoriesBinding: 'Sqwerl.CourseController.hasMultipleCategories',
  hasMultipleConnectionsBinding: 'Sqwerl.CourseController.hasMultipleConnections',
  hasMultipleInstructorsBinding: 'Sqwerl.CourseController.hasMultipleInstructors',
  hasMultipleLinksBinding: 'Sqwerl.CourseController.hasMultipleLinks',
  hasMultipleNotesBinding: 'Sqwerl.CourseController.hasMultipleNotes',
  hasMultipleRecommendationsBinding: 'Sqwerl.CourseController.hasMultipleRecommendations',
  hasMultipleTagsBinding: 'Sqwerl.CourseController.hasMultipleTags',
  hasNotesBinding: 'Sqwerl.CourseController.hasNotes',
  hasRecommendationsBinding: 'Sqwerl.CourseController.hasRecommendations',
  hasRecommendedByBinding: 'Sqwerl.CourseController.hasRecommendedBy',
  hasTagsBinding: 'Sqwerl.CourseController.hasTags',
  instructorsBinding: 'Sqwerl.CourseController.instructors',
  linksBinding: 'Sqwerl.CourseController.links',
  nameBinding: 'Sqwerl.CourseController.name',
  notesBinding: 'Sqwerl.CourseController.notes',
  recommendationsBinding: 'Sqwerl.CourseController.recommendations',
  recommendedByBinding: 'Sqwerl.CourseController.recommendedBy',
  tagsBinding: 'Sqwerl.CourseController.tags',
  templateName: 'course_view',
  typeIcon: 'Sqwerl.CourseController.typeIcon'
});
