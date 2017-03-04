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
        layout: {height: 50, left: 15, top: 15, width: 50}
      }),

      circle2: SC.View.design({
        classNames: 'circle2'.w(),
        layout: {height: 35, left: 23, top: 23, width: 35}
      }),

      label: SC.LabelView.design({
        classNames: ['busy-message'],
        layout: {bottom: 0, left: 90, right: 0},
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
      this.set('layout', {height: 90, left: 200, top: 200, width: 210});
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
    allowRegistration: false,
    classNames: ['drop-down-menu'],
    closeButtonText: 'No thanks',

    contentView: SC.View.create({
      childViews: 'currentStepIndicator step1 step2 step3'.w(),
      classNames: ['drop-down-menu-content'],

      hide: function () {
        Sqwerl.mainPage.createAccountDialog.hide();
      },

      next: function () {
        var view = Sqwerl.mainPage.createAccountDialog.contentView;
        view.set('step', view.get('step') + 1);
      },

      step: 1,

      currentStepIndicator: SC.View.create({
        childViews: 'dot1 dash1 dot2 dash2 busyIndicator dot3'.w(),
        classNames: ['step-indicator'],
        layout: { centerX: 0, height: Sqwerl.rowHeight, top: 10, width: 110 },

        dot1: SC.LabelView.create({
          classNames: ['dot1', 'dot', 'selected'],
          layout: { height: Sqwerl.rowHeight / 2, left: 0, width: 10 },
          valueBinding: 'Sqwerl.mainPage.createAccountDialog.step1IndicatorLabel'
        }),

        dash1: SC.View.create({
          classNames: ['dash1', 'dash'],
          layout: { bottom: 0, height: 24, left: 28, top: 0, width: Sqwerl.rowHeight / 2 },
          render: function (renderContext) {
            renderContext.push('&#x279E;');
          }
        }),

        dot2: SC.LabelView.create({
          classNames: ['dot2', 'dot'],
          layout: { height: Sqwerl.rowHeight / 2, left: 39, width: 10 },
          valueBinding: 'Sqwerl.mainPage.createAccountDialog.step2IndicatorLabel'
        }),

        dash2: SC.View.create({
          classNames: ['dash2', 'dash'],
          layout: {bottom: 0, height: Sqwerl.rowHeight, left: 67, top: 0, width: Sqwerl.rowHeight / 2},
          render: function (renderContext) {
            'use strict';
            renderContext.push('&#x279E;');
          }
        }),

        busyIndicator: SC.View.create({
          classNames: ['signing-up-step-border'],
          isVisibleBinding: 'Sqwerl.mainPage.createAccountDialog.isSendingCreateAccountRequest',
          layout: { border: 5, bottom: 0, left: 79, right: 0, top: 2, zIndex: 1 }
        }),

        dot3: SC.LabelView.create({
          classNames: ['dot3', 'dot'],
          layout: { height: Sqwerl.rowHeight / 2, left: 124, width: 10 },
          render: function (renderContext) {
            'use strict';
            var dialog = Sqwerl.mainPage.createAccountDialog,
                signUpFailed = dialog.get('signUpFailed');
            if (signUpFailed) {
              renderContext.addClass('invalid');
            } else {
              renderContext.removeClass('invalid');
            }
            renderContext.push(dialog.get('step3IndicatorLabel'));
          },
          valueBinding: 'Sqwerl.mainPage.createAccountDialog.step3IndicatorLabel'
        })
      }),

      step1: SC.View.create({
        childViews: 'descriptionLabel emailField okButton closeButton'.w(),
        classNames: ['step1'],

        descriptionLabel: SC.View.extend({
          layout: {height: Sqwerl.rowHeight, left: 15, top: 10, width: 320},
          render: function (renderContext) {
            'use strict';
            renderContext.push(
                '<p class="create-account-text">Step 1: Enter your email address.</p>');
          }
        }),

        emailField: SC.TextFieldView.create({
          hint: 'For example: you@somewhere.com',
          classNames: ['create-account-email-field'],
          keyUp: function (event) {
            'use strict';
            var dialog = Sqwerl.mainPage.createAccountDialog,
                contentView = dialog.contentView,
                handledEvent = NO,
                value = this.get('value');
            console.log('Step 1 email keyUp');
            if (contentView.get('step') === 1) {
              console.log(' Step 1 email keyUp -- keyCode:' + event.keyCode);
              if (event.keyCode === 13) {
                if (contentView.isValidEmailAddress(value)) {
                  handledEvent = YES;
                  contentView.step1.next();
                } else {
                  dialog.handleInvalidEmailAddress(
                      contentView.step1.okButton,
                      contentView.step1.closeButton,
                      (!value || (value.trim().length === 0)));
                }
              } else if (event.keyCode === 27) {
                handledEvent = YES;
                contentView.hide();
              }
            }
            return handledEvent;
          },

          layout: {left: 15, top: Sqwerl.rowHeight + 16, height: Sqwerl.rowHeight, width: 320},

          leftAccessoryView: SC.View.extend({
            layout: {height: 16, left: 4, top: 10, width: 18},
            render: function (context) {
              context.begin('span').addClass(['ti-email email-field-icon']).end();
            }
          }),

          onValueChanged: function () {
            'use strict';
            var dialog = Sqwerl.mainPage.createAccountDialog,
                contentView = dialog.contentView,
                email = this.get('value'),
                isValidEmailAddress = NO,
                okButton = dialog.contentView.step1.okButton,
                step = contentView.get('step');
            if (email && (email.length > 0)) {
              if (contentView.isValidEmailAddress(email)) {
                contentView.step1.set('containsValidEmailAddress', true);
                okButton.set('isVisible', true);
                okButton.$().addClass('visible');
                okButton.animate({
                  height: Sqwerl.rowHeight,
                  width: 320
                }, {
                  duration: 0.3,
                  timing: 'ease-out'
                });
                dialog.contentView.step1.closeButton.animate({
                  top: (Sqwerl.rowHeight * 3) + 40
                }, {
                  duration: 0.3,
                  timing: 'ease-in'
                });
                Sqwerl.mainPage.createAccountDialog.animate({
                  height: Sqwerl.rowHeight * 6.5
                }, {
                  duration: 0.3,
                  timing: 'ease-in'
                });
                dialog.set('wasValid', true);
                okButton.$().removeClass('invalid');
                dialog.set('okButtonText', 'Go to step 2 &#x27A4;');
                dialog.set('allowRegistration', true);
              } else {
                if (dialog.get('wasValid')) {
                  okButton.$().addClass('invalid', 'visible');
                  okButton.set('isVisible', true);
                  okButton.animate({
                    height: Sqwerl.rowHeight,
                    width: 320
                  }, {
                    duration: 0.3,
                    timing: 'ease-out'
                  });
                  dialog.set('okButtonText', 'Not a valid email address. Please fix.');
                }
                dialog.set('allowRegistration', false);
                dialog.set('wasValid', false);
                contentView.step1.set('containsValidEmailAddress', false);
              }
            } else {
              dialog.handleInvalidEmailAddress(okButton, dialog.contentView.step1.closeButton, true);
              contentView.step1.set('containsValidEmailAddress', false);
            }
          }.observes('value')
        }),

        okButton: SC.ButtonView.create({
          acceptsFirstResponder: function () {
            return Sqwerl.mainPage.createAccountDialog.contentView.step1.get('containsValidEmailAddress');
          }.property('Sqwerl.mainPage.createAccountDialog.contentView.step1.containsValidEmailAddress'),
          action: 'next',
          classNames: ['create-account-ok'],
          displayProperties: 'Sqwerl.mainPage.createAccountDialog.okButtonText'.w(),
          enabledBinding: 'Sqwerl.mainPage.createAccountDialog.allowRegistration',
          keyUp: function (event) {
            var contentView = Sqwerl.mainPage.createAccountDialog.contentView,
                handledEvent = NO,
                keyCode = event.keyCode;
            console.log('Step 1: ok button keyUp');
            if (contentView.get('step') === 1) {
              console.log('  Step 1: ok button keyUp - keyCode: ' + keyCode);
              if ((keyCode === 13) || (keyCode === 32)) {
                handledEvent = YES;
                //              contentView.step1.next();
              } else if (event.keyCode === 27) {
                handledEvent = true;
                contentView.hide();
              }
            }
            return handledEvent;
          },
          layout: { left: 15, top: (Sqwerl.rowHeight * 2) + 28},
          render: function (context) {
            var isValidEmailAddress,
                labelContext,
                view = Sqwerl.mainPage.createAccountDialog.contentView;
            isValidEmailAddress = view.isValidEmailAddress(view.step1.emailField.get('value'));
            context.addAttr('tabIndex', (isValidEmailAddress && (view.get('step') === 1)) ? '0' : '-1');
            context.addAttr('role', 'button');
            context.addClass('sc-button-view').addClass('square').addClass('button').addClass('sc-regular-size');
            labelContext = context.begin('label');
            labelContext.addClass('sc-button-label').addClass('sc-regular-size').addClass('ellipsis');
            if (!isValidEmailAddress) {
              context.begin('span').addClass('ti-alert').end();
            }
            context.begin('span')
              .push(SC.RenderContext.escapeHTML(Sqwerl.mainPage.createAccountDialog.get('okButtonText')))
              .end();
            labelContext.end();
            return context;
          },
          supportFocusRing: YES,
          titleBinding: 'Sqwerl.mainPage.createAccountDialog.okButtonText'
        }),

        closeButton: SC.View.create({
          acceptsFirstResponder: YES,
          classNames: ['create-account-cancel'],
          isVisible: false,
          keyUp: function () {
            var handledEvent = NO,
                keyCode = event.keyCode;
            if (Sqwerl.mainPage.createAccountDialog.contentView.get('step') === 1) {
              if ((keyCode === 13) || (keyCode === 32) || (keyCode === 27)) {
                handledEvent = true;
                Sqwerl.mainPage.createAccountDialog.contentView.hide();
              }
            }
            return handledEvent;
          },
          layout: { left: 15, top: (Sqwerl.rowHeight * 2) + 28, height: Sqwerl.rowHeight, width: 320 },
          mouseDown: function () {
            Sqwerl.mainPage.createAccountDialog.hide();
          },
          render: function (context) {
            var labelContext;
            sc_super();
            context.addAttr('tabIndex', '1');
            context.addAttr('role', 'button');
            context.addClass('sc-button-view').addClass('square').addClass('button').addClass('sc-regular-size');
            labelContext = context.begin('label');
            labelContext.addClass('sc-button-label').addClass('sc-regular-size').addClass('ellipsis');
//                        context.begin('span').addClass('ti-close').end();
            context.begin('span')
                .addClass('create-account-close-button-text')
                .push(SC.RenderContext.escapeHTML(Sqwerl.mainPage.createAccountDialog.get('closeButtonText')))
                .end();
            labelContext.end();
            return context;
          },
          supportFocusRing: YES
        }),

        containsValidEmailAddress: false,

        hide: function () {
          Sqwerl.mainPage.createAccountDialog.set('createAccountDialogIsVisible', NO);
        },

        isValidEmailAddress: function () {
          var email = Sqwerl.mainPage.createAccountDialog.contentView.step1.emailField.get('value');
          return Sqwerl.mainPage.createAccountDialog.contentView.isValidEmailAddress(email);
        }.property(),

        layout: {top: (Sqwerl.rowHeight / 2) + 15},

        next: function () {
          var dialog = Sqwerl.mainPage.createAccountDialog,
              view = dialog.contentView,
              email = view.step1.emailField.get('value');
          if (view.get('step') === 1) {
            dialog.updateStepIndicator(view.currentStepIndicator, 2);
            console.log('Step 1: next');
            if (view.isValidEmailAddress(email)) {
              view.set('step', view.get('step') + 1);
              dialog.set('okButtonText', 'Yes that\'s my email address &#x27A4;');
              view.step1.animate({
                left: -320,
              }, {
                duration: 0.3,
                timing: 'ease-in'
              });
              view.step1.$().hide();
              view.step1.descriptionLabel.animate({
                left: -320
              }, {
                duration: 0.3,
                timing: 'ease-in'
              });
              view.step1.descriptionLabel.$().hide();
              view.step1.emailField.animate({
                left: -320
              }, {
                duration: 0.3,
                timing: 'ease-in'
              });
              view.step1.emailField.$().hide();
              view.step1.emailField.$().attr('visibility', 'hidden'); // Necessary so that users can't tab navigate to it.
              view.step1.okButton.$().attr('visibility', 'hidden');   // ditto
              view.step1.okButton.animate({
                left: -320
              }, {
                duration: 0.3,
                timing: 'ease-in'
              });
              view.step1.emailField.$().attr('tabIndex', '-1');
              view.step1.okButton.$().removeClass('visible');
              view.step1.okButton.$().attr('tabIndex', '-1');
              view.step1.closeButton.animate({
                left: -320
              }, {
                duration: 0.3,
                timing: 'ease-in'
              });
              view.step1.closeButton.$().hide();
              view.step2.animate({
                left: 0
              }, {
                duration: 0.3,
                timing: 'ease-in'
              });
              view.step2.set('isVisible', true);
              view.step2.$().show();
              view.step2.descriptionLabel.animate({
                left: 15
              }, {
                duration: 0.3,
                timing: 'ease-in'
              });
              view.step2.descriptionLabel.set('isVisible', true);
              view.step2.descriptionLabel.$().show();
              view.step2.emailField.animate({
                left: 15
              }, {
                duration: 0.3,
                timing: 'ease-in'
              });
              view.step2.emailField.set('isVisible', true);
              view.step2.emailField.$().show();
              view.step2.okButton.animate({
                left: 15
              }, {
                duration: 0.3,
                timing: 'ease-in'
              });
              view.step2.okButton.$().addClass('visible');
              view.step2.closeButton.animate({
                left: 15
              }, {
                duration: 0.3,
                timing: 'ease-in'
              });
              view.step2.closeButton.set('isVisible', true);
              view.step2.closeButton.$().show();
              view.step2.okButton.set('isVisible', true);
              view.step2.okButton.$().show();
              view.step2.emailField.set('value', view.step1.emailField.get('value'));
              view.step2.emailField.becomeFirstResponder();
              view.step2.emailField.invokeNext(function () { this.$().addClass('focus'); });
              view.step2.emailField.get('selection').set('start', view.step2.emailField.get('value').length);
            }
          }
        }
      }),

      step2: SC.View.create({
        childViews: 'descriptionLabel emailField okButton closeButton'.w(),
        classNames: ['step2'],

        descriptionLabel: SC.View.extend({
          layout: { height: Sqwerl.rowHeight, left: 335, top: 10, width: 320, visible: false },
          render: function (renderContext) {
            'use strict';
            renderContext.push(
                '<p class="create-account-text">Step 2: Are you sure this is your email address?</p>');
          }
        }),

        emailField: SC.TextFieldView.create({
          hint: 'For example: you@somewhere.com',
          classNames: ['create-account-email-field'],
          keyUp: function (event) {
            'use strict';
            var dialog = Sqwerl.mainPage.createAccountDialog,
                contentView = dialog.contentView,
                handledEvent = NO,
                value = this.get('value');
            console.log('Step 2: keyUp');
            if (contentView.get('step') === 2) {
              console.log('  Step 2: keyUp - keyCode: ' + event.keyCode);
              if (event.keyCode === 13) {
                if (contentView.step1.get('isValidEmailAddress')) {
                  handledEvent = YES;
                  contentView.step2.next();
                } else {
                  dialog.handleInvalidEmailAddress(
                      contentView.step2.okButton,
                      contentView.step2.closeButton,
                      (!value || (value.trim().length === 0)));
                }
              } else if (event.keyCode === 27) {
                handledEvent = YES;
                contentView.hide();
              }
            }
            return handledEvent;
          },

          layout: {left: 335, top: Sqwerl.rowHeight + 16, height: Sqwerl.rowHeight, width: 320, visible: false},

          leftAccessoryView: SC.View.extend({
            layout: {height: 16, left: 4, top: 10, width: 18},
            render: function (context) {
              context.begin('span').addClass(['ti-email email-field-icon']).end();
            }
          }),

          onValueChanged: function () {
            'use strict';
            var dialog = Sqwerl.mainPage.createAccountDialog,
                contentView = dialog.contentView,
                email = this.get('value'),
                okButton = dialog.contentView.step2.okButton,
                step = dialog.contentView.get('step');
            if (email && (email.length > 0)) {
              if (contentView.isValidEmailAddress(email)) {
                contentView.step2.set('containsValidEmailAddress', true);
                okButton.$().addClass('visible');
                okButton.animate({
                  height: Sqwerl.rowHeight,
                  width: 320
                }, {
                  duration: 0.3,
                  timing: 'ease-out'
                });
                contentView.step2.closeButton.animate({
                  top: (Sqwerl.rowHeight * 3) + 40
                }, {
                  duration: 0.3,
                  timing: 'ease-in'
                });
                Sqwerl.mainPage.createAccountDialog.animate({
                  height: Sqwerl.rowHeight * 6.5
                }, {
                  duration: 0.3,
                  timing: 'ease-in'
                });
                dialog.set('wasValid', true);
                okButton.$().removeClass('invalid');
                dialog.set('okButtonText', (step === 1) ? 'Go to step 2 &#x27A4;' : ((step === 2) ? 'Yes that\'s my email address &#x27a4;' : '&check; OK'));
                dialog.set('allowRegistration', true);
              } else {
                if (dialog.get('wasValid')) {
                  okButton.$().addClass('invalid');
                  dialog.set('okButtonText', 'Not a valid email address. Please fix.');
                }
                dialog.set('allowRegistration', false);
                dialog.set('wasValid', false);
                contentView.step2.set('containsValidEmailAddress', false);
              }
            } else {
              dialog.handleInvalidEmailAddress(okButton, dialog.contentView.step2.closeButton, true);
              contentView.step2.set('containsValidEmailAddress', false);
            }
          }.observes('value')
        }),

        layout: {left: 320, top: (Sqwerl.rowHeight / 2) + 25, visible: false},

        okButton: SC.ButtonView.create({
          acceptsFirstResponder: function () {
            return Sqwerl.mainPage.createAccountDialog.contentView.step2.get('containsValidEmailAddress');
          }.property('Sqwerl.mainPage.createAccountDialog.contentView.step2.containsValidEmailAddress'),
          action: 'next',
          classNames: ['create-account-ok'],
          displayProperties: [
            'Sqwerl.mainPage.createAccountDialog.okButtonText',
            'Sqwerl.mainPage.createAccountDialog.isSendingCreateAccountRequest'],
          enabledBinding: "Sqwerl.mainPage.createAccountDialog.allowRegistration",
          layout: {left: 335, top: (Sqwerl.rowHeight * 2) + 28},
          render: function (context) {
            var isValidEmailAddress,
                labelContext,
                view = Sqwerl.mainPage.createAccountDialog.contentView;
            isValidEmailAddress = view.isValidEmailAddress(view.step2.emailField.get('value'));
            context.addAttr('tabIndex', isValidEmailAddress ? '0' : '-1');
            context.addAttr('role', 'button');
            context.addClass('sc-button-view').addClass('square').addClass('button').addClass('sc-regular-size');
            labelContext = context.begin('label');
            labelContext.addClass('sc-button-label').addClass('sc-regular-size').addClass('ellipsis');
            if (!isValidEmailAddress) {
              context.begin('span').addClass('ti-alert').end();
            }
            context.begin('span').push(SC.RenderContext.escapeHTML(Sqwerl.mainPage.createAccountDialog.get('okButtonText'))).end();
            labelContext.end();
            return context;
          },
          supportFocusRing: YES,
          titleBinding: "Sqwerl.mainPage.createAccountDialog.okButtonText"
        }),

        closeButton: SC.View.create({
          acceptsFirstResponder: YES,
          classNames: ['create-account-cancel'],
          layout: {left: 335, top: (Sqwerl.rowHeight * 2) + 28, height: Sqwerl.rowHeight, width: 320, visible: false},
          mouseDown: function () {
            Sqwerl.mainPage.createAccountDialog.hide();
          },
          render: function (context) {
            var labelContext;
            sc_super();
            context.addAttr('tabIndex', '-1');
            context.addAttr('role', 'button');
            context.addClass('sc-button-view').addClass('square').addClass('button').addClass('sc-regular-size');
            labelContext = context.begin('label');
            labelContext.addClass('sc-button-label').addClass('sc-regular-size').addClass('ellipsis');
//                        context.begin('span').addClass('ti-close').end();
            context.begin('span')
                .addClass('create-account-close-button-text')
                .push(SC.RenderContext.escapeHTML('I don\'t want to create an account'))
                .end();
            labelContext.end();
            return context;
          },
          supportFocusRing: YES
        }),

        containsValidEmailAddress: false,

        next: function () {
          var dialog = Sqwerl.mainPage.createAccountDialog;
          if (dialog.contentView.get('step') === 2) {
            console.log('Step 2: next');
            dialog.signUp();
          }
        }
      }),

      step3: SC.View.create({
        childViews: 'descriptionLabel okButton'.w(),
        classNames: ['step3'],
        descriptionLabel: SC.LabelView.extend({
          layout: { height: Sqwerl.rowHeight, left: 335, top: 10, width: 320, visible: false },
          render: function (renderContext) {
            'use strict';
            renderContext.push(
                '<p class="create-account-text' +
                  (Sqwerl.mainPage.createAccountDialog.get('signUpFailed') ? ' invalid"' : '"') +
                  '>' +
                  Sqwerl.mainPage.createAccountDialog.get('step3Label') +
                  '</p>'
            );
          },
/*
          render: function (context) {
            context.begin('div').push(Sqwerl.mainPage.createAccountDialog.get('step3Label')).end();
          },
*/
          valueBinding: 'Sqwerl.mainPage.createAccountDialog.step3Label'
        }),

        layout: {left: 320, top: (Sqwerl.rowHeight / 2) + 25, visible: false},

        okButton: SC.ButtonView.create({
          action: 'onFinishedSigningUp',
          classNames: 'create-account-ok'.w(),
          displayProperties: ['Sqwerl.mainPage.createAccountDialog.signUpFailed'],
          enabledBinding: 'Sqwerl.mainPage.createAccountDialog.allowRegistration',
          keyUp: function (event) {
            var dialog = Sqwerl.mainPage.createAccountDialog,
                handledEvent = NO,
                keyCode = event.keyCode;
            console.log('Step 3: OK button keyUp');
            if (dialog.contentView.get('step') === 3) {
              console.log('  Step 3 OK button keyUp - keyCode: ' + keyCode);
              if ((keyCode === 13) || (keyCode === 32)) {
                handledEvent = YES;
                dialog.onFinishedSigningUp();
              } else if (event.keyCode === 27) {
                handledEvent = YES;
                this.wasValid = false;
                this.hide();
              }
            }
            return handledEvent;
          },
          layout: { left: 335, top: Sqwerl.rowHeight + 22, height: Sqwerl.rowHeight, width: 320, visible: false },
          render: function (context) {
            var dialog = Sqwerl.mainPage.createAccountDialog,
                iconContext,
                isSendingCreateAccountRequest = dialog.get('isSendingCreateAccountRequest'),
                isValidEmailAddress,
                labelContext,
                signUpFailed = dialog.get('signUpFailed'),
                tabIndex = signUpFailed ? '0' : (isValidEmailAddress ? '0' : '-1'),
                view = dialog.contentView;
            isValidEmailAddress = view.isValidEmailAddress(view.step2.emailField.get('value'));
            context.addAttr('tabIndex', tabIndex);
            context.addAttr('role', 'button');
            context.addClass('sc-button-view').addClass('square').addClass('button').addClass('sc-regular-size');
            labelContext = context.begin('label');
            labelContext.addClass('sc-button-label').addClass('sc-regular-size').addClass('ellipsis');
            if (!isValidEmailAddress) {
              context.begin('span').addClass('ti-alert').end();
            }
            context.begin('span').push(SC.RenderContext.escapeHTML(Sqwerl.mainPage.createAccountDialog.get('okButtonText'))).end();
            labelContext.end();
            return context;
          },
          supportFocusRing: YES,
          titleBinding: 'Sqwerl.mainPage.createAccountDialog.okButtonText'
        })
      }),

      isValidEmailAddress: function (email) {
        return email && (email.length > 0) && /^[a-zA-Z0-9_\.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test(email);
      }
    }),

    createAccountDialogIsVisible: NO,

    createAccountDialogWidth: 350,

    isSendingCreateAccountRequest: NO,

    handleInvalidEmailAddress: function (okButton, closeButton, isEmpty) {
      okButton.$().addClass('invalid visible');
      this.set('okButtonText', isEmpty ? 'Enter your email address' : 'Not a valid email address. Please fix.');
      closeButton.animate({
        top: (Sqwerl.rowHeight * 3) + 30
      }, {
        duration: 0.3,
        timing: 'ease-in'
      });
      okButton.animate({
        height: Sqwerl.rowHeight,
        width: 320
      }, {
        duration: 0.3,
        timing: 'ease-out'
      });
      Sqwerl.mainPage.createAccountDialog.animate({
        height: Sqwerl.rowHeight * 6.5
      }, {
        duration: 0.3,
        timing: 'ease-in'
      });
      this.set('allowRegistration', false);
    },

    hide: function () {
      'use strict';
      var view = Sqwerl.mainPage.createAccountDialog.contentView,
          currentStep = view.get('step');
      this.set('createAccountDialogIsVisible', NO);
      if (currentStep === 3) {
        Sqwerl.mainPage.createAccountDialog.contentView.step1.emailField.set('value', '');
        this.wasValid = false;
        view.set('step', 1);
      }
    },

    layout: {centerX: 0, centerY: -50, height: 20, minHeight: 20},

    modalPane: SC.ModalPane.extend({
      classNames: ['sqwerl-modal-pane'],
      mouseDown: function () {
        'use strict';
        Sqwerl.mainPage.createAccountDialog.hide();
      }
    }),

    okButtonText: 'Enter your email address',

    onFinishedSigningUp: function () {
      console.log('onFinishedSigningUp');
      if (this.signUpFailed) {
        this.set('signUpFailed', false);
        this.contentView.set('step', 3);
        this.contentView.step3.descriptionLabel.$().removeClass('invalid');
        this.signUp();
      } else {
        this.wasValid = false;
        this.hide();
      }
    },

    onIsVisibleDidChange: function () {
      'use strict';
      if (this.get('createAccountDialogIsVisible')) {
        this.layout.height = 30;
        this.append();
        this.animate({
          opacity: 1, height: this.wasValid ? (Sqwerl.rowHeight * 6.5) : (Sqwerl.rowHeight * 5)
        }, {
          duration: 0.3, timing: 'ease-out'
        });
      } else {
        this.animate({
              opacity: 0, height: 30
            }, {
              duration: 0.3, timing: 'ease-out'
            },
            this,
            'remove'
        );
      }
    }.observes('createAccountDialogIsVisible'),

    show: function () {
      'use strict';
      var dialog = Sqwerl.mainPage.createAccountDialog,
          contentView = dialog.contentView,
          currentStep = contentView.get('step'),
          element = $('.create-account-menu'),
          step1 = contentView.step1,
          step2 = contentView.step2,
          step3 = contentView.step3,
          x = element.offset().left + ((element.width() - this.createAccountDialogWidth) / 2),
          y = Sqwerl.mainPage.mainPane.applicationBar.layout.top + 40;
      if ((x + this.createAccountDialogWidth) > window.innerWidth) {
        x = window.innerWidth - this.createAccountDialogWidth;
      }
      this.set('layout', {height: 30, left: x, top: y, width: this.createAccountDialogWidth});
      if (currentStep > 3) {
        contentView.set('step', 1);
        currentStep = 1;
      }
      this.updateStepIndicator(contentView.currentStepIndicator, currentStep);
      if (currentStep === 1) {
        step1.emailField.set('value', '');
        step1.emailField.becomeFirstResponder();
        step1.emailField.invokeNext(function () { this.$().addClass('focus'); });
        step1.animate({left: 0}, {duration: 0});
        step1.$().show();
        step1.set('isVisible', true);
        step1.descriptionLabel.animate({left: 15}, {duration: 0});
        step1.descriptionLabel.set('isVisible', true);
        step1.descriptionLabel.$().show();
        step1.emailField.animate({left: 15}, {duration: 0});
        step1.emailField.set('isVisible', true);
        step1.emailField.$().show();
        step1.okButton.animate({left: 15}, {duration: 0});
        if (contentView.isValidEmailAddress(step1.emailField.get('value'))) {
          step1.okButton.$().addClass('visible');
          step1.okButton.animate({height: Sqwerl.rowHeight, width: 320}, {duration: 0});
          step1.closeButton.set('top', (Sqwerl.rowHeight * 3) + 30);
        } else {
          step1.okButton.$().removeClass('visible');
          step1.okButton.$().attr('tabIndex', '-1');
          step1.okButton.animate({height: 0, width: 0}, {duration: 0});
          step1.closeButton.animate({top: (Sqwerl.rowHeight * 2) + 28}, {duration: 0});
        }
        step1.closeButton.animate({left: 15}, {duration: 0});
        step1.closeButton.set('isVisible', true);
        step1.closeButton.$().show();
        step2.animate({left: 320}, {duration: 0});
        step2.set('isVisible', false);
        step2.descriptionLabel.animate({left: 320}, {duration: 0});
        step2.descriptionLabel.set('isVisible', false);
        step2.emailField.animate({left: 320}, {duration: 0});
        step2.emailField.set('isVisible', false);
        step2.okButton.animate({left: 320}, {duration: 0});
        step2.okButton.$().removeClass('visible');
        step2.okButton.$().attr('tabIndex', '-1');
        step2.closeButton.animate({left: 320}, {duration: 0});
        step2.closeButton.set('isVisible', false);
        step3.animate({left: 320}, {duration: 0});
        step3.set('isVisible', false);
        step3.descriptionLabel.animate({left: 320}, {duration: 0});
        step3.descriptionLabel.set('isVisible', false);
        step3.okButton.animate({left: 320}, {duration: 0});
        step3.okButton.$().removeClass('visible');
        step3.okButton.$().attr('tabIndex', '-1');
        contentView.currentStepIndicator.set('layout', { centerX: 0, height: Sqwerl.rowHeight, top: 10, width: 110 });
        contentView.currentStepIndicator.dot1.set('layout', { height: Sqwerl.rowHeight / 2, left: 0, width: 10 });
        contentView.currentStepIndicator.dot1.set('isVisible', true);
        contentView.currentStepIndicator.dash1.set('layout', {
          bottom: 0,
          height: 24,
          left: 28,
          top: 0,
          width: Sqwerl.rowHeight / 2
        });
        contentView.currentStepIndicator.dash1.set('isVisible', true);
        contentView.currentStepIndicator.dot2.set('layout', { height: Sqwerl.rowHeight / 2, left: 39, width: 10 });
        contentView.currentStepIndicator.dot2.set('isVisible', true);
        contentView.currentStepIndicator.dash2.set('layout', {
          bottom: 0,
          height: Sqwerl.rowHeight,
          left: 67,
          top: 0,
          width: Sqwerl.rowHeight / 2
        });
        contentView.currentStepIndicator.dash2.set('isVisible', true);
        contentView.currentStepIndicator.dot3.set('layout', { height: Sqwerl.rowHeight / 2, left: 78, width: 10 });
        contentView.currentStepIndicator.dot3.set('isVisible', true);
      } else if (currentStep === 2) {
        step1.set('isVisible', false);
        step1.descriptionLabel.animate({left: 15}, {duration: 0});
        step1.descriptionLabel.set('isVisible', false);
        step1.emailField.animate({left: 15}, {duration: 0});
        step1.emailField.set('isVisible', false);
        step1.okButton.animate({left: 15}, {duration: 0});
        step2.emailField.becomeFirstResponder();
        step2.emailField.invokeNext(function () { this.$().addClass('focus'); });
        step2.emailField.set('value', step1.emailField.get('value'));
        step2.emailField.get('selection').set('start', step2.emailField.get('value').length);
        if (contentView.isValidEmailAddress(step2.emailField.get('value'))) {
          dialog.set('okButtonText', 'Yes that\'s my email address &#x27A4;');
          step2.okButton.$().addClass('visible');
          step2.okButton.$().show();
          step2.okButton.animate({height: Sqwerl.rowHeight, width: 320}, {duration: 0});
        } else {
          step2.okButton.$().removeClass('visible');
          step2.okButton.$().attr('tabIndex', '-1');
          step2.okButton.animate({height: 0, width: 0}, {duration: 0});
          step2.closeButton.animate({'top': (Sqwerl.rowHeight * 2) + 18}, {duration: 0});
        }
        step1.closeButton.animate({left: 15}, {duration: 0});
        step1.closeButton.set('isVisible', false);
        step2.animate({left: 0}, {duration: 0});
        step2.set('isVisible', true);
        step2.descriptionLabel.animate({left: 15}, {duration: 0});
        step2.descriptionLabel.set('isVisible', true);
        step2.emailField.animate({left: 15}, {duration: 0});
        step2.emailField.set('isVisible', true);
        step2.okButton.animate({left: 15}, {duration: 0});
        step2.okButton.$().add('visible', true);
        step2.closeButton.animate({left: 15}, {duration: 0});
        step2.closeButton.set('isVisible', true);
        step3.animate({left: 320}, {duration: 0});
        step3.set('isVisible', false);
        step3.descriptionLabel.animate({left: 320}, {duration: 0});
        step3.descriptionLabel.set('isVisible', false);
        step3.okButton.animate({left: 320}, {duration: 0});
        step3.okButton.$().removeClass('visible');
        step3.okButton.$().attr('tabIndex', '-1');
        contentView.currentStepIndicator.dot1.set('layout', {height: 0, width: 0});
        contentView.currentStepIndicator.dot1.set('isVisible', false);
        contentView.currentStepIndicator.dash1.set('layout', {height: 0, width: 0});
        contentView.currentStepIndicator.dash1.set('isVisible', false);
        contentView.currentStepIndicator.dot2.set('layout', {height: Sqwerl.rowHeight / 2, left: 45, width: 10});
        contentView.currentStepIndicator.dot2.set('isVisible', true);
        contentView.currentStepIndicator.dash2.set('layout', {
          height: Sqwerl.rowHeight,
          left: 73,
          width: Sqwerl.rowHeight / 2
        });
        contentView.currentStepIndicator.dash2.set('isVisible', true);
        contentView.currentStepIndicator.dot3.set('layout', {height: Sqwerl.rowHeight / 2, left: 84, width: 10});
        contentView.currentStepIndicator.dot3.set('isVisible', true);
      } else if (currentStep === 3) {
        step1.set('isVisible', false);
        step1.descriptionLabel.animate({left: -320}, {duration: 0});
        step1.descriptionLabel.set('isVisible', false);
        step1.emailField.animate({left: -320}, {duration: 0});
        step1.emailField.set('isVisible', false);
        step1.okButton.animate({left: -320}, {duration: 0});
        step1.okButton.$().removeClass('visible');
        step1.okButton.$().attr('tabIndex', '-1');
        step1.closeButton.animate({left: -320}, {duration: 0});
        step1.closeButton.set('isVisible', false);
        step2.animate({left: -320}, {duration: 0});
        step2.set('isVisible', false);
        step2.descriptionLabel.animate({left: -320}, {duration: 0});
        step2.descriptionLabel.set('isVisible', false);
        step2.emailField.animate({left: -320}, {duration: 0});
        step2.emailField.set('isVisible', false);
        step2.okButton.animate({left: -320}, {duration: 0});
        step2.okButton.$().removeClass('visible');
        step3.okButton.$().attr('tabIndex', '-1');
        step2.closeButton.animate({left: -320}, {duration: 0});
        step2.closeButton.set('isVisible', false);
        step3.animate({left: 15}, {duration: 0});
        step3.set('isVisible', true);
        step3.descriptionLabel.animate({left: 0}, {duration: 0});
        step3.descriptionLabel.set('isVisible', true);
        step3.okButton.animate({left: 0}, {duration: 0});
        step3.okButton.$().addClass('visible');
        contentView.currentStepIndicator.dash2.set('layout', {height: 0, width: 0});
        contentView.currentStepIndicator.dash2.set('isVisible', false);
        contentView.currentStepIndicator.dot2.set('layout', {height: 0, width: 0});
        contentView.currentStepIndicator.dot2.set('isVisible', false);
        contentView.currentStepIndicator.dot3.set('layout', {left: 40});
        contentView.currentStepIndicator.dot3.set('isVisible', true);
      }
      this.set('createAccountDialogIsVisible', YES);
    },

    signUp: function (email) {
      var dialog = Sqwerl.mainPage.createAccountDialog,
          view = dialog.contentView,
          email = view.step2.emailField.get('value');
      if (view.isValidEmailAddress(email)) {
        dialog.set('step3Label', '<p class="create-account-text">Hold on while we create your account...</p>');
        dialog.set('isSendingCreateAccountRequest', YES);
        view.set('step', view.get('step') + 1);
        dialog.updateStepIndicator(view.currentStepIndicator, 3);
        view.step2.animate({
          left: -320,
        }, {
          duration: 0.3,
          timing: 'ease-in'
        });
        view.step2.$().hide();
        view.step2.descriptionLabel.animate({
          left: -320
        }, {
          duration: 0.3,
          timing: 'ease-in'
        });
        view.step2.descriptionLabel.$().hide();
        view.step2.emailField.animate({
          left: -320
        }, {
          duration: 0.3,
          timing: 'ease-in'
        });
        view.step2.emailField.$().hide();
        view.step2.okButton.$().hide();
        view.step2.okButton.animate({
          left: -320
        }, {
          duration: 0.3,
          timing: 'ease-in'
        });
        view.step2.closeButton.$().hide();
        view.step2.closeButton.animate({
          left: -320
        }, {
          duration: 0.3,
          timing: 'ease-in'
        });
        view.step2.closeButton.$().hide();
        dialog.animate({
          height: Sqwerl.rowHeight * 2.5
        }, {
          duration: 0.3,
          timing: 'ease-in'
        });
        view.step3.animate({
          left: 0
        }, {
          duration: 0.3,
          timing: 'ease-in'
        });
        view.step3.set('isVisible', true);
        view.step3.descriptionLabel.animate({
          left: 15
        }, {
          duration: 0.3,
          timing: 'ease-in'
        });
        view.step3.descriptionLabel.set('isVisible', true);
        view.step3.okButton.set('isVisible', false);
        view.step3.okButton.animate({
          left: 15
        }, {
          duration: 0.3,
          timing: 'ease-in'
        });
        view.step3.okButton.becomeFirstResponder();
        view.step3.okButton.$().addClass('visible');
        $.post(
            window.location.protocol + '//' + window.location.host + '/confirm-sign-up',
            { email: email },
            function onSuccessfulSignUp() {
              setTimeout(function () {
                view.set('step', 4);
                dialog.updateStepIndicator(view.currentStepIndicator, 4);
                dialog.set('isSendingCreateAccountRequest', NO);
                dialog.animate({
                  height: Sqwerl.rowHeight * 5.5
                }, {
                  duration: 0.3,
                  timing: 'ease-in'
                });
                view.step3.descriptionLabel.animate({
                  height: Sqwerl.rowHeight * 2
                }, {
                  duration: 0.3,
                  timing: 'ease-in'
                });
                dialog.set(
                    'step3Label',
                    ('<p class="create-account-text">You should get an email from sqwerl.com soon.</p>' +
                    '<p>If you don\'t see it in your inbox, check if it was flagged as junk or spam.</p>'));
                view.step3.okButton.set('isVisible', true);
                view.step3.okButton.animate({
                  height: Sqwerl.rowHeight,
                  top: Sqwerl.rowHeight * 2.5,
                  width: 320
                }, {
                  duration: 0.3,
                  timing: 'ease-in'
                });
                dialog.set('okButtonText', 'Thanks');
              }, 800);
            }
        ).fail(function (error) {
          var dialog = Sqwerl.mainPage.createAccountDialog,
              view = dialog.contentView;
          // TODO
          dialog.set('isSendingCreateAccountRequest', NO);
          dialog.set('step3Label', 'Whoops! Something went wrong, and we couldn\'t create your account.');
          view.step3.descriptionLabel.$().addClass('invalid');
          view.step3.okButton.set('isVisible', true);
          view.step3.okButton.$().attr('tabIndex', 0);
          dialog.animate({
            height: Sqwerl.rowHeight * 4.5
          }, {
            duration: 0.3,
            timing: 'ease-in'
          });
          view.step3.okButton.animate({
            height: Sqwerl.rowHeight,
            top: Sqwerl.rowHeight * 1.5,
            width: 320
          }, {
            duration: 0.3,
            timing: 'ease-in'
          });
          dialog.set('okButtonText', 'Try again');
          view.step3.okButton.$().focus();
          dialog.set('signUpFailed', true);
          dialog.contentView.currentStepIndicator.dot3.$().addClass('invalid');
          console.error('Request to create account failed.');
          console.info(' HTTP status code: ' + error.status);
          console.info(' statusText: ' + error.statusText);
          console.info(' responseText: ' + error.responseText);
        });
      }
    },

    signUpFailed: false,

    step1IndicatorLabel: function () {
      var currentStep = Sqwerl.mainPage.createAccountDialog.contentView.get('step');
      return (currentStep > 1) ? '&#x2713;' : '1';
    }.property('Sqwerl.mainPage.createAccountDialog.contentView.step'),

    step2IndicatorLabel: function () {
      var currentStep = Sqwerl.mainPage.createAccountDialog.contentView.get('step');
      return (currentStep > 3) ? '&#x2713;' : '2';
    }.property('Sqwerl.mainPage.createAccountDialog.contentView.step'),

    step3IndicatorLabel: function () {
      var dialog = Sqwerl.mainPage.createAccountDialog,
        currentStep = dialog.contentView.get('step');
      return dialog.get('signUpFailed') ? '!' : ((currentStep > 3) ? '&#x2713;' : '3');
    }.property('Sqwerl.mainPage.createAccountDialog.signUpFailed', 'Sqwerl.mainPage.createAccountDialog.contentView.step'),

    step3Label: '',

    updateStepIndicator: function (currentStepIndicator, currentStep) {
      var element,
          i;
      for (i = 1; i < 4; i += 1) {
        element = currentStepIndicator['dot' + i].$();
        if (currentStep === i) {
          element.addClass('selected');
          if (i > 1) {
            currentStepIndicator['dash' + (i - 1)].$().addClass('completed');
          }
        } else {
          element.removeClass('selected');
        }
        if (i < currentStep) {
          element.addClass('completed');
        } else {
          element.removeClass('completed');
        }
      }
    },

    wasValid: false
  }),

  /**
   * User interface.
   */
  mainPane: SC.MainPane.design({
    childViews: 'applicationBar navigationBar horizontalSplitView errorPane'.w(),
    classNames: ['mainPane'],
    layout: {bottom: 0, left: 0, right: 0, top: 0},

    applicationBar: SC.View.design({
      childViews: 'logo identityButtons searchBar menu'.w(),
      classNames: ['application-bar'],
      layout: {left: 0, height: Sqwerl.rowHeight, top: 0},

      logo: SC.View.extend({
        classNames: ['small-sqwerl-logo'],
        layout: {bottom: 0, left: 0, top: 0, width: 71},
        render: function (renderContext) {
          'use strict';
          renderContext.push('<a class="logo-link" href="http://www.sqwerl.com" title="Sqwerl Web site"></a>');
        },
        toolTip: 'sqwerl-logo-tooltip'.loc()
      }),

      identityButtons: SC.View.design({
        childViews: 'signInButton editAccountButton createAccountButton'.w(),
        layout: { bottom: 0, right: 375, top: 0, width: 300 },

        signInButton: SC.View.extend({
          classNames: ['menu', 'sign-in-menu'],
          isVisibleDidChange: function () {
            if (Sqwerl.get('isSignedIn')) {
              this.animate({
                opacity: 0
              }, {
                duration: 0.5, timing: 'ease-out'
              });
              this.animate({
                  right: 0, width: 0
                }, {
                  duration: 0.5, timing: 'cubic-bezier(0.5, 0.21, 0.92, 1)'
                },
                this,
                'remove');
            } else {
              this.animate({
                opacity: 1
              }, {
                duration: 0.5, timing: 'ease-out'
              });
              this.animate({
                right: 150, width: 140
              }, {
                duration: 0.5, timing: 'cubic-bezier(0.5, 0.21, 0.92, 1)'
              });
            }
          }.observes('Sqwerl.isSignedIn'),
          layout: { bottom: 4, isVisible: !Sqwerl.isSignedIn(), top: 4, width: Sqwerl.isSignedIn() ? 0 : 140 },
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

        editAccountButton: SC.ButtonView.extend({
          classNames: ['menu', 'account-menu', 'main-menu-dialog'],
          displayProperties: 'Sqwerl.isSignedIn Sqwerl.mainPage.userName'.w(),
          isVisibleDidChange: function () {
            if (Sqwerl.get('isSignedIn')) {
              this.animate({
                opacity: 1
              }, {
                duration: 0.5, timing: 'ease-out'
              });
              this.animate({
                  right: 0, width: 140
                }, {
                  duration: 0.5, timing: 'cubic-bezier(0.5, 0.21, 0.92, 1)'
                },
                this,
                'remove');
            } else {
              this.animate({
                opacity: 0
              }, {
                duration: 0.5, timing: 'ease-out'
              });
              this.animate({
                right: -140, width: 0
              }, {
                duration: 0.5, timing: 'cubic-bezier(0.5, 0.21, 0.92, 1)'
              });
            }
          }.observes('Sqwerl.isNotSignedIn'),
          layout: { bottom: 4, isVisible: Sqwerl.isSignedIn(), right: 0, top: 4, width: Sqwerl.isSignedIn() ? 140 : 0 },
          mouseDown: function () {
            Sqwerl.mainPage.accountMenu.show();
          },
          render: function (context) {
              context.begin('a').addClass('menu-button').text(Sqwerl.get('userName')).end();
            return context;
          },
          titleBinding: 'Sqwerl.mainPage.userName'
        }),

        createAccountButton: SC.View.extend({
          classNames: ['menu', 'create-account-menu'],
          isVisibleDidChange: function () {
            if (Sqwerl.get('isSignedIn')) {
              this.animate({
                opacity: 0
              }, {
                duration: 0.5, timing: 'ease-out'
              });
              this.animate({
                  right: -140, width: 0
                }, {
                  duration: 0.5, timing: 'cubic-bezier(0.440, 0.830, 0.840, 1)'
                },
                this,
                'remove');
            } else {
              this.animate({
                opacity: 1
              }, {
                duration: 0.5, timing: 'ease-out'
              });
              this.animate({
                right: 0, width: 140
              }, {
                duration: 0.5, timing: 'cubic-bezier(0.440, 0.830, 0.840, 1)'
              });
            }
          }.observes('Sqwerl.isSignedIn'),
          layout: { bottom: 4, isVisible: !Sqwerl.isSignedIn(), right: 0, top: 4, width: Sqwerl.isSignedIn() ? 0 : 140 },
          mouseDown: function () {
            'use strict';
            Sqwerl.mainPage.createAccountDialog.show();
          },
          render: function (context) {
            'use strict';
            context.begin('a').addClass('menu-button').setAttr('href', '/create-account').text(this.get('title')).end();
          },
          title: 'createAccountMenuItem.title'.loc()
        })
      }),

      searchBar: SC.View.design({
        childViews: ['searchTextField'],
        classNames: ['search-bar'],
        layout: {bottom: 0, right: 105, top: 0, width: 270},

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
          layout: {bottom: 4, height: Sqwerl.rowHeight - 10, left: 10, right: 10, top: 4, width: 250},
          leftAccessoryView: SC.View.extend({
            layout: {height: 18, right: 4, top: 5, width: Sqwerl.rowHeight / 2},
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
        classNames: ['menu', 'application-menu'],
        layout: { bottom: 4, right: 10, top: 4, width: 90 },
        mouseDown: function () {
          'use strict';
          Sqwerl.mainPage.mainMenu.show();
        },
        render: function (context) {
          'use strict';
          context.begin('a').addClass('menu-button').text(this.get('title')).begin('span').end().end();
        },
        title: 'mainPage.menu.title'.loc()
      })
    }),

    navigationBar: SC.View.design({
      childViews: ['trailBar'],
      classNames: ['navigation-bar'],
      isVisibleBinding: 'Sqwerl.mainPage.mainPane.navigationBar.trailBar.isNotHome',
      layout: {height: Sqwerl.rowHeight, left: 0, top: Sqwerl.rowHeight},

      trailBar: Sqwerl.TrailBarView.design({
        classNames: ['trail-bar'],
        contentBinding: 'Sqwerl.navigationController.trail',
        displayProperties: ['content'],
        layout: {bottom: 0, left: 0, top: 0}
      })
    }),

    errorPane: SC.ContainerView.design({
      classNames: ['error-pane'],
      isVisible: NO,
      layout: {left: 0, right: 0}
    }),

    horizontalSplitView: SC.SplitView.design({
      childViews: 'navigationView propertiesView'.w(),
      classNames: ['client-area'],
      layout: {bottom: 0, left: 0, top: Sqwerl.rowHeight},
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
          layout: {bottom: 0, left: 0}
        }),

        navigationToolbar: SC.View.extend({
          childViews: ['navigationBackButton'],
          classNames: ['navigation-toolbar'],
          height: Sqwerl.rowHeight,
          isVisibleBinding: 'Sqwerl.mainPage.mainPane.navigationBar.trailBar.isNotHome',
          layout: {bottom: 0, left: 0, right: 0, top: 0},

          navigationBackButton: SC.View.extend({
            classNames: ['navigation-back-button'],
            displayProperties: ['title'],
            layout: {bottom: 0, left: 0, right: 0, top: 0},
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
            /* buttonLength: -1 * (Sqwerl.rowHeight / 2) + 3), */
            buttonLength: -1 * ((Sqwerl.rowHeight * 1.5) + 3),
            buttonOverlap: 0,
            hasButtons: NO,
            minimumThumbLength: Sqwerl.rowHeight
          })
        })
      }),

      propertiesView: SC.ContainerView.extend(SC.SplitChild, {
        classNames: ['details-container-view'],
        childViews: ['detailsView', 'applicationMenuView'],
        layout: {bottom: 0, left: 0, top: 0},
        minimumSize: 250,

        detailsView: SC.ContainerView.design({
          classNames: ['details-view'],
          layout: {bottom: 0, left: 0, right: 0, top: 0}
        }),

        applicationMenuView: SC.View.extend({
          classNames: ['application-menu-view'],
          layout: {bottom: 0, top: 0, right: 0, width: 150}
        })
      })
    }),
  }),

  accountMenu: SC.PanelPane.create({
    classNames: ['drop-down-menu'],

    contentView: SC.View.create({
      childViews: 'myAccountMenuItem signOutMenuItem'.w(),
      classNames: ['drop-down-menu-content'],

      myAccountMenuItem: SC.View.extend({
        childViews: ['label', 'subLabel'],
        classNames: ['menu-item'],
        layout: { height: Sqwerl.rowHeight + 10, left: 0, top: 5, width: 198 },
        mouseDown: function () {
          Sqwerl.mainPage.accountMenu.showAccount()
        },

        label: SC.LabelView.create({
          classNames: ['menu-item-label'],
          layout: { height: Sqwerl.rowHeight, left: 0, right: 5, top: 5 },
          value: 'My account'
        }),

        subLabel: SC.LabelView.create({
          classNames: ['menu-item-sub-label'],
          layout: { left: 1, right: 5, top: Sqwerl.rowHeight * 0.65 },
          value: 'Show my account information'
        })
      }),

      signOutMenuItem: SC.View.extend({
        childViews: ['label', 'subLabel'],
        classNames: ['menu-item'],
        layout: { height: Sqwerl.rowHeight + 10, left: 0, top: Sqwerl.rowHeight + 20, width: 198 },
        mouseDown: function () {
          Sqwerl.mainPage.accountMenu.signOut()
        },

        label: SC.LabelView.create({
          classNames: ['menu-item-label'],
          layout: { height: Sqwerl.rowHeight, left: 0, right: 5, top: 5 },
          value: 'Sign out'
        }),

        subLabel: SC.LabelView.create({
          classNames: ['menu-item-sub-label'],
          layout: { left: 1, right: 5, top: (Sqwerl.rowHeight * 0.65) },
          value: 'Sign out of my account'
        })
      })
    }),

    accountMenuIsVisible: false,

    accountMenuWidth: 200,

    hide: function () {
      this.set('accountMenuIsVisible', false);
    },

    isVisibleDidChange: function () {
      if (this.get('accountMenuIsVisible')) {
        this.layout.height = 30;
        this.append();
        this.animate({
          opacity: 1, height: Sqwerl.rowHeight * 3
        }, {
          duration: 0.3, timing: 'ease-out'
        });
      } else {
        this.animate({
            opacity: 0, height: 30
          }, {
            duration: 0.3, timing: 'ease-out'
          },
          this,
          'remove');
      }
    }.observes('accountMenuIsVisible'),

    layout: { centerX: 0, centerY: -50 },

    modalPane: SC.ModalPane.extend({
      classNames: ['sqwerl-modal-pane'],

      mouseDown: function () {
        Sqwerl.mainPage.accountMenu.hide();
      },
    }),

    show: function () {
      var element = $('.account-menu'),
        mainPane = Sqwerl.mainPage.mainPane,
        x = element.offset().left + ((element.width() - this.accountMenuWidth) / 2),
        y = mainPane.applicationBar.layout.top + 40;
      if ((x + this.accountMenuWidth) > window.innerWidth) {
        x = window.innerWidth - this.accountMenuWidth - 15;
      }
      this.set('layout', { height: 0, left: x, top: y, width: this.accountMenuWidth });
      this.set('accountMenuIsVisible', YES);
    },

    /**
     * Shows the user his or her account information.
     *
     * @param {number} [retryCount]  How many times have we retried to retrieve the user's account information.
     */
    showAccount: function (retryCount) {
      console.log('User has requested to view his or her account');
      let self = this;
      let thingId;
      let userId = Sqwerl.get('userId');
      if (userId) {
        userId = userId.split('/').pop();
        thingId = '/types/accounts/' + encodeURI(userId);
        Sqwerl.navigationController.goTo(
          thingId,
          function onError(response) {
            if (response.status !== 200) {
              console.log('Failed to retrieve account for user with id: ' + userId);
              console.log(' HTTP status: ' + response.status);
              if (response.status === 403) {
                // TODO - Notify user that he or she does not have permission to view the account.
                console.log(
                  'The user with the id "' +
                    userId +
                    '" does not have permission to view the thing with the id "' +
                    thingId);
              } else if (response.status === 404) {
                if (!retryCount) {
                  retryCount = 0;
                }
                if (retryCount < 3) {
                 self.showAccount(++retryCount);
                } else {
                  // TODO - Notify the user that account could not be found.
                  console.log('Could not find an account for the user with the ID "' + userId + '"');
                }
              }
            }
          });
      }
      this.hide();
    },

    signOut: function () {
      console.log('User has requested to sign out');
      // TODO - Show user that application is busy signing out.
      $.post(
        window.location.protocol + '//' + window.location.host + "/sign-out",
        {},
        function onSuccessfulSignOut(result) {
          console.log('Successfully signed out');
          Sqwerl.updateUserSignInStatus();
        }
      ).fail(function (error) {
        // TODO - Handle sign out failure.
        console.log('Sign out failed');
      });
      this.hide();
    }
  }),

  mainMenu: SC.PanelPane.create({
    classNames: ['drop-down-menu main-menu'],

    contentView: SC.View.create({
      childViews: 'helpMenuItem feedbackMenuItem'.w(),
      classNames: ['drop-down-menu-content'],

      helpMenuItem: SC.View.extend({
        childViews: ['label', 'subLabel'],
        classNames: ['menu-item'],
        layout: { height: Sqwerl.rowHeight + 10, left: 0, top: 5, width: 198 },

        label: SC.LabelView.create({
          classNames: ['menu-item-label'],
          layout: { height: Sqwerl.rowHeight, left: 0, right: 5, top: 5 },
          value: 'Help'
        }),

        subLabel: SC.LabelView.create({
          classNames: ['menu-item-sub-label'],
          layout: { left: 1, right: 5, top: Sqwerl.rowHeight * 0.65 },
          value: 'Show me the instructions'
        })
      }),

      feedbackMenuItem: SC.View.extend({
        childViews: ['label', 'subLabel'],
        classNames: ['menu-item'],
        layout: { height: Sqwerl.rowHeight + 10, left: 0, top: Sqwerl.rowHeight + 20, width: 198 },
        mouseDown: function () {
          Sqwerl.mainPage.mainMenu.hide();
          Sqwerl.mainPage.mainMenu.contentView.feedbackMenuItem.requestFeedback();
        },

        label: SC.LabelView.create({
          classNames: ['menu-item-label'],
          layout: { height: Sqwerl.rowHeight, left: 0, right: 5, top: 5 },
          value: 'Send Feedback'
        }),

        subLabel: SC.LabelView.create({
          classNames: ['menu-item-sub-label'],
          layout: { left: 1, right: 5, top: Sqwerl.rowHeight * 0.65 },
          value: 'What you think about Sqwerl?'
        }),

        requestFeedback: function () {
           sweetAlert({
             allowEscapeKey: true,
             confirmButtonColor: '#004f00',
             confirmButtonText: 'Send',
             input: 'textarea',
             showCancelButton: true,
             text: 'Tell us what you think about Sqwerl',
             title: 'Give us a piece of your mind',
             type: 'question'
           }).then((text) => {
             let url = window.location.protocol + '//' + window.location.host + '/feedback';
             if (text) {
               if (text.length > 2048) {
                 text.slice(0, 2048);
               };
               $.post(
                 url,
                 { feedbackText: text },
                 function onSuccess(result) {
                   // TODO - Notify user that feedback was received.
                   console.log('Feedback successfully set to "' + url + '"');
                 }
               ).fail((error) => {
                 // TODO - Handle failure.
                 console.log('Failed to send feedback to "' + url + '"');
                 if (error) {
                   console.log('Error: ' + JSON.stringify(error));
                 }
               });
             }
           });
        }
      }),
    }),

    hide: function () {
      this.set('mainMenuIsVisible', false);
    },

    isVisibleDidChange: function () {
      if (this.get('mainMenuIsVisible')) {
        this.layout.height = 30;
        this.append();
        this.animate({
          opacity: 1, height: Sqwerl.rowHeight * 3
        }, {
          duration: 0.3, timing: 'ease-out'
        });
      } else {
        this.animate({
          opacity: 0, height: 30
        }, {
          duration: 0.3, timing: 'ease-out'
        },
        this,
        'remove');
      }
    }.observes('mainMenuIsVisible'),

    layout: { centerX: 0, centerY: -50 },

    mainMenuIsVisible: NO,

    mainMenuWidth: 200,

    modalPane: SC.ModalPane.extend({
      classNames: ['sqwerl-modal-pane'],

      mouseDown: function () {
        Sqwerl.mainPage.mainMenu.hide();
      }
    }),

    show: function () {
      var element = $('.application-menu'),
        mainPane = Sqwerl.mainPage.mainPane,
        x = element.offset().left + ((element.width() - this.mainMenuWidth) / 2),
        y = mainPane.applicationBar.layout.top + 40;
      if ((x + this.mainMenuWidth) > window.innerWidth) {
        x = window.innerWidth - this.mainMenuWidth - 15;
      }
      this.set('layout', { height: 0, left: x, top: y, width: this.mainMenuWidth });
      this.set('mainMenuIsVisible', YES);
    }
  }),

  menuPane: SC.MenuPane.create({
    isSubMenu: YES,
    items: [
      {title: 'Create Account'},
      {title: 'Sign In '},
      {isSeparator: YES},
      {title: 'Advanced Search'},
      {isSeparator: YES},
      {title: 'Provide Feedback'}
    ],
    positionPane: function (useAnchorCached) {
      'use strict';
      var mainPaneWidth = SC.RootResponder.responder.computeWindowSize();
      sc_super();
      this.adjust({originLeft: mainPaneWidth - this.get('width')});
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
    var searchItemController,
        searchItems = [],
        results,
        searchText;
    if (response.status === 200) {
      results = Sqwerl.convertToModel(response.body());
      searchText = results.text.toLowerCase();
      Sqwerl.get('SearchResultsController').set('content', results);
      results.get('searchItems').forEach(function (searchItem) {
        searchItemController = Sqwerl.SearchItemController.create();
        searchItemController.set('model', searchItem);
        if (searchItem.foundInProperties) {
          searchItem.foundInProperties.forEach(function (foundInProperty) {
            foundInProperty.value = Sqwerl.highlightSearchTextInValue(searchText, foundInProperty.value);
          });
        }
        searchItems.push(searchItemController);
      });
      Sqwerl.get('SearchResultsTableController').set('content', searchItems);
      Sqwerl.mainPage.searchDialog.contentView.containerView.set('nowShowing', Sqwerl.get('SearchResultsView'));
      $('body').on('click', '#search-links-column-header', function () {
        if (!Sqwerl.mainPage.searchDialog.get('isSearching')) {
          Sqwerl.get('SearchResultsController').toggleSortOrder('Links');
          Sqwerl.mainPage.search();
        }
      });
      $('body').on('click', '#search-description-column-header', function () {
        if (!Sqwerl.mainPage.searchDialog.get('isSearching')) {
          Sqwerl.get('SearchResultsController').toggleSortOrder('Name');
          Sqwerl.mainPage.search();
        }
      });
      $('body').on('click', '#search-type-column-header', function () {
        if (!Sqwerl.mainPage.searchDialog.get('isSearching')) {
          Sqwerl.get('SearchResultsController').toggleSortOrder('Type');
          Sqwerl.mainPage.search();
        }
      });
    } else if (response.status === 413) {
      // TODO - Ask, and allow the user, to refine search criteria.
      Sqwerl.get('SearchResultsTableController').set('content', searchItems);
      console.log('Search failed with status code ' + response.status + (response.errorObject ? ', error: ' + response.errorObject.message : ''));
    } else {
      // TODO - Notify the user that search failed.
      Sqwerl.get('SearchResultsTableController').set('content', searchItems);
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
    // TODO?
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
      childViews: 'titleBar containerView'.w(),

      titleBar: SC.View.extend({
        childViews: 'searchTitle searchClose'.w(),
        classNames: ['search-title-bar'],
        layout: {height: Sqwerl.rowHeight, left: 0, right: 0, top: 0},

        searchTitle: SC.LabelView.extend({
          classNames: ['search-title'],
          layout: {bottom: 0, height: Sqwerl.rowHeight, left: 0, right: 92, top: 0},
          valueBinding: 'Sqwerl.mainPage.searchDialog.title'
        }),

        searchClose: SC.ButtonView.design({
          action: 'hide',
          classNames: ['search-close'],
          layout: {bottom: 0, right: 0, top: 0, width: 92},
          title: 'Close'
        })
      }),

      containerView: SC.ContainerView.design({
        classNames: ['search-pane'],
        layout: {bottom: 0, left: 0, right: 0, top: Sqwerl.rowHeight}
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
            {opacity: 1, height: Sqwerl.mainPage.mainPane.$().height() - (Sqwerl.rowHeight * 3)},
            {duration: 0.3, timing: 'ease-out'}
        );
      } else {
        this.animate(
            {opacity: 0, height: 0},
            {duration: 0.3, timing: 'ease-out'},
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
          width = window.innerWidth - 20,
          y = mainPane.applicationBar.layout.top + 40;
      this.set('layout', {height: mainPane.$().height() - y - Sqwerl.rowHeight, left: 10, top: y, width: width});
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
          text = 'Found ' + results.total + ((results.total > 1) ? ' things' : ' thing');
        } else {
          Sqwerl.get('SearchResultsTableController').set('content', []);
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
   * @param {boolean} [isBusy]        If true then appear busy, otherwise have the navigation controls accept user
   *                                  input.
   * @param {Sqwerl.Node} [fetching]  The thing whose information this application is loading.
   */
  setNavigationBusy: function (isBusy, fetching) {
    'use strict';
    var element = Sqwerl.mainPage.mainPane.horizontalSplitView.navigationView.navigationBusyPanel.$();
    if (isBusy) {
      if (!Sqwerl.isNavigationBusy) {
        $('.sc-outline').css('cursor', 'busy');
        element.addClass('visible');
        element.focus();
        if (fetching) {
          Sqwerl.get('LoadingController').set('content', fetching);
        }
        Sqwerl.mainPage.mainPane.horizontalSplitView.propertiesView.detailsView.set('nowShowing', Sqwerl.get('LoadingView'));
      }
    } else {
      element.removeClass('visible');
      $('.sc-outline').css('cursor', 'pointer');
    }
  },

  /**
   * Shows information about the selected item within the navigation list.
   *
   * @param {string} typeId   Unique identifier for the selected thing's type.
   * @param {object} data     Data model that describes the selected thing.
   */
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
    controller = Sqwerl.get(viewName + 'Controller');
    if (controller) {
      controller.set('content', Sqwerl.convertToModel(data));
    }
    viewName += 'View';
    view = Sqwerl.get(viewName);
    if (view) {
      SC.debug('%@: Setting the properties view to \'%@\'', this, viewName);
      Sqwerl.mainPage.mainPane.horizontalSplitView.propertiesView.detailsView.set('nowShowing', view);
      if (controller && (typeof controller.onViewShown === 'function')) {
        controller.onViewShown()
      }
    }
  },

  signInDialog: SC.PanelPane.create({
    classNames: ['drop-down-menu'],

    contentView: SC.View.create({
      childViews: 'emailLabel emailField passwordLabel passwordField forgotPasswordLink signInButton cancelButton'.w(),
      classNames: ['drop-down-menu-content'],

      email: null,

      emailLabel: SC.LabelView.design({
        classNames: ['sign-in-email-label', 'sign-in-field-label'],
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
            message = 'Enter your email.';
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
        layout: { height: Sqwerl.rowHeight, left: 11, top: 8 },
        value: 'Email'
      }),

      emailField: SC.TextFieldView.create({
        acceptsFirstResponder: YES,
        classNames: ['sign-in-email-field'],
        keyUp: function (event) {
          var dialog = Sqwerl.mainPage.signInDialog,
            contentView = dialog.contentView,
            handledEvent = NO,
            value = this.get('value');
          if (this.get('isEnabled')) {
            if (event.keyCode === 13) {
              if (dialog.isValidEmailAddress(value)) {
                handledEvent = YES;
                if (dialog.hasPassword()) {
                  dialog.signIn();
                } else {
                  contentView.passwordField.becomeFirstResponder();
                  contentView.passwordField.invokeNext(function () {
                    this.$().addClass('focus');
                  });
                  dialog.set('signInButtonText', 'Enter your password');
                }
              } else {
                handledEvent = YES;
                contentView.signInButton.$().addClass('invalid');
                dialog.set('signInButtonText', 'Enter your email address');
              }
            } else if (event.keyCode === 27) {
              handledEvent = YES;
              dialog.hide();
            }
          } else {
            handledEvent = YES;
          }
          return handledEvent;
        },
        layout: { height: Sqwerl.rowHeight, left: 10, top: Sqwerl.rowHeight + 10, width: 330 },
        leftAccessoryView: SC.View.extend({
          layout: { height: 16, left: 4, top: 10, width: 18 },
          render: function (context) {
            context.begin('span').addClass(['ti-email email-field-icon']).end();
          }
        }),
        onValueChanged: function () {
          var dialog = Sqwerl.mainPage.signInDialog,
            email = this.get('value'),
            signInButton = dialog.contentView.signInButton,
            validEmailAddress = false;
          if (email && (email.length > 0)) {
            if (dialog.isValidEmailAddress(email)) {
              validEmailAddress = true;
              signInButton.$().removeClass('invalid');
              if (dialog.get('hasPassword')) {
                signInButton.$().removeClass('instructions');
                dialog.set('signInButtonText', 'Sign in');
                dialog.set('allowSignIn', true);
                dialog.set('wasValid', true);
              } else {
                dialog.set('allowSignIn', false);
                signInButton.$().addClass('instructions');
                dialog.set('signInButtonText', 'Enter your password');
              }
            } else {
                if (dialog.get('wasValidEmailAddress')) {
                  signInButton.$().removeClass('instructions');
                  signInButton.$().addClass('invalid');
                  dialog.set('signInButtonText', 'Invalid email address. Please fix.');
                }
                dialog.set('allowSignIn', false);
            }
          } else {
            dialog.handleInvalidEmailAddress(email);
          }
          dialog.set('wasValidEmailAddress', validEmailAddress)
        }.observes('value')
      }),

      passwordLabel: SC.LabelView.create({
        classNames: ['sign-in-password-label', 'sign-in-field-label'],
        layout: { height: Sqwerl.rowHeight, left: 11, top: (Sqwerl.rowHeight * 2) + 8, width: 330 },
        value: 'Password'
      }),

      passwordField: SC.TextFieldView.create({
        acceptsFirstResponder: YES,
        classNames: ['sign-in-password-field'],
        keyUp: function (event) {
          var dialog = Sqwerl.mainPage.signInDialog,
            contentView = dialog.contentView,
            email = contentView.emailField.get('value'),
            handledEvent = NO,
            signInButton = contentView.signInButton;
          if (this.get('isEnabled')) {
            if (event.keyCode === 13) {
              if (dialog.isValidEmailAddress(email)) {
                if (dialog.contentView.passwordField.get('value').length > 0) {
                  if (dialog.get('allowSignIn')) {
                    handledEvent = true;
                    dialog.signIn();
                  }
                } else {
                  signInButton.$().removeClass('instructions');
                  signInButton.$().addClass('invalid');
                  dialog.set('signInButtonText', 'Enter your password');
                  handledEvent = true;
                }
              } else {
                if ((!email) || (email.length == 0)) {
                  signInButton.$().removeClass('instructions');
                  signInButton.$().addClass('invalid');
                  dialog.set('signInButtonText', 'Enter your email address');
                  handledEvent = YES;
                } else {
                  signInButton.$().removeClass('instructions');
                  signInButton.$().addClass('invalid');
                  dialog.set('signInButtonText', 'Invalid email address. Please fix');
                  handledEvent = YES;
                }
              }
              return handledEvent;
            } else if (event.keyCode === 27) {
              handledEvent = YES;
              dialog.hide();
            } else {
              if (dialog.isValidEmailAddress(email)) {
                if (contentView.passwordField.get('value').length > 0) {
                  dialog.set('allowSignIn', true);
                  signInButton.$().removeClass('instructions');
                  signInButton.$().removeClass('invalid');
                  if (!dialog.get('wasValid')) {
                    dialog.set('signInButtonText', 'Sign In');
                    dialog.set('wasValid', true);
                  }
                } else {
                  dialog.set('allowSignIn', false);
                  if (dialog.get('wasValid')) {
                    signInButton.$().removeClass('instructions');
                    signInButton.$().addClass('invalid');
                    dialog.set('signInButtonText', 'You must enter your password');
                  }
                }
              } else {
                signInButton.$().removeClass('instructions');
                signInButton.$().addClass('invalid');
                dialog.set('signInButtonText', 'Enter your email address');
              }
            }
          } else {
            handledEvent = YES;
          }
          return handledEvent;
        },
        layout: { height: Sqwerl.rowHeight, left: 10, top: (Sqwerl.rowHeight * 3) + 10, width: 330 },
        leftAccessoryView: SC.View.extend({
          layout: { height: 16, left: 4, top: 10, width: 18 },
          render: function (context) {
            context.begin('span').addClass(['ti-key password-field-icon']).end();
          }
        }),
        onValueChanged: function () {
          var dialog = Sqwerl.mainPage.signInDialog,
            contentView = dialog.contentView,
            email = contentView.emailField.get('value'),
            signInButton = contentView.signInButton;
          if (this.get('value').length > 0) {
            if ((!dialog.get('wasValid') && dialog.isValidEmailAddress(email))) {
              signInButton.$().removeClass('instructions');
              signInButton.$().removeClass('invalid');
              dialog.set('wasValid', true);
              dialog.set('signInButtonText', 'Sign in');
            }
            dialog.set('allowSignIn', dialog.isValidEmailAddress(contentView.emailField.get('value')));
          } else {
            signInButton.$().removeClass('instructions');
            signInButton.$().addClass('invalid');
            dialog.set('allowSignIn', false);
            dialog.set('signInButtonText', 'You must enter your password');
            dialog.set('wasValid', false);
          }
        }.observes('value'),
        type: 'password'
      }),

      signInButton: SC.ButtonView.create({
        acceptsFirstResponder: function () {
          return Sqwerl.mainPage.signInDialog.get('allowSignIn');
        }.property('Sqwerl.mainPage.signInDialog.allowSignIn'),
        classNames: ['sign-in-button instructions visible'],
        displayProperties:
          ['Sqwerl.mainPage.signInDialog.signInButtonText', 'Sqwerl.mainPage.signInDialog.isNotSigningIn'],
        keyUp: function (event) {
          var dialog = Sqwerl.mainPage.signInDialog,
            handledEvent = false;
          if ((event.keyCode === 13) || (event.keyCode === 32)) {
            if (dialog.get('allowSignIn')) {
              dialog.signIn();
              handledEvent = true;
            }
          } else if (event.keyCode === 27) {
            if (!dialog.get('isNotSigningIn')) {
              // TODO - Handle if user is signing in.
            }
            handledEvent = true;
            Sqwerl.mainPage.signInDialog.hide();
          }
          return handledEvent;
        },
        layout: { height: Sqwerl.rowHeight, left: 10, top: (Sqwerl.rowHeight * 4) + 20, width: 330 },
        mouseDown: function (event) {
          var dialog = Sqwerl.mainPage.signInDialog;
          if (dialog.get('allowSignIn')) {
            dialog.signIn();
          }
        },
        render: function (context) {
          var dialog = Sqwerl.mainPage.signInDialog,
            labelContext;
          context.addAttr('role', 'button');
          context.addClass('sc-button-view').addClass('square').addClass('button').addClass('sc-regular-size');
          labelContext = context.begin('label');
          labelContext.addClass('sc-button-label').addClass('sc-regular-size').addClass('ellipsis');
          if (this.$().hasClass('invalid')) {
            context.begin('span').addClass('ti-alert').end();
          }
          if (!dialog.get('isNotSigningIn')) {
            context.begin('span').addClass('sign-in-busy-indicator').end();
          }
          context.begin('span')
            .push(SC.RenderContext.escapeHTML(dialog.get('signInButtonText')))
            .end();
          labelContext.end();
          return context;
        },
        supportFocusRing: YES,
        titleBinding: 'Sqwerl.mainPage.signInDialog.signInButtonText'
      }),

      cancelButton: SC.ButtonView.create({
        acceptsFirstResponder: YES,
        classNames: ['sign-in-cancel'],
        displayProperties: ['Sqwerl.mainPage.signInDialog.cancelButtonText'],
        keyUp: function (event) {
          var dialog = Sqwerl.mainPage.signInDialog,
            handledEvent = NO,
            keyCode = event.keyCode;
          if ((keyCode === 13) || (keyCode === 32) || (keyCode === 27)) {
            handledEvent = YES;
            if (!dialog.get('isNotSigningIn')) {
              dialog.contentView.signInButton.$().removeClass('busy');
              // TODO - Handle canceling signing in.
            }
            dialog.set('isNotSigningIn', true);
            dialog.hide();
          }
          return handledEvent;
        },
        layout: { height: Sqwerl.rowHeight, left: 10, top: (Sqwerl.rowHeight * 5) + 30, width: 330 },
        mouseDown: function () {
          var dialog = Sqwerl.mainPage.signInDialog;
          if (!dialog.get('isNotSigningIn')) {
            dialog.contentView.signInButton.$().removeClass('busy');
            // TODO - Handle canceling signing in.
          }
          dialog.set('isNotSigningIn', true);
          dialog.hide();
        },
        render: function (context) {
          var labelContext;
          context.addAttr('role', 'button');
          context.addClass('sc-button-view').addClass('square').addClass('button').addClass('sc-regular-size');
          labelContext = context.begin('label');
          labelContext.addClass('sc-button-label').addClass('sc-regular-size').addClass('ellipsis');
          /// context.begin('span').addClass('ti-close sign-in-cancel-button-icon').end();
          context.begin('span').addClass('sign-in-cancel-button-text').push(
            SC.RenderContext.escapeHTML(Sqwerl.mainPage.signInDialog.get('cancelButtonText')))
            .end();
          labelContext.end();
          return context;
        },
        supportsFocusRing: YES,
        titleBinding: 'Sqwerl.mainPage.signInDialog.cancelButtonText'
      })
      /*
       forgotPasswordLink: SC.ButtonView.create({
       layout: { top: 184, right: 20, height: 36 },
       title: 'Forgot password?'
       }),
       */
    }),

    allowSignIn: false,

    cancelButtonText: 'Don\'t sign in',

    containsValidEmailAddress: false,

    dialogWidth: 350,

    email: null,

    handleInvalidEmailAddress(email) {
      var isEmpty = !(email && (email.length > 0));
      this.set('signInButtonText', isEmpty ? 'Enter your email address' : 'Not a valid email address. Please fix.');
      this.contentView.emailField.$().addClass('invalid');
      this.contentView.signInButton.$().addClass('invalid');
      this.contentView.signInButton.$().addClass('')
      this.set('allowSignIn', false);
    },

    hasPassword: function () {
      var password = Sqwerl.mainPage.signInDialog.contentView.passwordField.get('value');
      return password && (password.length > 0);
    }.property(),

    hasUserId: function () {
      var email = Sqwerl.mainPage.signInDialog.contentView.emailField.get('value');
      return email && this.isValidEmailAddress(email);
    }.property(),

    hide: function () {
      this.set('signInDialogIsVisible', false);
    },

    isEnabledBinding: 'Sqwerl.mainPage.signInDialog.isNotSigningIn',

    isNotSigningIn: YES,

    isSignInFailedMessageVisible: NO,

    isValidEmailAddress: function (email) {
      return Sqwerl.mainPage.createAccountDialog.contentView.isValidEmailAddress(email);
    }.property(),

    isVisibleDidChange: function () {
      if (this.get('signInDialogIsVisible')) {
        this.layout.height = 30;
        this.append();
        this.animate({
          opacity: 1, height: this.signInDialogHeight
        }, {
          duration: 0.3, timing: 'ease-out'
        });
      } else {
        this.animate({
          opacity: 0, height: 30
        }, {
          duration: 0.3, timing: 'ease-out'
        },
        this,
        'remove');
      }
    }.observes('signInDialogIsVisible'),

    layout: { centerX: 0, centerY: -50, minHeight: 210, width: 350 },

    message: ' ',

    modalPane: SC.ModalPane.extend({
      classNames: ['sqwerl-modal-pane'],

      mouseDown: function () {
        if (Sqwerl.mainPage.signInDialog.isNotSigningIn) {
          Sqwerl.mainPage.signInDialog.hide();
        }
      }
    }),

    show: function () {
      var element = $('.sign-in-menu'),
        email = this.contentView.emailField.get('value'),
        emailField = this.contentView.emailField,
        mainPane = Sqwerl.mainPage.mainPane,
        passwordField = this.contentView.passwordField,
        x = element.offset().left + ((element.width() - this.signInDialogWidth) / 2),
        y = mainPane.applicationBar.layout.top + 40;
      if ((x + this.signInDialogWidth) > window.innerWidth) {
        x = window.innerWidth - this.signInDialogWidth;
      }
      this.set('layout', { height: this.signInDialogHeight, left: x, top: y, width: this.signInDialogWidth });
      this.set('wasValid', false);
      this.set('wasValidEmailAddress');
      this.contentView.passwordField.set('value', '');
      this.contentView.signInButton.$().addClass('instructions');
      this.contentView.cancelButton.$().removeClass('busy');
      this.set('cancelButtonText', 'Don\'t sign in');
      if (this.isValidEmailAddress(email)) {
        passwordField.becomeFirstResponder();
        passwordField.invokeNext(function () { this.$().addClass('focus'); });
        this.contentView.signInButton.$().removeClass('invalid');
        this.set('signInButtonText', 'Enter your password');
      } else {
        emailField.becomeFirstResponder();
        emailField.invokeNext(function () { this.$().addClass('focus'); });
        if (email && (email.length > 0)) {
          this.contentView.signInButton.$().addClass('invalid');
          this.contentView.signInButton.$().removeClass('instructions');
          this.set('signInButtonText', 'Invalid email address. Please fix.');
        } else {
          this.set('signInButtonText', 'Enter your email address and password');
        }
      }
      this.set('isNotSigningIn', YES);
      this.set('signInDialogIsVisible', YES);
      this.contentView.emailLabel.set('isEnabled', true);
      this.contentView.emailField.set('isEnabled', true);
      this.contentView.emailField.$().attr('tabindex', 0);
      this.contentView.passwordLabel.set('isEnabled', true);
      this.contentView.passwordField.set('isEnabled', true);
      this.contentView.passwordField.$().attr('tabindex', 0);
    },

    signIn: function () {
      var signInButton = this.contentView.signInButton,
        cancelButton = this.contentView.cancelButton,
        email = this.contentView.emailField.get('value'),
        password = this.contentView.passwordField.get('value'),
        signInButtonElement = signInButton.$();
      this.set('isNotSigningIn', NO);
      // TODO - Randomly choose this text from a set of choices that reinforce Sqwerl's voice.
      this.set('signInButtonText', 'Signing in. Hold on....');
      this.set('cancelButtonText', 'Stop signing in');
      cancelButton.$().addClass('busy');
      signInButtonElement.removeClass('instructions');
      signInButtonElement.removeClass('invalid');
      signInButtonElement.addClass('busy');
      this.contentView.emailLabel.set('isEnabled', false);
      this.contentView.emailField.set('isEnabled', false);
      this.contentView.emailField.$().attr('tabindex', -1);
      this.contentView.passwordLabel.set('isEnabled', false);
      this.contentView.passwordField.set('isEnabled', false);
      this.contentView.passwordField.$().attr('tabindex', -1);
      $.post(
        window.location.protocol + '//' + window.location.host + '/sign-in', {
          email: email,
          password: password
        },
        function onSuccessfulSignIn(result) {
          Sqwerl.set('userId', result.userId);
          Sqwerl.set('userName', result.userName);
          Sqwerl.mainPage.set('userName', result.userName);
          Sqwerl.set('isSignedIn', true);
          Sqwerl.token = result;
          Sqwerl.mainPage.signInDialog.contentView.signInButton.$().removeClass('busy');
          Sqwerl.mainPage.signInDialog.hide();
        }
      ).fail(function (error) {
        // TODO - Handle sign in failure.
        Sqwerl.mainPage.signInDialog.contentView.signInButton.$().removeClass('busy');
        console.log('Sign in failed');
      });
    },

    signInButtonText: 'Enter your email address and password',

    signInDialogHeight: (Sqwerl.rowHeight * 6) + 40,

    signInDialogIsVisible: NO,

    signInDialogWidth: 350,

    warning: NO,

    wasValid: false,

    wasValidEmailAddress: false
  }),

  userName: null
});
