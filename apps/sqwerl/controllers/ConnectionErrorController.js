/*globals SC, Sqwerl*/

/**
 * Controller for a UI that gets displayed when the Sqwerl client application cannot communicate with its server.
 */
Sqwerl.ConnectionErrorController = SC.ObjectController.create({

    message: '',

    status: null
});