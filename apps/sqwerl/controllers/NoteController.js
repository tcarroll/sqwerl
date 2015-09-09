/*globals sc_require, Sqwerl*/

sc_require('controllers/ViewController');

/**
 * Controller that manages read-only views of notes.
 */
Sqwerl.NoteController = Sqwerl.ViewController.create({

    connectionCount: Sqwerl.property(function () {
        'use strict';
        return this.sumConnections(['notesFor']);
    }),

    hasMultipleNotesFor: Sqwerl.property(function () {
        'use strict';
        var notesFor = this.get('notesFor');
        return notesFor && (notesFor.totalCount > 1);
    }),

    hasNotesFor: Sqwerl.property(function () {
        'use strict';
        var notesFor = this.get('notesFor');
        return notesFor && (notesFor.totalCount > 0);
    })
});
