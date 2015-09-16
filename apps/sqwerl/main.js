/*globals Handlebars, navigator, SC, Sqwerl, sweetAlert, window*/

/**
 * The initial execution point for the Sqwerl SproutCore-based client application. SproutCore creates an initial
 * HTML document for this application that invokes this method to start the application.
 */
function main() {
    'use strict';
    try {
        Sqwerl.main();
    } catch (error) {
        Sqwerl.handleError(error);
    }
}

/**
 * Notifies the user that a fatal (non-recoverable) error has occurred.
 *
 * @param error     An error that occurred that prevents this application from executing.
 */
Sqwerl.handleError = function handleError(error) {
    'use strict';
    SC.error('%@ Nuts! Sqwerl has encountered an error condition that it can\'t recover from.\n%@', this, error.stack);
    sweetAlert({
        confirmButtonColor: 'rgba(0, 40, 0, 0.8)',
        confirmButtonText: 'main.fatalErrorDialog.confirmButton.text'.loc(),
        html: 'main.fatalErrorDialog.text'.loc(),
        title: 'main.fatalErrorDialog.title'.loc(),
        type: 'error'
    }, function () {
        var emailContent = '';
        emailContent += 'applicationVersion=\'' + Sqwerl.VERSION + '\'\n';
        emailContent += 'browserVendor=\'' + navigator.vendor + '\'\n';
        emailContent += 'browserVersion=\'' + navigator.appVersion + '\'\n';
        emailContent += 'error=\'' + error + '\'\n';
        emailContent += 'platform=\'' + navigator.platform + '\'\n';
        emailContent += 'screenResolution=\'' + window.screen.width + 'x' + window.screen.height + '\'\n';
        emailContent += 'time=\'' + new Date().toISOString() + '\'\n';
        emailContent += 'trace=\'' + error.stack + '\'\n';
        emailContent += 'user=\'' + Sqwerl.userName + '\'\n';
        emailContent += 'userAgent=\'' + navigator.userAgent + '\'\n';
        window.open('mailto:sqwerl@sqwerl.com?subject=Sqwerl Error Report&body=%@'.fmt(encodeURI(emailContent)));
    });
    SC.error('%@: A serious error has occurred. %@', this, error.stack);
};

/**
 * Starts this application.
 */
Sqwerl.main = function () {
    'use strict';
    var onError = function (response) {
        var controller = Sqwerl.get('ConnectionErrorController'),
            modal;
        if (response && (response.status > 399)) {
            Sqwerl.mainPage.setNavigationBusy(false);
            controller.set('message', response.errorObject.message);
            controller.set('status', response.status);
            Sqwerl.mainPage.mainPane.errorPane.set('isVisible', true);
            Sqwerl.mainPage.mainPane.errorPane.set('nowShowing', Sqwerl.get('ConnectionErrorView'));
            modal = Sqwerl.mainPage.mainPane.errorPane.$('#connection-error-message-panel');
            modal.addClass('bounce-in');
            modal.css('visibility', 'visible');
        }
    };
    SC.ExceptionHandler.handleException = Sqwerl.handleError;
    Sqwerl.navigationController = new Sqwerl.NavigationController();
    Sqwerl.registerHandlebarsHelpers();
    Sqwerl.getPath('mainPage.mainPane').append();
    SC.routes.add('/*', Sqwerl, Sqwerl.route);
    Sqwerl.navigationController.goTo('/', onError);
};

/**
 * Registers helpers for the HandlerBars HTML generation library. Helpers are JavaScript functions that
 * can be referenced within templates files that the HandleBars library parses in order to create HTML content.
 */
Sqwerl.registerHandlebarsHelpers = function () {
    'use strict';
    Handlebars.registerHelper('typeOfThingName', function () {
        var components = this.id.split('/'),
            typeName = (components.length > 2) ? components[2] : (components.length > 0) ? components[1] : '';
        return {
            'articles': 'Article',
            'authors': 'Author',
            'books': 'Book',
            'capabilities': 'Capability',
            'categories': 'Category',
            'courses': 'Course',
            'databases': 'Database',
            'documents': 'Document',
            'facets': 'Facet',
            'feeds': 'Feed',
            'groups': 'Group',
            'notes': 'Notes',
            'papers': 'Paper',
            'podcasts': 'Podcast',
            'roles': 'Role',
            'tags': 'Tag',
            'talks': 'Talk',
            'types': 'Type',
            'users': 'User',
            'videos': 'Video',
            'views': 'View',
            'webPages': 'Web page'
        }[typeName];
    });
    Handlebars.registerHelper('numberFormat', function (propertyName) {
        var components = propertyName.split('.'),
            context = this,
            value;
        components.forEach(function (component) {
            value = context[component];
            context = value;
        });
        return value && value.toLocaleString();
    });
    Handlebars.registerHelper('singularOrPlural', function (propertyName, singular, plural) {
        var count = this[propertyName];
        return (count < 2) ? singular : plural;
    });
    Handlebars.registerHelper('thingPath', function () {
        var components,
            i,
            length,
            path = this.path,
            result = '';
        if (path) {
            components = path.split('/');
            if (components && (components.length > 3)) {
                length = components.length;
                for (i = 3; i < length; i += 1) {
                    result += components[i];
                    if (i < (length - 1)) {
                        result += '&nbsp;&#187;&nbsp;';
                    }
                }
            }
        }
        return result;
    });
};

Sqwerl.route = function (parameters) {
    'use strict';
    Sqwerl.navigationController.goTo('/' + parameters['']);
};

window.onerror = function (errorMessage, url, lineNumber) {
    'use strict';
    var error = new Error(errorMessage);
    error.stack = 'At line number ' + lineNumber + ' in ' + url;
    Sqwerl.handleError(error);
};