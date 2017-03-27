/*globals SC, Sqwerl*/

/**
 * Views for notes.
 *
 * @type {SC.TemplateView}
 */
Sqwerl.NoteView = SC.TemplateView.create({
  connectionCountBinding: 'Sqwerl.NoteController.connectionCount',
  connectionCountTextBinding: 'Sqwerl.NoteController.connectionCountText',
  doneBinding: 'Sqwerl.NoteController.done',
  hasConnectionsBinding: 'Sqwerl.NoteController.hasConnections',
  hasMultipleConnectionsBinding: 'Sqwerl.NoteController.hasMultipleConnections',
  hasMultipleNotesForBinding: 'Sqwerl.NoteController.hasMultipleNotesFor',
  hasNotesForBinding: 'Sqwerl.NoteController.hasNotesFor',
  nameBinding: 'Sqwerl.NoteController.name',
  notesForBinding: 'Sqwerl.NoteController.notesFor',
  representationsBinding: 'Sqwerl.NoteController.representations',
  templateName: 'note_view',
  typeIconBinding: 'Sqwerl.NoteController.typeIcon'
});
