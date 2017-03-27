/*globals  SC, Sqwerl*/

/**
 * Views of information about people who have authored (created) things.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.AuthorView = SC.TemplateView.extend({
  authorOfBinding: 'Sqwerl.AuthorController.authorOf',
  authorOfCountBinding: 'Sqwerl.AuthorController.authorOfCount',
  connectionCountBinding: 'Sqwerl.AuthorController.connectionCount',
  connectionCountTextBinding: 'Sqwerl.AuthorController.connectionCountText',
  firstNameBinding: 'Sqwerl.AuthorController.firstName',
  hasAuthorOfBinding: 'Sqwerl.AuthorController.hasAuthorOf',
  hasConnectionsBinding: 'Sqwerl.AuthorController.hasConnections',
  hasInstructedBinding: 'Sqwerl.AuthorController.hasInstructed',
  hasLinksBinding: 'Sqwerl.AuthorController.hasLinks',
  hasMultipleAuthorOfBinding: 'Sqwerl.AuthorController.hasMultipleAuthorOf',
  hasMultipleConnectionsBinding: 'Sqwerl.AuthorController.hasMultipleConnections',
  hasMultipleInstructedBinding: 'Sqwerl.AuthorController.hasMultipleInstructed',
  hasMultipleLinksBinding: 'Sqwerl.AuthorController.hasMultipleLinks',
  hasMultipleSpokeAtBinding: 'Sqwerl.AuthorController.hasMultipleSpokeAt',
  hasMultipleTagsBinding: 'Sqwerl.AuthorController.hasMultipleTags',
  hasSpokeAtBinding: 'Sqwerl.AuthorController.hasSpokeAt',
  hasTagsBinding: 'Sqwerl.AuthorController.hasTags',
  instructedBinding: 'Sqwerl.AuthorController.instructed',
  lastNameBinding: 'Sqwerl.AuthorController.lastName',
  linkedInUrlBinding: 'Sqwerl.AuthorController.linkedInUrl',
  linksBinding: 'Sqwerl.AuthorController.links',
  middleNameOrInitialBinding: 'Sqwerl.AuthorController.middleNameOrInitial',
  nameBinding: 'Sqwerl.AuthorController.name',
  spokeAtBinding: 'Sqwerl.AuthorController.spokeAt',
  tagsBinding: 'Sqwerl.AuthorController.tags',
  templateName: 'author_view',
  typeIconBinding: 'Sqwerl.AuthorController.typeIcon'
});
