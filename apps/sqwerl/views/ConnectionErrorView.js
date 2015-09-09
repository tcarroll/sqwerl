/*globals SC, Sqwerl*/

Sqwerl.ConnectionErrorView = SC.TemplateView.create({
    messageBinding: 'Sqwerl.ConnectionErrorController.message',
    statusBinding: 'Sqwerl.ConnectionErrorController.status',
    templateName: 'connection_error_view'
});