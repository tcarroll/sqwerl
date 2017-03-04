/*globals SC, Sqwerl*/

Sqwerl.AccountView = SC.TemplateView.create({
  isEnabledTextBinding: 'Sqwerl.AccountController.isEnabledText',
  lastSignedInTimeTextBinding: 'Sqwerl.AccountController.lastSignedInTimeText',
  isLockedTextBinding: 'Sqwerl.AccountController.isLockedText',
  mustChangePasswordTextBinding: 'Sqwerl.AccountController.mustChangePasswordText',
  templateName: 'account_view'
});
