/*globals NO, SC, Sqwerl, YES*/

/**
 * List views that can have a focused item. A focused list item is an item within a list view that reacts to
 * keyboard events.
 */
Sqwerl.ListView = SC.ListView.extend({

    /**
     * The index of this list's item that has the keyboard input focus. The user can use the keyboard to change
     * which one of this list's items has the focus. Having the input focus is different than being selected. When
     * the user selects an item that has children, this list view displays that item's children.
     */
    focusedIndex: SC.Object.create({
        index: -1,
        isObservable: YES
    }),

    /**
     * Value for the focused item index when none of this list view's items has the keyboard input focus. The
     * list item with the keyboard input focus is the item that this list view forwards keyboard events to.
     */
    UNFOCUSED_ITEM_INDEX: SC.Object.create({
        index: -1,
        isObservable: YES
    }),

    clearFocusedIndex: function () {
        'use strict';
        this.set('focusedIndex', this.UNFOCUSED_ITEM_INDEX);
    },

    /**
     * Moves the keyboard input focus to the item with the given index.
     *
     * @param {Number} index -1 if no item is to be focused, otherwise the index of the item to grant the keyboard focus to.
     */
    focus: function (index) {
        'use strict';
        var newFocusedIndex,
            oldFocusedIndex = this.focusedIndex ? this.focusedIndex.index : this.UNFOCUSED_ITEM_INDEX.index,
            visibleItems = this.nowShowing(),
            firstVisibleIndex = visibleItems.firstObject();
        if (this.childViews && (oldFocusedIndex >= 0) && (this.childViews.length > oldFocusedIndex - firstVisibleIndex)) {
            this.childViews[Math.max(0, oldFocusedIndex - firstVisibleIndex)].set('isFocused', NO);
        }
        if (!visibleItems.contains(index)) {
            this.parentView.parentView.scrollToContentIndex(index);
        }
        newFocusedIndex = index;
        if (((index - firstVisibleIndex) >= 0) && (this.childViews.length > (index - firstVisibleIndex))) {
            this.focusedIndex = newFocusedIndex;
            this.childViews[index - firstVisibleIndex].set('isFocused', YES);
        }
    },

    /**
     * Moves the keyboard input focus to the next item. Grants the keyboard input focus to this list's item that
     * follows this list's item that currently has the keyboard input focus.
     */
    focusNextItem: function () {
        'use strict';
        var childViews = this.childViews,
            content = this.get('content'),
            index = this.focusedIndex ? this.focusedIndex.index : this.UNFOCUSED_ITEM_INDEX.index,
            newFocusedIndex,
            visibleItemCount = childViews ? childViews.length : 0,
            visibleItems = this.nowShowing(),
            firstVisibleIndex = visibleItems.firstObject(),
            visibleIndex = index - firstVisibleIndex,
            size = content ? content.length : 0;
        // Unfocus the item that may currently have the keyboard input focus.
        if (childViews && (index >= 0) && (visibleIndex >= 0) && (childViews.length > visibleIndex)) {
            childViews[visibleIndex].set('isFocused', NO);
            childViews[visibleIndex].updateLayer();
        }
        if (index < (size - 1)) {
            // Advance the keyboard input focus to the item that follows the item that currently has the input focus.
            index += 1;
            visibleIndex += 1;
            newFocusedIndex =
                this.focusedIndex ? this.focusedIndex.constructor.create() : SC.Object.create({ index: this.UNFOCUSED_ITEM_INDEX.index, isObservable: YES });
            // Scroll this list if the newly focused item isn't visible.
            if (index >= (firstVisibleIndex + visibleItemCount - 2) && (index < this.get('content').length)) {
                this.parentView.parentView.scrollTo(null, this.offsetForRowAtContentIndex(index - visibleItemCount + 1));
                childViews.forEach(function (view) {
                    view.updateLayerIfNeeded();
                });
            }
            newFocusedIndex.index = index;
            this.set('focusedIndex', newFocusedIndex);
            // Grant keyboard input focus to the next item.
            if (childViews && (visibleIndex >= 0) && (childViews.length > visibleIndex)) {
                childViews[visibleIndex].set("isFocused", YES);
                childViews.forEach(function (view) {
                    view.updateLayerIfNeeded();
                });
            }
        }
    },

    /**
     * Moves the keyboard input focus to the previous item. Grants the keyboard input focus to this list's item that
     * precedes this lists' item that currently has the keyboard input focus.
     */
    focusPreviousItem: function () {
        'use strict';
        var childViews = this.childViews,
            index = this.focusedIndex ? this.focusedIndex.index : this.UNFOCUSED_ITEM_INDEX.index,
            newFocusedIndex,
            visibleItemCount = childViews ? childViews.length : 0,
            visibleItems = this.nowShowing(),
            firstVisibleIndex = visibleItems.firstObject(),
            visibleIndex = index - firstVisibleIndex;
        if (index > 0) {
            // Remove the keyboard input focus from the item that may currently have the input focus.
            if (childViews && (index >= 0) && (visibleIndex >= 0) && (childViews.length > visibleIndex)) {
                childViews[visibleIndex].set('isFocused', NO);
                childViews[visibleIndex].updateLayer();
            }
            // Move the keyboard input focus to the item that precedes the item that currently has the input focus.
            index -= 1;
            visibleIndex -= 1;
            newFocusedIndex = this.focusedIndex ? this.focusedIndex.constructor.create() : SC.Object.create({ index: this.UNFOCUSED_ITEM_INDEX, isObservable: YES });
            // Scroll this list if the newly focused item isn't visible.
            if (index <= firstVisibleIndex) {
                this.parentView.parentView.scrollTo(null, this.offsetForRowAtContentIndex(index));
                this.childViews[1].set('isFocused', YES);
                newFocusedIndex.index = index;
                this.focusedIndex = newFocusedIndex;
                childViews.forEach(function (view) {
                    view.updateLayerIfNeeded();
                });
            } else {
                // Grant keyboard input focus to the preceding item.
                if (childViews && (visibleIndex >= 0) && (visibleIndex < visibleItemCount)) {
                    this.childViews[visibleIndex].set('isFocused', YES);
                }
                newFocusedIndex.index = index;
                this.focusedIndex = newFocusedIndex;
                childViews.forEach(function (view) {
                    view.updateLayerIfNeeded();
                });
            }
        }
    },

    heightForRowAtContentIndex: function () {
        'use strict';
        return Sqwerl.rowHeight;
    },

    offsetForRowAtContentIndex: function (index) {
        'use strict';
        return index * Sqwerl.rowHeight;
    },

    /**
     * Selects this list view's item that currently has the keyboard input focus.
     */
    selectFocusedItem: function () {
        'use strict';
        if (this.focusedIndex && (this.focusedIndex.index >= 0)) {
            this.select(SC.IndexSet.create(this.focusedIndex.index));
        }
    }
});