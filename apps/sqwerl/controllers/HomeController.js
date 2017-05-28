/*globals Handlebars, SC, sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages the home/initial view's properties.
 */
Sqwerl.HomeController = Sqwerl.ViewController.create({

  /**
   * A catalog database of things that defines things that are shared between databases. Things like users,
   * groups, roles, and types of things.
   */
  catalogDatabase: null,

  /**
   * The default database of things that guest users can view.
   */
  defaultDb: null,

  /**
   * Converts the given plain-old JavaScript object into a corresponding SproutCore data model object.
   * Recursively traverses the given object's properties and converts their values into corresponding SproutCore
   * data model objects.
   *
   * @param {Object} data    A persistent thing.
   * @returns {Object}       An object whose properties are stored within a database.
   */
  convertToModel: function (model, data) {
    'use strict';
    var controller = this,
        value;
    Object.keys(data).forEach(function (property) {
      value = data[property];
      if (typeof value !== 'object') {
        model[property] = value;
        if (property === 'id') {
          model.link = '#' + value;
        }
      } else if (value instanceof Array) {
        model[property] = SC.ArrayController.create();
        var collection = [],
            index = 1;
        value.forEach(function (v) {
          v.index = index;
          index += 1;
          controller.convertArray(collection, v);
        });
        model[property].set('content', collection);
      } else if (value instanceof Object) {
        model[property] = controller.convertToModel(new SC.Object(), value);
      }
    });
    return model;
  },

  convertArray: function (content, value) {
    var controller = this;
    if (typeof value !== 'object') {
      value.index = content.length;
      content.push(value);
    } else if (value instanceof Array) {
      var arrayController = SC.ArrayController.create(),
          newContent = [];
      value.forEach(function (newValue) {
        controller.convertArray(newContent, newValue);
      });
      arrayController.set('content', newContent);
      content.push(arrayController);
    } else if (value instanceof Object) {
      content.push(controller.convertToModel(new SC.Object(), value));
    }
  },

  /**
   * Returns the default database of things that guest users can access.
   *
   * @return {Object} A database of things.
   */
  defaultDatabase: Sqwerl.property(function () {
    let controller = this;
    if (!this.defaultDb) {
      this.defaultDb = this.fetchDatabase(Sqwerl.defaultDatabaseName, function (results) {
        controller.set('defaultDb', controller.convertToModel(Sqwerl.store.createRecord(Sqwerl.Database), results));
        controller.onViewShown();
      });
    }
    return this.defaultDb;
  }),

  /**
   * Returns the number of things in the default database of things that guest (unauthenticated) users are allowed
   * to view.
   *
   * @return {Number} The number of things in the default database of things. This will be a non-negative integer
   *                  greater than or equal to zero.
   */
  defaultDatabaseThingCount: Sqwerl.property(function () {
    var thingCount = this.defaultDb ? this.defaultDb.get('thingCount') : '0';
    return thingCount ? thingCount.toLocaleString() : '0';
  }),

  /**
   * Shows (expands) or hides (collapses) details that show things that have been changed recently.
   *
   * @param element HTML element the user has clicked on to either expand or collapse change details.
   */
  expandCollapseChanges(element) {
    var change,
        container,
        expandCollapse,
        id,
        rowCount,
        rows,
        table;
    if (element) {
      container = $(element).closest('.home-view-changes');
      expandCollapse = container.find('.home-view-expand-collapse');
      if (!expandCollapse.hasClass('animating')) {
        expandCollapse.toggleClass('expanded');
        expandCollapse.addClass('animating');
        if (expandCollapse.hasClass('expanded')) {
          container.find('.home-view-hide-changes-link').show();
          container.find('.home-view-show-changes-link').hide();
        } else {
          container.find('.home-view-hide-changes-link').hide();
          container.find('.home-view-show-changes-link').show();
        }
        id = $(element).attr('data-id');
        table = $('table[data-id=' + id + ']');
        if (table && (table.length > 0)) {
          if (table.hasClass('expanded')) {
            rows = table.find('tr');
            rowCount = rows.length;
            rows.animate({ 'line-height': '0px', 'opacity': 0 });
            table.animate({ 'max-height': '0px', 'opacity': 0 });
            setTimeout(function () {
              table.removeClass('expanded');
              expandCollapse.removeClass('animating');
            }, 250);
          } else {
            table.addClass('expanded');
            rows = table.find('tr');
            rowCount = rows.length;
            rows.animate({ 'line-height': Sqwerl.rowHeight.toFixed(0) + 'px', 'opacity': 1 });
            table.animate({ 'max-height': (rowCount * Sqwerl.rowHeight).toFixed(0) + 'px', 'opacity': 1 });
            setTimeout(function () {
               expandCollapse.removeClass('animating');
            });
          }
        } else {
          change = $('div.home-view-single-change');
          if (change && (change.length > 0)) {
            if (change.hasClass('expanded')) {
              change.animate({ 'line-height': '0px', 'opacity': 0 });
              setTimeout(function () {
                change.removeClass('expanded');
                expandCollapse.removeClass('animating');
              }, 250);
            } else {
              change.addClass('expanded');
              change.animate({ 'line-height': Sqwerl.rowHeight.toFixed(0) + 'px', 'opacity': 1 });
              setTimeout(function () {
                expandCollapse.removeClass('animating');
              });
            }
          }
        }
      }
    }
  },

  /**
   * Retrieves a database of things.
   *
   * @param {String} databaseName   The unique name of the database to fetch.
   * @param {Function} callback     Called when the database's information is fetched from a remote server.
   * @returns {*} A database of things.
   */
  fetchDatabase: function (databaseName, callback) {
    'use strict';
    var id = '/types/databases/' + databaseName;
    return Sqwerl.store.find(SC.Query.create({
      conditions: 'id = {id}',
      parameters: {
        id: id,
        onError: function (response) {
          // TODO
          console.log('Error: ' + response);
        },
        onSuccess: function (results) {
          callback(results);
        }
      }
    }));
  },

  fromNow: function (date) {
    let result = '';
    if (date) {
      result = moment(date).fromNow();
      if (result.length > 0) {
        result = result.slice(0, 1).toUpperCase() + result.slice(1);
      }
    }
    return result;
  },

  /**
   * Returns the name of guest users: users who are not signed into an account.
   *
   * @returns {String} A user name.
   */
  guestUserName: Sqwerl.property(function () {
    'use strict';
    return Sqwerl.anonymousUserName;
  }),

  /**
   * Is the current user signed in to an account?
   *
   * @returns {Boolean} true if the user is signed into an account (authenticated), false if the user is a guest user.
   */
  isSignedIn: Sqwerl.property(function () {
    return Sqwerl.isSignedIn();
  }),

  membersToSort: function (recentChangeIndex) {
    var members = null,
      recentChanges = this.defaultDb.get('recentChanges');
    if (recentChanges && (recentChangeIndex < recentChanges.length())) {
      members = recentChanges.content[recentChangeIndex - 1].get('changes').get('members');
    }
    return members;
  },

  /**
   * Invoked when this controller's view is shown (made visible).
   */
  onViewShown() {
    let controller = this;
    let recentChanges = this.recentChanges();
    if (recentChanges) {
      let changes = recentChanges.content;
      let data = [];
      let formatTime = d3.timeFormat('%B %e, %Y');
      let graph = d3.select('#recent-changes-graph-container');
      let margin = { bottom: 50, left: 60, right: 30, top: 20 };
      let width = 600 - margin.left - margin.right;
      let height = 250 - margin.bottom - margin.top;
      let x = d3.scaleTime().rangeRound([width, 0]);
      let y = d3.scaleLinear().range([height, 0]);
      let svg = $('#recent-changes-graph-container > svg');
      if (svg.length === 0) {
        svg = graph.append('svg');
      } else {
        svg = d3.select('#recent-changes-graph-container > svg');
      }
      svg.attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      changes.forEach(function (change) {
        let d = {
          date: new Date(change.date),
          changeCount: change.changes.totalCount
        };
        data.push(d);
      });
      let tooltip = d3.select('body')
        .append('div')
        .attr('class', 'recent-changes-tooltip')
        .style('opacity', 0);
      x.domain([new Date(), d3.timeDay.offset(new Date(), -30)].reverse());
      let histogram = d3.histogram()
        .value(function (d) { return d.date; })
        .domain(x.domain())
        .thresholds(x.ticks(d3.timeDay));
      let bins = histogram(data);
      bins.forEach(function (bin) {
        bin.changeCount = (bin[0] && bin[0].changeCount) ? bin[0].changeCount : 0;
      });
      let barWidth = x(bins[0].x0) - x(bins[0].x1);
      y.domain([0, d3.max(bins, function (d) { return d.changeCount; })]);
      svg.selectAll('line.y-grid-line')
        .data(y.ticks())
        .enter().append('line')
        .attr('class', 'y-grid-line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', y)
        .attr('y2', y)
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      svg.selectAll('rect')
        .data(bins)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', margin.left)
        .attr('transform', function (d) {
          return 'translate(' + x(d.x0) + ',' + (y(d.changeCount) + margin.top) + ')';
        })
        .attr('width', function (d) { return x(d.x0) - x(d.x1); })
        .attr('height', function (d) { return height - y(d.changeCount); })
        .on('mouseover', function (d) {
          let changeCount = d.changeCount;
          let position = $('#recent-changes-graph-container > svg').position();
          tooltip.transition()
            .duration(200)
            .style('opacity', 0.9);
          tooltip.html(
              '<span class="recent-changes-tooltip-date">' + formatTime(d.x0) + '</span>' +
              '<br/>' +
              '<span class="recent-changes-tooltip-from-now">(' + controller.fromNow(d.x0) + ')</span>' +
              '<br/>' +
              changeCount +
              ' ' +
              ((changeCount == 1) ? 'change' : 'changes'))
            .style('left', position.left + x(d.x0) + (x(d.x0) - x(d.x1)) - 1 + 'px')
            .style('top', Math.max(0, y(changeCount) + position.top - 50) + 'px');
        })
        .on('mouseout', function (d) {
          tooltip.transition().duration(500).style('opacity', 0);
        });
      svg.append('g')
        .attr('class', 'x-axis home-view-graph-axes')
        .attr('transform', 'translate(' + (margin.left + barWidth) + ',' + (height + margin.top) + ')')
        .call(d3.axisBottom(x).ticks(d3.timeWeek.every(1)).tickFormat(d3.timeFormat('%B %e')))
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '2em')
        .attr('dy', '1em');
      svg.append('text')
        .attr('class', 'x-axis-title home-view-graph-axes-titles')
        .attr('transform', 'translate(' + ((width / 2) + margin.left) + ', ' + (height + margin.top) + ')')
        .attr('dy', '3em')
        .text('Time');
      svg.append('g')
        .attr('class', 'home-view-graph-axes')
        .attr('transform', 'translate(' + (margin.left + barWidth) + ',' + margin.top + ')')
        .call(d3.axisLeft(y));
      svg.append('text')
        .attr('class', 'home-view-graph-axes-titles')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0)
        .attr('x', 0 - ((height + margin.bottom) / 2))
        .attr('dy', '1.5em')
        .style('text-anchor', 'middle')
        .text('Number of changes');
      svg.selectAll('line.x-grid-line')
        .data(x.ticks(bins.length))
        .enter().append('line')
        .attr('class', 'x-grid-line')
        .attr('x1', x)
        .attr('x2', x)
        .attr('y1', 0)
        .attr('y2', height)
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    }
  },

  recentChanges: Sqwerl.property(function () {
    return this.defaultDb ? this.defaultDb.get('recentChanges') : null;
  }),

  /**
   * Sorts a list of changes to things by the things' names.
   *
   * @param element The HTML DOM element the user clicked on to request to reorder a list of changes.
   */
  sortChangesByNamesOfThings(element) {
    var changeIndex = Number(element.getAttribute('data-id')),
        members;
    if (!isNaN(changeIndex)) {
      members = this.membersToSort(changeIndex);
      if (members) {
        console.log('User has requested to sorting changes by name');
/* TODO
        members.set('orderBy',
          function (a, b) {
            var order = 0;
            if (a.name < b.name) {
              order = -1;
            } else if (a.name > b.name) {
              order = 1;
            }
            return order;
          }
        );
*/
      }
    }
  },

  /**
   * Sorts a list of changes to things by the type of change (for example: were the things modified or added?)
   *
   * @param element The HTML DOM element the user clicked on to request to reorder a list of changes.
   */
  sortChangesByTypesOfChanges(element) {
    var changeIndex = Number(element.getAttribute('data-id')),
      members;
    if (!isNaN(changeIndex)) {
      members = this.membersToSort(changeIndex);
      if (members) {
        console.log('User has requested to sort changes by type of change');
        /* TODO */
      }
    }
  },

  /**
   * Sorts a list of changes to things by those things' type (for example: authors, books, categories, ...)
   *
   * @param element The HTML DOM element the user clicked on to request to reorder a list of changes.
   */
  sortChangesByTypesOfThings(element) {
    var changeIndex = Number(element.getAttribute('data-id')),
      members;
    if (!isNaN(changeIndex)) {
      members = this.membersToSort(changeIndex);
      if (members) {
        console.log('User has requested to sort changes by type of things changed');
/* TODO
        members.content.sort(function (a, b) {
          var order = 0,
              firstTypeName,
              secondTypeName;
          firstTypeName = Handlebars.helpers.typeNameForId.call(a.typeId);
          secondTypeName = Handlebars.helpers.typeNameForId.call(b.typeId);
          if (firstTypeName < secondTypeName) {
            order = -1;
          } else if (firstTypeName > secondTypeName) {
            order = 1;
          }
          return order;
        });
*/
      }
    }
  },

  /**
   * Returns the first name of the currently signed in user.
   *
   * @returns {string} A user's first name.
   */
  userName: Sqwerl.property(function () {
    return Sqwerl.get('userName');
  }),
});