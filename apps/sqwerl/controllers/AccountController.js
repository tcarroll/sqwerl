/* globals sc_require, Sqewrl */

sc_require('controllers/ViewController');

/**
 * Controller that manages a read-only view of user accounts.
 *
 * @type {Sqwerl.ViewController}
 */
Sqwerl.AccountController = Sqwerl.ViewController.create({

  isEnabledText: Sqwerl.property(function () {
    return this.get('isEnabled') ? 'Yes' : 'No';
  }),

  lastSignedInTimeText: Sqwerl.property(function () {
    return this.get('lastSignedInTime');
  }),

  isLockedText: Sqwerl.property(function () {
    return this.get('isLocked') ? 'Yes' : 'No';
  }),

  isMyAccount: Sqwerl.property(function () {
    let isSignedIn = this.get('isSignedIn');
    let user = this.get('user');
    return isSignedIn && user && (user.id === Sqwerl.userId);
  }),

  mustChangePasswordText: Sqwerl.property(function () {
    return this.get('mustChangePassword') ? 'Yes' : 'No';
  }),
});