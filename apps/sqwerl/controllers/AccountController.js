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

  mustChangePasswordText: Sqwerl.property(function () {
    return this.get('mustChangePassword') ? 'Yes' : 'No';
  }),
});