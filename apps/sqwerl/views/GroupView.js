/*globals SC, Sqwerl*/

Sqwerl.GroupView = SC.TemplateView.create({
    connectionCountBinding: 'Sqwerl.GroupController.connectionCount',
    descriptionBinding: 'Sqwerl.GroupController.description',
    hasConnectionsBinding: 'Sqwerl.GroupController.hasConnections',
    hasMultipleConnectionsBinding: 'Sqwerl.GroupController.hasMultipleConnections',
    hasMultipleRolesBinding: 'Sqwerl.GroupController.hasMultipleRoles',
    hasMultipleSubgroupsBinding: 'Sqwerl.GroupController.hasMultipleSubgroups',
    hasMultipleUsersBinding: 'Sqwerl.GroupController.hasMultipleUsers',
    hasRolesBinding: 'Sqwerl.GroupController.hasRoles',
    hasSubgroupsBinding: 'Sqwerl.GroupController.hasSubgroups',
    hasUsersBinding: 'Sqwerl.GroupController.hasUsers',
    nameBinding: 'Sqwerl.GroupController.name',
    parentBinding: 'Sqwerl.GroupController.parent',
    rolesBinding: 'Sqwerl.GroupController.roles',
    subgroupsBinding: 'Sqwerl.GroupController.subgroups',
    typeIcon: 'Sqwerl.GroupController.typeIcon',
    templateName: 'group_view',
    usersBinding: 'Sqwerl.GroupController.users'
});
