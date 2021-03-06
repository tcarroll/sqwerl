/*globals SC, Sqwerl*/

/**
 * Views that show information about Sqwerl's users.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.UserView = SC.TemplateView.create({
  connectionCountBinding: 'Sqwerl.UserController.connectionCount',
  connectionCountTextBinding: 'Sqwerl.UserController.connectionCountText',
  createdOnBinding: 'Sqwerl.UserController.createdOn',
  creatorBinding: 'Sqwerl.UserController.creator',
  firstNameBinding: 'Sqwerl.UserController.firstName',
  groupsBinding: 'Sqwerl.UserController.groups',
  hasAttendedBinding: 'Sqwerl.UserController.hasAttended',
  hasConnectionsBinding: 'Sqwerl.UserController.hasConnections',
  hasGroupsBinding: 'Sqwerl.UserController.hasGroups',
  hasHasAttendedBinding: 'Sqwerl.UserController.hasHasAttended',
  hasHasListenedToBinding: 'Sqwerl.UserController.hasHasListenedTo',
  hasIsReadingBinding: 'Sqwerl.UserController.hasIsReading',
  hasListenedToBinding: 'Sqwerl.UserController.hasListenedTo',
  hasMultipleConnectionsBinding: 'Sqwerl.UserController.hasMultipleConnections',
  hasMultipleGroupsBinding: 'Sqwerl.UserController.hasMultipleGroups',
  hasMultipleHasAttendedBinding: 'Sqwerl.UserController.hasMultipleHasAttended',
  hasMultipleHasListenedToBinding: 'Sqwerl.UserController.hasMultipleHasListenedTo',
  hasMultipleHasReadBinding: 'Sqwerl.UserController.hasMultipleHasRead',
  hasMultipleHasViewedBinding: 'Sqwerl.UserController.hasMultipleHasViewed',
  hasMultipleIsReadingBinding: 'Sqwerl.UserController.hasMultipleIsReading',
  hasMultipleOwnsBinding: 'Sqwerl.UserController.hasMultipleOwns',
  hasOwnsBinding: 'Sqwerl.UserController.hasOwns',
  hasHasReadBinding: 'Sqwerl.UserController.hasHasRead',
  hasHasViewedBinding: 'Sqwerl.UserController.hasHasViewed',
  hasReadBinding: 'Sqwerl.UserController.hasRead',
  hasViewedBinding: 'Sqwerl.UserController.hasViewed',
  isReadingBinding: 'Sqwerl.UserController.isReading',
  isUserBinding: 'Sqwerl.UserController.isUser',
  lastNameBinding: 'Sqwerl.UserController.lastName',
  middleNameOrInitialBinding: 'Sqwerl.UserController.middleNameOrInitial',
  nameBinding: 'Sqwerl.UserController.name',
  ownsBinding: 'Sqwerl.UserController.owns',
  shortDescriptionBinding: 'Sqwerl.UserController.shortDescription',
  templateName: 'user_view',
  typeIconBinding: 'Sqwerl.UserController.typeIcon'
});
