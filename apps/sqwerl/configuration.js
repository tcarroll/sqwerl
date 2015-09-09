/*globals Configuration:true, SC, sc_require*/

/**
 * Application configuration information, allows the application to run with different
 * configurations (for example: development, testing, and production).
 */
var Configuration = SC.Object.extend({
    anonymousUserId: 'guest@sqwerl.com',
    anonymousUserName: 'guest',
    applicationName: 'sqwerl',
    baseUrl: '/sqwerl/tcarroll',
    catalogDatabaseName: 'catalog',
    defaultDatabaseName: 'tcarroll',
    VERSION: '0.1.2'
});