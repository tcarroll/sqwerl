/*globals NO, SC, Sqwerl, YES*/

/**
 * Item user interface components. Items are the visual depiction within a graphical user interface of nodes within
 * a collection. That collection may be hierarchical, where the items within the collection have parent-child
 * relationships.
 */
Sqwerl.NavigationItemView = SC.ListItemView.extend(SC.ContentDisplay, {

  classNames: ['item-view'],

  contentDisplayProperties: 'icon isLoading isSelected sel node'.w(),

  displayProperties: 'isFocused isHovering isLoading isSelected'.w(),

  iconBinding: '.content.itemIcon',

  iconTitleBinding: '.content.itemIconTitle',

  isAnimated: NO,

  isFocused: NO,

  isHovering: NO,

  isLeaf: NO,

  isReusableInCollections: YES,

  layout: {left: 25},

  /**
   * Handles when the user double-clicks on an item.
   *
   * @param [event]   Unused.
   */
  doubleClick: function (event) {
    'use strict';
    var doubleClickHandler = this.parentView.doubleClickHandler;
    if (doubleClickHandler) {
      doubleClickHandler(this, event);
    }
  },

  /**
   * Invoked when the mouse pointer travels over an item.
   */
  mouseEntered: function () {
    'use strict';
    this.set('isHovering', YES);
  },

  /**
   * Invoked when the mouse pointer is no longer over an item.
   */
  mouseExited: function () {
    'use strict';
    this.set('isHovering', NO);
  },

  /**
   * Renders a list item.
   *
   * @param context       Rendering context.
   */
  render: function (context) {
    'use strict';
    var childrenCountKey,
      content = this.get('content'),
      count,
      del = this.displayDelegate,
      hasCount = false,
      isHovering = this.get('isHovering'),
      isSelected = this.get('isSelected'),
      key,
      value,
      working,
      classArray = [],
      index = this.get('contentIndex'),
      isLoading,
      element,
      focusedIndex = Sqwerl.mainPage.mainPane.horizontalSplitView.navigationView.navigationPanel.navigationScrollView.contentView.get('focusedIndex'),
      node;
    classArray.push((index % 2 === 0) ? 'even' : 'odd');
    context.setClass('disabled', !this.get('isEnabled'));
    if (isSelected) {
      classArray.push('list-item-selected');
      element = this.$().attr('class');
      if (element && (element.indexOf('unfocused') >= 0)) {
        classArray.push('unfocused');
      }
      context.removeClass('list-item-hover');
      // TODO
      // Sqwerl.mainPage.mainPane.horizontalSplitView.propertiesView.detailsBackgroundView.parentNavigatorItemIndicatorStrip.parentNavigationItemIndicator.$().css({ top: Sqwerl.rowHeight * index });
    } else {
      context.removeClass('list-item-selected');
      if (isHovering) {
        classArray.push('list-item-hover');
      } else {
        context.removeClass('list-item-hover');
      }
    }
    if (focusedIndex && (focusedIndex.index === index)) {
      classArray.push('focused-list-item');
    } else {
      context.removeClass('focused-list-item');
    }
    if (this.getDelegateProperty('contentAnimateKey', del)) {
      node = content.get('node');
      if (node && node.get(this.getDelegateProperty('contentAnimateKey', del))) {
        classArray.push('animate');
        context.$().bind('webkitAnimationStart mozAnimationStart animationStart', function callback() {
          node.set('isAnimating', YES);
        });
        context.$().bind('webkitAnimationEnd mozAnimationEnd animationEnd', function callback() {
          node.set('animate', NO);
          node.set('isAnimating', NO);
        });
      }
    }
    working = context.begin('div').addClass('sc-outline');
    key = this.getDelegateProperty('contentValueKey', del);
    value = (key && content) ? (content.get ? content.get(key) : content[key]) : content;
    isLoading = !value;
    if (isLoading) {
      value = 'navigationItemView.loadingText'.loc();
      if (content.load) {
        content.load();
      }
      working.addClass('loading');
    } else if (value && SC.typeOf(value) !== SC.T_STRING) {
      value = value.toString();
      working.removeClass('loading');
    }
    if (this.get('escapeHTML')) {
      value = SC.RenderContext.escapeHTML(value);
    }
    node = content ? content.get('node') : null;
    this.renderLabel(working, node ? node.get('pathId') : '', value, isLoading, isSelected);
    childrenCountKey = this.getDelegateProperty('childrenCountKey', del);
    if (childrenCountKey) {
      count = content.get(childrenCountKey);
      if (count && (count > 0)) {
        this.renderCount(working, count);
        hasCount = true;
        context.addClass('has-children');
      }
    }
    if (!hasCount) {
      // TODO - If all items at this level are the same type, then don't display the right font icon.
      if (this.getDelegateProperty('hasContentIcon', del)) {
        key = this.getDelegateProperty('contentIconKey', del);
        value = (key && content) ? (content.get ? content.get(key) : content[key]) : null;
        this.renderRightFontIcon(working, value);
      } else if (this.get('icon')) {
        this.renderRightFontIcon(working, this.get('icon'), this.get('iconTitle'));
      } else {
        node = content ? content.get('node') : null;
        if (node) {
          this.renderRightFontIcon(working, node.get('itemIcon'), node.get('itemIconTitle'));
        }
      }
    }
    // handle right icon
    if (node && (node.get('childrenCount') > 0) && this.getDelegateProperty('hasContentRightIcon', del)) {
      key = this.getDelegateProperty('contentRightIconKey', del);
      working.begin('span').addClass('has-children').end();
    }
    key = this.getDelegateProperty('contentUnreadCountKey', del);
    value = (key && content) ? (content.get ? content.get(key) : content[key]) : null;
    if (!SC.none(value) && (value !== 0)) {
      this.renderCount(working, value);
    }
    // handle action
    key = this.getDelegateProperty('listItemActionProperty', del);
    value = (key && content) ? (content.get ? content.get(key) : content[key]) : null;
    if (value) {
      this.renderAction(working, value);
      classArray.push('has-action');
    }
    // handle branch
    if (this.getDelegateProperty('hasContentBranch', del)) {
      key = this.getDelegateProperty('contentIsBranchKey', del);
      value = (key && content) ? (content.get ? content.get(key) : content[key]) : NO;
      this.renderBranch(working, value);
      classArray.push('has-branch');
    }
    context.addClass(classArray);
    context = working.end();
  },

  /**
   * Adds markup to display an icon within a composite item that indicates that selecting the item will cause
   * an application to display the item's children.
   *
   * @param context           Rendering context.
   */
  renderChildrenIcon: function (context) {
    'use strict';
    context.begin('span').addClass('has-children').end();
  },

  /**
   * Generates a label based on the content.
   *
   * @param {SC.RenderContext} context  A render context
   * @param {String} id                 The unique identifier of the thing the item represents.
   * @param {String} label              The label to display, already HTML escaped.
   * @param {Boolean} isLoading         Is the content being loaded from a server?
   * @param {Boolean} isSelected        Is the label for a selected item?
   * @returns {void}
   */
  renderLabel: function (context, id, label, isLoading, isSelected) {
    'use strict';
    context.push(
      '<label class="' +
      (isLoading ? 'loading' : (isSelected ? '' : 'underline')) +
      '">',
      ('<a>' + label + '</a>') || '');
    if (isLoading) {
      context.begin('span').addClass('loading-indicator').end();
    }
    context.push('</label>');
  },

  /**
   * Adds markup to display an item's icon.
   *
   * @param context                   Rendering context.
   * @param {String} iconClassName    CSS class name of icon.
   * @param {String} [iconTitle]      The icon's title.
   */
  renderRightFontIcon: function (context, iconClassName, iconTitle) {
    'use strict';
    context.push('<span class="right-font-icon ' + iconClassName + '" title="' + iconTitle + '"></span>');
  }
});