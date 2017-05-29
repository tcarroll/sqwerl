/*globals SC, Sqwerl*/

/**
 * Views of security roles. Security roles specify what Sqwerl users are allowed to do.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.RoleView = SC.TemplateView.create({
  capabilitiesBinding: 'Sqwerl.RoleController.capabilities',
  createdOnBinding: 'Sqwerl.RoleController.createdOn',
  creatorBinding: 'Sqwerl.RoleController.creator',
  descriptionBinding: 'Sqwerl.RoleController.description',
  groupsBinding: 'Sqwerl.RoleController.groups',
  hasCapabilitiesBinding: 'Sqwerl.RoleController.hasCapabilities',
  hasConnectionsBinding: 'Sqwerl.RoleController.hasConnections',
  hasGroupsBinding: 'Sqwerl.RoleController.hasGroups',
  hasMultipleCapabilitiesBinding: 'Sqwerl.RoleController.hasMultipleCapabilities',
  hasMultipleConnectionsBinding: 'Sqwerl.RoleController.hasMultipleConnections',
  hasMultipleGroupsBinding: 'Sqwerl.RoleController.hasMultipleGroups',
  nameBinding: 'Sqwerl.RoleController.name',
  singleCapabilityNameBinding: 'Sqwerl.RoleController.singleCapabilityName',
  singleGroupNameBinding: 'Sqwerl.RoleController.singleGroupName',
  templateName: 'role_view',
  typeIconBinding: 'Sqwerl.RoleController.typeIcon'
});
