/*globals SC, Sqwerl*/

/**
 * Views that display (and allow users to navigate) a path through a hierarchical collection of objects.
 */
Sqwerl.TrailBarView = SC.View.extend({

    content: null,

    displayProperties: ['content'],

    path: [],

    /**
     * Goes to the thing that the trail bar item at the given index corresponds to.
     *
     * @param {number} index - Index for an item within a trail bar.
     */
    go: function (index) {
        'use strict';
        SC.run(function () {
            if (index === 0) {
                Client.navigationController.goHome();
            } else {
                Client.navigationController.go(this.path[this.path.length - index]);
            }
        }, this);
    },

    isNotHome: Sqwerl.property(function () {
        'use strict';
        var content = this.get('content');
        return content && content.ids && (content.ids.length > 1);
    }, 'content'),

    render: function (renderContext) {
        'use strict';
        var context = renderContext.begin('div'),
            i,
            ids,
            names;
        if (this.get('isNotHome')) {
            context.push('<a class="trail-bar-item home-item" href="#/">Home</a>');
            if (this.content && this.content.ids && this.content.names) {
                ids = this.content.ids;
                names = this.content.names;
                // For all other path elements after the Home element.
                for (i = 1; i < ids.length; i += 1) {
                    context.push('<a class="trail-bar-item" href="#%@">%@</a>'.fmt('/' + encodeURI(ids.slice(1, i + 1).join('/')), names[i]));
                }
            }
        }
        context.end();
    }
});