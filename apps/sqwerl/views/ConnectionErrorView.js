/*globals SC, Sqwerl*/

/**
 * Displays information to notify users that a network error (connectivity issue) has occurred.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.ConnectionErrorView = SC.TemplateView.create({
    messageBinding: 'Sqwerl.ConnectionErrorController.message',
    statusBinding: 'Sqwerl.ConnectionErrorController.status',
    templateName: 'connection_error_view'
});