/*globals NO, SC, sc_require, sc_super, Sqwerl, YES, $*/

sc_require('views/AccountView');
sc_require('views/ArticleView');
sc_require('views/AspectView');
sc_require('views/AuthorView');
sc_require('views/BookView.js');
sc_require('views/CapabilityView');
sc_require('views/CategoryChildView');
sc_require('views/CategoryView');
sc_require('views/ConnectionErrorView');
sc_require('views/CourseView');
sc_require('views/DatabaseView');
sc_require('views/DocumentView');
sc_require('views/FeedView');
sc_require('views/GroupView');
sc_require('views/HomeView');
sc_require('views/LoadingView');
sc_require('views/NoteView');
sc_require('views/PaperView');
sc_require('views/PodcastView');
sc_require('views/ProjectView');
sc_require('views/SearchResultsView');
sc_require('views/TagView');
sc_require('views/TalkView');
sc_require('views/TypeView');
sc_require('views/UserView');
sc_require('views/VideoView');
sc_require('views/WebPageView');

/**
 * The Sqwerl web application's user interface.
 */
Sqwerl.mainPage = SC.Page.design({

    busyPanel: SC.PanelPane.create({
        classNames: ['busyPanel'],
        contentView: SC.View.create({
            childViews: 'circle1 circle2 label'.w(),

            circle1: SC.View.design({
                classNames: ['circle1'],
                layout: { height: 50, left: 15, top: 15, width: 50 }
            }),

            circle2: SC.View.design({
                classNames: 'circle2'.w(),
                layout: { height: 35, left: 23, top: 23, width: 35 }
            }),

            label: SC.LabelView.design({
                classNames: ['busy-message'],
                layout: { bottom: 0, left: 90, right: 0 },
                localize: YES,
                value: 'mainPage.busyPanel.contentView.label.value'
            })
        }),

        hide: function () {
            'use strict';
            if (this.showTimer) {
                this.showTimer.invalidate();
                this.showTimer = null;
            }
            this.set('isVisible', NO);
            this.remove();
        },

        isVisible: NO,

        onShowTimerFired: function () {
            'use strict';
            this.append();
            this.set('isVisible', YES);
        },

        show: function () {
            'use strict';
            var showAlternativeBusyMessage = (Math.floor((Math.random() * 10) + 1) === 1),
                that = this;
            SC.info('%@: showAlternativeBusyMessage: %@', this, showAlternativeBusyMessage);
            this.set('layout', { height: 90, left: 200, top: 200, width: 210 });
            this.contentView.childViews[2].set('value', showAlternativeBusyMessage ? ('mainPage.busyPanel.contentView.label.value' + Math.floor((Math.random() * 6) + 1)).loc() : 'mainPage.busyPanel.contentView.label.value');
            if (!this.showTimer) {
                this.showTimer = SC.Timer.schedule({
                    action: 'onShowTimerFired',
                    interval: 250,
                    target: that
                });
            }
        },

        showTimer: null
    }),

    clientViewX: function () {
        'use strict';
        return Sqwerl.mainPage.mainPane.navigationBar.trailBar.get('isNotHome') ? Sqwerl.rowHeight : (Sqwerl.rowHeight * 2) + 1;
    }.property('Sqwerl.mainPage.mainPane.navigationBar.trailBar.isNotHome'),

    createAccountDialog: SC.PanelPane.create({

        contentView: SC.View.create({
            childViews: 'descriptionLabel emailField okButton closeButton'.w(),

            descriptionLabel: SC.View.extend({
                layout: { height: Sqwerl.rowHeight * 4, left: 15, top: 15, width: 320 },
                render: function (renderContext) {
                    'use strict';
                    renderContext.push('<p id="create-account-intro-paragraph">We can\'t create accounts at this time.</p>');
                    renderContext.push('<p>Enter your email address, and we will send you an email once Sqwerl is up and running. No spam, we promise.</p>');
                }
            }),

            emailField: SC.TextFieldView.create({
                layout: { left: 15, top: (Sqwerl.rowHeight * 3) + 15, height: Sqwerl.rowHeight, width: 320 }
            }),

            okButton: SC.ButtonView.create({
                classNames: ['create-account-ok'],
                layout: { left: 15, top: (Sqwerl.rowHeight * 4) + 25, height: Sqwerl.rowHeight, width: 320 },
                title: 'Please enter your email address'
            }),

            closeButton: SC.ButtonView.create({
                classNames: ['create-account-cancel'],
                layout: { left: 15, top: (Sqwerl.rowHeight * 5) + 35, height: Sqwerl.rowHeight, width: 320 },
                title: 'No thanks'
            })
        }),

        createAccountDialogIsVisible: NO,

        createAccountDialogWidth: 350,

        hide: function () {
            'use strict';
            this.set('createAccountDialogIsVisible', NO);
        },

        isVisibleDidChange: function () {
            'use strict';
            if (this.get('createAccountDialogIsVisible')) {
                this.layout.height = 0;
                this.append();
                // Give the email input field the keyboard focus.
                this.get('contentView').get('childViews')[1].becomeFirstResponder();
                this.animate(
                    { opacity: 1, height: 270 },
                    { duration: 0.3, timing: 'ease-in' }
                );
            } else {
                this.animate(
                    { opacity: 0, height: 0 },
                    { duration: 0.3, timing: 'ease-out' },
                    this,
                    'remove'
                );
            }
        }.observes('createAccountDialogIsVisible'),

        layout: { centerX: 0, centerY: -50, minHeight: 510 },

        modalPane: SC.ModalPane.extend({
            classNames: ['sqwerl-modal-pane'],
            mouseDown: function () {
                'use strict';
                Sqwerl.mainPage.createAccountDialog.hide();
            }
        }),

        show: function () {
            'use strict';
            var element = $('.create-account-menu'),
                mainPane = Sqwerl.mainPage.mainPane,
                mainPaneWidth = mainPane.layout.width,
                x = element.offset().left + ((element.width() - this.createAccountDialogWidth) / 2),
                y = mainPane.applicationBar.layout.top + 40;
            if (mainPaneWidth && ((x + this.createAccountDialogWidth) > mainPaneWidth)) {
                x = mainPaneWidth - this.createAccountDialogWidth;
            }
            this.set('layout', { height: 270, left: x, top: y, width: this.createAccountDialogWidth });
            this.set('createAccountDialogIsVisible', YES);
        }
    }),

    /**
     * User interface.
     */
    mainPane: SC.MainPane.design({
        childViews: 'applicationBar navigationBar horizontalSplitView errorPane'.w(),
        classNames: ['mainPane'],
        layout: { bottom: 0, left: 0, right: 0, top: 0 },

        applicationBar: SC.View.design({
            childViews: 'logo identityButtons searchBar menu'.w(),
            classNames: ['application-bar'],
            layout: { left: 0, height: Sqwerl.rowHeight, top: 0 },

            logo: SC.View.extend({
                classNames: ['small-sqwerl-logo'],
                layout: { bottom: 0, left: 0, top: 0, width: 71 },
                render: function (renderContext) {
                    'use strict';
                    renderContext.push('<a class="logo-link" href="http://www.sqwerl.com" title="Sqwerl Web site"></a>');
                },
                toolTip: 'sqwerl-logo-tooltip'.loc()
            }),

            identityButtons: SC.View.design({
                childViews: 'signInButton createAccountButton signOutButton'.w(),
                layout: { bottom: 0, right: 330, top: 0, width: 300 },

                signInButton: SC.View.extend({
                    classNames: ['sign-in-menu'],
                    isVisibleBinding: 'Sqwerl.isNotSignedIn',
                    layout: { bottom: 4, right: 150, top: 4, width: 140 },
                    mouseDown: function () {
                        'use strict';
                        Sqwerl.mainPage.signInDialog.show();
                    },
                    render: function (context) {
                        'use strict';
                        context.begin('a').addClass('menu-button').setAttr('href', '/sign-in').text(this.get('title')).end();
                    },
                    title: 'signInMenuItem.title'.loc()
                }),

                createAccountButton: SC.View.extend({
                    classNames: ['create-account-menu'],
                    isVisibleBinding: 'Sqwerl.isNotSignedIn.',
                    layout: { bottom: 4, right: 0, top: 4, width: 140 },
                    mouseDown: function () {
                        'use strict';
                        Sqwerl.mainPage.createAccountDialog.show();
                    },
                    render: function (context) {
                        'use strict';
                        context.begin('a').addClass('menu-button').setAttr('href', '/create-account').text(this.get('title')).end();
                    },
                    title: 'createAccountMenuItem.title'.loc()
                }),

                signOutButton: SC.View.extend({
                    isRollover: false,
                    isVisibleBinding: 'Sqwerl.isSignedIn',
                    layout: { bottom: 0, right: 0, top: 0, width: 100 },
                    mouseEntered: function () {
                        'use strict';
                        this.isRollover = true;
                        this.updateLayer();
                    },
                    mouseExited: function () {
                        'use strict';
                        this.isRollover = false;
                        this.updateLayer();
                    },
                    render: function (context) {
                        'use strict';
                        var userName = Sqwerl.get('userName');
                        if (Sqwerl.get('isSignedIn')) {
                            if (this.isRollover) {
                                context.begin('span').addClass(['sign-out-button']).text(this.get('title')).end();
                            } else {
                                context.begin('span').text(userName).end();
                            }
                        } else {
                            context.begin('span').text(userName).end();
                        }
                    },
                    title: 'signOutMenuItem.title'.loc()
                })
            }),

            searchBar: SC.View.design({
                childViews: ['searchTextField'],
                classNames: ['search-bar'],
                layout: { bottom: 0, right: 60, top: 0, width: 270 },

                searchTextField: SC.TextFieldView.extend({
                    classNames: ['application-search-field'],
                    hint: 'mainPage.searchField.promptText'.loc(),
                    keyDown: function (event) {
                        'use strict';
                        var handledEvent = NO;
                        if (event.keyCode === 13) {
                            Sqwerl.mainPage.search();
                            handledEvent = YES;
                        }
                        return handledEvent;
                    },
                    layout: { bottom: 4, height: Sqwerl.rowHeight - 10, left: 10, right: 10, top: 4, width: 250 },
                    leftAccessoryView: SC.View.extend({
                        layout: { height: Sqwerl.rowHeight - 10, right: 4, top: 4, width: Sqwerl.rowHeight / 2 },
                        render: function (context) {
                            'use strict';
                            context.begin('span').addClass(['ti-search']).end();
                        }
                    }),
                    shouldRenderBorder: false,
                    valueBinding: 'Sqwerl.mainPage.searchText'
                })
            }),

            menu: SC.View.extend({
                classNames: ['application-menu'],
                layout: { bottom: 0, right: 0, top: 0, width: 60 },
                mouseDown: function () {
                    'use strict';
                    // TODO
                },
                render: function (renderContext) {
                    'use strict';
                    var context = renderContext.begin('div');
                    context.begin('a').addClass('menu-button').begin('span').addClass('ti-more-alt').end().end();
                    renderContext = context.end();
                },
                title: 'mainPage.menu.title'.loc()
            })
        }),

        navigationBar: SC.View.design({
            childViews: ['trailBar'],
            classNames: ['navigation-bar'],
            isVisibleBinding: 'Sqwerl.mainPage.mainPane.navigationBar.trailBar.isNotHome',
            layout: { height: Sqwerl.rowHeight, left: 0, top: Sqwerl.rowHeight },

            trailBar: Sqwerl.TrailBarView.design({
                classNames: ['trail-bar'],
                contentBinding: 'Sqwerl.navigationController.trail',
                displayProperties: ['content'],
                layout: { bottom: 0, left: 0, top: 0 }
            })
        }),

        errorPane: SC.ContainerView.design({
            classNames: ['error-pane'],
            isVisible: NO,
            layout: { left: 0, right: 0 }
        }),

        horizontalSplitView: SC.SplitView.design({
            childViews: 'navigationView propertiesView'.w(),
            classNames: ['client-area'],
            layout: { bottom: 0, left: 0, top: Sqwerl.rowHeight },
            layoutDirection: SC.LAYOUT_HORIZONTAL,
            splitDividerView: Sqwerl.SplitDividerView,
            topBinding: 'Sqwerl.mainPage.clientViewX',

            onIsNotHomeChanged: function () {
                'use strict';
                var isHome = !Sqwerl.mainPage.mainPane.navigationBar.trailBar.get('isNotHome'),
                    rowHeight = Sqwerl.rowHeight;
                this.$().css('top', (isHome ? rowHeight : (rowHeight * 2 + 1)) + 'px');
            }.observes('Sqwerl.mainPage.mainPane.navigationBar.trailBar.isNotHome'),

            navigationView: SC.View.design(SC.SplitChild, {
                childViews: 'navigationToolbar navigationScrollView navigationBusyPanel'.w(),
                minimumSize: 0,
                width: 250,

                navigationBusyPanel: SC.View.extend({
                    classNames: ['navigation-busy-panel'],
                    layout: { bottom: 0, left: 0 }
                }),

                navigationToolbar: SC.View.extend({
                    childViews: ['navigationBackButton'],
                    classNames: ['navigation-toolbar'],
                    height: Sqwerl.rowHeight,
                    isVisibleBinding: 'Sqwerl.mainPage.mainPane.navigationBar.trailBar.isNotHome',
                    layout: { bottom: 0, left: 0, right: 0, top: 0 },

                    navigationBackButton: SC.View.extend({
                        classNames: ['navigation-back-button'],
                        displayProperties: ['title'],
                        layout: { bottom: 0, left: 0, right: 0, top: 0 },
                        mouseDown: function () {
                            'use strict';
                            Sqwerl.navigationController.goUp();
                            $('#navigation-back-button').addClass('pressed');
                        },
                        mouseUp: function () {
                            'use strict';
                            $('#navigation-back-button').removeClass('pressed');
                        },
                        title: '',
                        titleBinding: 'Sqwerl.navigationController.parentName',
                        urlBinding: 'Sqwerl.navigationController.goBackUrl',

                        render: function (renderContext) {
                            'use strict';
                            var context = renderContext.begin('div class="navigation-back-link-container"');
                            context.push('<a class="navigation-back-button-link"' + ' href="' + this.get('url') + '">' + this.get('title') + '</a>');
                            renderContext = context.end();
                        }
                    })
                }),

                navigationScrollView: SC.ScrollView.design({
                    classNames: ['navigation-list-scroll-view'],
                    contentView: Sqwerl.ListView.extend({
                        childrenCountKey: 'childrenCount',
                        classNames: ['navigation-list'],
                        contentBinding: 'Sqwerl.navigationController.arrangedObjects',
                        contentAnimateKey: 'animate',
                        contentValueKey: 'displayName',
                        didBecomeFirstResponder: function () {
                            'use strict';
                            var item = this.$('.sel');
                            if (item) {
                                item.removeClass('unfocused');
                            }
                        },
                        exampleView: Sqwerl.NavigationItemView,
                        focusedIndexBinding: 'Sqwerl.navigationController.focusedIndex',
                        hasContentRightIcon: YES,
                        keyDown: function (event) {
                            'use strict';
                            var cursorDown = 40,
                                cursorLeft = 37,
                                cursorRight = 39,
                                cursorUp = 38,
                                navigationController = Sqwerl.navigationController,
                                navigationList = Sqwerl.mainPage.mainPane.horizontalSplitView.navigationView.navigationScrollView.contentView;
                            switch (event.keyCode) {
                            case cursorDown:
                                navigationList.focusNextItem();
                                break;
                            case cursorUp:
                                navigationList.focusPreviousItem();
                                break;
                            case cursorLeft:
                                navigationController.goUp();
                                break;
                            case cursorRight:
                                navigationList.selectFocusedItem();
                                break;
                            }
                        },
                        rowHeight: Sqwerl.rowHeight,
                        selectionBinding: 'Sqwerl.navigationController.selection'
                    }),
                    layout: { left: 0, top: (Sqwerl.rowHeight * 3) + 1 },
                    minimumVerticalScrollOffset: 0,
                    onIsNotHomeChanged: function () {
                        'use strict';
                        var isHome = !Sqwerl.mainPage.mainPane.navigationBar.trailBar.get('isNotHome'),
                            rowHeight = Sqwerl.rowHeight;
                        this.$().css('top', (isHome ? 1 : (rowHeight + 1)) + 'px');
                    }.observes('Sqwerl.mainPage.mainPane.navigationBar.trailBar.isNotHome'),
                    verticalOverlay: YES,
                    verticalScrollerView: SC.ScrollerView.extend({
                        buttonLength: -1 * ((Sqwerl.rowHeight / 2) + 3),
                        buttonOverlap: 0,
                        hasButtons: NO,
                        minimumThumbLength: Sqwerl.rowHeight
                    })
                })
            }),

            propertiesView: SC.ContainerView.extend(SC.SplitChild, {
                classNames: ['details-container-view'],
                childViews: ['detailsView', 'applicationMenuView'],
                layout: { bottom: 0, left: 0, top: 0 },
                minimumSize: 250,

                detailsView: SC.ContainerView.design({
                    classNames: ['details-view'],
                    layout: { bottom: 0, left: 0, right: 0, top: 0 }
                }),

                applicationMenuView: SC.View.extend({
                    classNames: ['application-menu'],
                    layout: { bottom: 0, top: 0, right: 0, width: 150 }
                })
            })
        })
    }),

    menuPane: SC.MenuPane.create({
        isSubMenu: YES,
        items: [
            { title: 'Create Account' },
            { title: 'Sign In ' },
            { isSeparator: YES },
            { title: 'Advanced Search' },
            { isSeparator: YES },
            { title: 'Provide Feedback' }
        ],
        positionPane: function (useAnchorCached) {
            'use strict';
            var mainPaneWidth = SC.RootResponder.responder.computeWindowSize();
            /*jslint nomen:true*/
            sc_super(useAnchorCached);
            /*jslint nomen:false*/
            this.adjust({ originLeft: mainPaneWidth - this.get('width') });
        },
        preferType: SC.PICKER_FIXED
    }),

    /**
     * Invoked when the server returns search results.
     *
     * @param response      Response from the server.
     * @param parameters    Additional parameters.
     */
    onSearchCompleted: function (response, parameters) {
        'use strict';
        var foundInProperties,
            results,
            things = [];
        if (response.status === 200) {
            results = Sqwerl.convertToModel(response.body());
            results.get('things').forEach(function (thing) {
                foundInProperties = thing.foundInProperties;
                thing.relativeUrl = '#' + encodeURI(thing.id);
                thing.typeIcon = Sqwerl.Node.typeIcons[Sqwerl.idToTypeId(thing.id)];
                if (foundInProperties && (foundInProperties.length > 0)) {
                    thing.firstFoundInProperty = foundInProperties[0];
                    thing.hasFoundInProperties = true;
                } else {
                    thing.hasFoundInProperties = false;
                }
                things.push(SC.Object.create(thing));
            });
            results.set('things', new SC.ArrayController().set('content', things));
            Sqwerl.get('SearchResultsController').set('content', results);
            Sqwerl.mainPage.searchDialog.contentView.scrollPane.contentView.set('nowShowing', Sqwerl.get('SearchResultsView'));
        } else {
            // TODO - Notify the user that search failed.
            console.log('Search failed with status code: ' + response.status + (response.errorObject ? ', error: ' + response.errorObject.message : ''));
        }
        Sqwerl.mainPage.searchDialog.set('isSearching', false);
    },

    /**
     * Invoked when the user changes the text in the search field.
     */
    onSearchTextChanged: function () {
        'use strict';
        var searchText = this.get('searchText');
    }.observes('Sqwerl.mainPage.searchText'),

    /**
     * Requests that the server search for things.
     */
    search: function () {
        'use strict';
        var request,
            searchText = this.get('searchText');
        if (searchText) {
            Sqwerl.get('SearchResultsController').set('content', null);
            Sqwerl.mainPage.searchDialog.show();
            Sqwerl.mainPage.searchDialog.set('isSearching', true);
            request = new SC.Request();
            request.set('address', encodeURI('/db/search?q=' + encodeURI(searchText)));
            request.set('type', 'GET');
            request.header('Accept', 'vnd.sqwerl.com.%@+json; version=0.1,application/json'.fmt(Sqwerl.serverDataTypes.searchResults));
            request.set('isJSON', YES);
            request.notify(this, this.onSearchCompleted);
            request.send();
        }
    },

    searchDialog: SC.PanelPane.create({
        classNames: ['search-dialog'],
        contentView: SC.View.create({
            childViews: 'titleBar scrollPane'.w(),

            titleBar: SC.View.extend({
                childViews: 'searchTitle searchClose'.w(),
                classNames: ['search-title-bar'],
                layout: { height: Sqwerl.rowHeight, left: 0, right: 0, top: 0 },

                searchTitle: SC.LabelView.extend({
                    classNames: ['search-title'],
                    layout: { bottom: 0, height: Sqwerl.rowHeight, left: 0, right: 60, top: 0 },
                    valueBinding: 'Sqwerl.mainPage.searchDialog.title'
                }),

                searchClose: SC.ButtonView.design({
                    action: 'hide',
                    classNames: ['search-close'],
                    layout: { bottom: 0, right: 0, top: 0, width: 60 },
                    title: 'Close'
                })
            }),

            scrollPane: SC.ScrollView.design({
                classNames: ['search-pane'],
                contentView: SC.ContainerView.design({
                    layout: { bottom: 0, left: 0, right: 0, top: 0 }
                }),
                layout: { bottom: 0, left: 0, right: 0, top: Sqwerl.rowHeight }
            })
        }),

        hide: function () {
            'use strict';
            this.set('searchDialogIsVisible', false);
        },

        isSearching: false,

        isVisibleDidChange: function () {
            'use strict';
            if (this.get('searchDialogIsVisible')) {
                this.layout.height = 0;
                this.append();
                this.animate(
                    { opacity: 1, height: Sqwerl.mainPage.mainPane.$().height() - (Sqwerl.rowHeight * 3) },
                    { duration: 0.3, timing: 'ease-out' }
                );
            } else {
                this.animate(
                    { opacity: 0, height: 0 },
                    { duration: 0.3, timing: 'ease-out' },
                    this,
                    'remove'
                );
            }
        }.observes('searchDialogIsVisible'),

        modalPane: SC.ModalPane.extend({
            classNames: ['sqwerl-modal-pane'],
            mouseDown: function () {
                'use strict';
                Sqwerl.mainPage.searchDialog.hide();
            }
        }),

        searchDialogIsVisible: NO,

        show: function () {
            'use strict';
            var mainPane = Sqwerl.mainPage.mainPane,
                width = mainPane.$().width() - 20,
                y = mainPane.applicationBar.layout.top + 40;
            this.set('layout', { height: mainPane.$().height() - y - Sqwerl.rowHeight, left: 10, top: y, width: width });
            // TODO - Internationalize
            this.set('searchDialogIsVisible', true);
        },

        title: function () {
            'use strict';
            var isSearching = Sqwerl.mainPage.searchDialog.get('isSearching'),
                results = Sqwerl.get('SearchResultsController').get('content'),
                searchText = Sqwerl.mainPage.get('searchText'),
                text = '';
            // TODO - Internationalize.
            if (searchText) {
                if (isSearching) {
                    text = 'Searching for \'' + Sqwerl.mainPage.get('searchText') + '\'...';
                } else if (results && (results.total > 0)) {
                    text = 'Found ' + results.total + ((results.total > 1) ? ' things' : 'thing') + ' that matched \'' + searchText + '\'';
                } else {
                    text = 'Nothing found that matched \'' + searchText + '\'';
                }
            }
            return text;
        }.property('Sqwerl.mainPage.searchDialog.searchDialogIsVisible', 'Sqwerl.mainPage.sqwerlDialog.isSearching', 'Sqwerl.SearchResultsController.content')
    }),

    searchText: '',

    /**
     * Sets whether the navigator components should appear disabled because this application is busy.
     *
     * @param {boolean} [isBusy]  If true then appear busy, otherwise have the navigation controls accept user input.
     */
    setNavigationBusy: function (isBusy) {
        'use strict';
        var element = Sqwerl.mainPage.mainPane.horizontalSplitView.navigationView.navigationBusyPanel.$();
        if (isBusy) {
            if (!Sqwerl.isNavigationBusy) {
                $('.sc-outline').css('cursor', 'busy');
                element.addClass('visible');
                element.focus();
                Sqwerl.mainPage.mainPane.horizontalSplitView.propertiesView.detailsView.set('nowShowing', Sqwerl.get('LoadingView'));
            }
        } else {
            element.removeClass('visible');
            $('.sc-outline').css('cursor', 'pointer');
        }
    },

    showContent: function (typeId, data) {
        'use strict';
        var controller,
            mapping,
            view,
            viewName;
        if (data && data.isType) {
            viewName = 'Collection';
        } else {
            mapping = Sqwerl.editorMapping[typeId];
            if (mapping) {
                viewName = mapping.substring(0, 1).toUpperCase() + mapping.substring(1);
            }
        }
        controller = Sqwerl.get(viewName  + 'Controller');
        if (controller) {
            controller.set('content', Sqwerl.convertToModel(data));
        }
        viewName += 'View';
        view = Sqwerl.get(viewName);
        if (view) {
            SC.debug('%@: Setting the properties view to \'%@\'', this, viewName);
            Sqwerl.mainPage.mainPane.horizontalSplitView.propertiesView.detailsView.set('nowShowing', view);
        }
    },

    signInDialog: SC.PanelPane.create({
        canSignIn: NO,

        contentView: SC.View.create({
            childViews: 'emailLabel emailField passwordLabel passwordField forgotPasswordLink signInButton cancelButton'.w(),

            email: null,

            emailLabel: SC.LabelView.design({
                fieldDidBlur: function () {
                    'use strict';
                    var message = ' ',
                        signInDialog = Sqwerl.mainPage.signInDialog,
                        warning = NO;
                    if (signInDialog.email) {
                        if (!signInDialog.hasUserId) {
                            // TODO - Internationalize.
                            message = 'Hey something\'s wrong with the e-mail address! Please check it.';
                            warning = YES;
                            // TOOD - Invalidate the field.
                        }
                    } else {
                        message = 'Please enter your email address.';
                        warning = YES;
                        // TODO - Invalidate the field.
                    }
                    if (signInDialog.isSignInFailedMessageVisible) {
                        signInDialog.isSignInFailedMessageVisible = NO;
                    } else {
                        if (warning) {
                            signInDialog.showWarningMessage(message);
                        } else if (signInDialog.isNotSigningIn) {
                            signInDialog.hideMessageArea();
                        }
                    }
                },
                layout: { top: 20, left: 20, right: 0, height: 36 },
                value: 'Email:'
            }),

            emailField: SC.TextFieldView.create({
                layout: { top: 62, left: 20, right: 20, height: 36 }
            }),

            passwordLabel: SC.LabelView.create({
                layout: { top: 102, left: 20, right: 20, height: 36 },
                value: 'Password:'
            }),

            passwordField: SC.TextFieldView.create({
                layout: { top: 143, left: 20, right: 20, height: 36 },
                type: 'password'
            }),

            signInButton: SC.ButtonView.create({
                layout: { left: 20, right: 20, top: 184 },
                title: 'Sign In'
            })
            /*
            forgotPasswordLink: SC.ButtonView.create({
                layout: { top: 184, right: 20, height: 36 },
                title: 'Forgot password?'
            }),
            */
        }),

        email: null,

        hasUserId: NO,

        hide: function () {
            'use strict';
            this.set('signInDialogIsVisible', false);
        },

        isEnabledBinding: 'Sqwerl.mainPage.signInDialog.isNotSigningIn',

        isNotSigningIn: YES,

        isSignInFailedMessageVisible: NO,

        isVisibleDidChange: function () {
            'use strict';
            if (this.get('signInDialogIsVisible')) {
                this.append();
            } else {
                this.remove();
            }
        }.observes('signInDialogIsVisible'),

        layout: { centerX: 0, centerY: -50, minHeight: 210 },

        message: ' ',

        modalPane: SC.ModalPane.extend({
            classNames: ['sqwerl-modal-pane'],

            mouseDown: function () {
                'use strict';
                Sqwerl.mainPage.signInDialog.hide();
            }
        }),

        show: function () {
            'use strict';
            var element = $('.sign-in-menu'),
                mainPane = Sqwerl.mainPage.mainPane,
                mainPaneWidth = mainPane.layout.width,
                x = element.offset().left + ((element.width() - this.signInDialogWidth) / 2),
                y = mainPane.applicationBar.layout.top + 40;
            if (mainPaneWidth && ((x + this.signInDialogWidth) > mainPaneWidth)) {
                x = mainPaneWidth - this.signInDialogWidth;
            }
            this.set('layout', { height: 300, left: x, top: y, width: this.signInDialogWidth });
            this.set('signInDialogIsVisible', YES);
        },

        signInDialogIsVisible: NO,

        signInDialogWidth: 400,

        warning: NO
    })
});