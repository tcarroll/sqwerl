/*globals SC, Sqwerl*/

Sqwerl.SearchResultsController = SC.ObjectController.create({

    isSortedAscendinglyByLinks: false,

    isSortedAscendinglyByName: true,

    isSortedAscendinglyByType: false,

    isSortedDescendinglyByLinks: false,

    isSortedDescendinglyByName: false,

    isSortedDescendinglyByType: false,

    hasMoreThanOne: Sqwerl.property(function () {
        'use strict';
        return (this.get('total') > 1);
    }),

    hasOnlyOne: Sqwerl.property(function () {
        'use strict';
        var searchItems = this.get('searchItems');
        return searchItems && (searchItems.length === 1);
    }),

    isShowingPartialResults: Sqwerl.property(function () {
        'use strict';
        return this.get('total') > this.get('limit');
    }),

    startingAt: Sqwerl.property(function () {
        'use strict';
        var offset = this.get('offset'),
            startingAt;
        if (!isNaN(parseFloat(offset)) && isFinite(offset)) {
            startingAt = offset + 1;
        } else {
            startingAt = 1;
        }
        return startingAt;
    }),

    /**
     * Toggle the sort order between ascending and descending sorts for a search result aspect.
     *
     * @param sortBy  The name of a search result property that users can order search results by.
     */
    toggleSortOrder: function (sortBy) {
        'use strict';
        var controller = this,
            isInAscendingOrder = this.get('isSortedAscendinglyBy' + sortBy);
        this.set('isSortedAscendinglyBy' + sortBy, !isInAscendingOrder);
        this.set('isSortedDescendinglyBy' + sortBy, isInAscendingOrder);
        ['Links', 'Name', 'Type'].forEach(function (key) {
            if (sortBy !== key) {
                controller.set('isSortedAscendinglyBy' + key, false);
                controller.set('isSortedDescendinglyBy' + key, false);
            }
        });
    }
});