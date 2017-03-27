/*globals SC, Sqwerl*/

/**
 * Views of user's Sqwerl accounts.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.AccountView = SC.TemplateView.create({

  /**
   * Text to display to indicate that a user's account is enabled (hasn't been disabled).
   */
  isEnabledTextBinding: 'Sqwerl.AccountController.isEnabledText',

  /**
   * Text that shows the last time a user signed into the Sqwerl server.
   */
  lastSignedInTimeTextBinding: 'Sqwerl.AccountController.lastSignedInTimeText',

  /**
   * Text displayed to indicate that a user's account has been locked. Users are not allowed to sign in to Sqwerl
   * while their accounts are locked.
   */
  isLockedTextBinding: 'Sqwerl.AccountController.isLockedText',

  /**
   * Text displayed to indicate that a user must change his or her password in order to be able to sign in to Sqwerl.
   */
  mustChangePasswordTextBinding: 'Sqwerl.AccountController.mustChangePasswordText',

  /**
   * The name of this user interface view's Handlebars template used to render this view within a web browser.
   */
  templateName: 'account_view'
});
