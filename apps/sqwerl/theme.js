/*globals SC, Sqwerl*/

Sqwerl.Theme = SC.AceTheme.create({
    name: 'sqwerl'
});

// SproutCore needs to know that your app's theme exists
SC.Theme.addTheme(Sqwerl.Theme);

// Setting it as the default theme makes every pane SproutCore
// creates default to this theme unless otherwise specified.
SC.defaultTheme = 'sqwerl';

Sqwerl.Theme.splitDividerRenderDelegate = SC.RenderDelegate.create({

    className: 'split-divider',

    dividerSize: 1,

    splitPositionOffset: -2,

    splitSizeOffset: 3,

    render: function (dataSource, context) {
        'use strict';
        this.addSizeClassName(dataSource, context);
        context.push("<div class='line'></div>");
    },

    update: function (dataSource, jquery) {
        'use strict';
        this.updateSizeClassName(dataSource, jquery);
    }
});