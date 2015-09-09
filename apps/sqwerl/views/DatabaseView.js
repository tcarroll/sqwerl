/*globals SC, Sqwerl*/

Sqwerl.DatabaseView = SC.TemplateView.create({
    descriptionBinding: 'Sqwerl.DatabaseController.description',
    nameBinding: 'Sqwerl.DatabaseController.name',
    templateName: 'database_view',
    typeIcon: 'Sqwerl.DatabaseController.typeIcon'
});
