/*globals SC, Sqwerl*/

Sqwerl.SearchResultsController = SC.ObjectController.create({

    hasMoreThanOne: Sqwerl.property(function () {
        'use strict';
        return (this.get('total') > 1);
    }),

    hasOnlyOne: Sqwerl.property(function () {
        'use strict';
        return this.get('total') === 0;
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
    })
});