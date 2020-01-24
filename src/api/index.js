import focus from './focus/focus';
import hasFocus from './focus/hasFocus';
import focusAtEnd from './focus/focusAtEnd';
import focusAtStart from './focus/focusAtStart';
import moveCursorToStart from './moveCursor/moveCursorToStart';
import moveCursorToEnd from './moveCursor/moveCursorToEnd';
import insertLink from './links/insertLink';
import removeLink from './links/removeLink';
import selectAll from './contents/selectAll';
import clear from './contents/clear';
import populateWindow from '../test-utils/populateWindow';

export default editor => ({

  // actions
  focus: () => focus(editor),
  hasFocus: () => hasFocus(editor),
  focusAtEnd: () => focusAtEnd(editor),
  focusAtStart: () => focusAtStart(editor),
  moveCursorToStart: () => moveCursorToStart(editor),
  moveCursorToEnd: () => moveCursorToEnd(editor),
  selectAll: () => selectAll(editor),
  clear: options => clear(editor, options),
  insertLink: url => insertLink(editor, url),
  removeLink: () => removeLink(editor),

  // internals
  _getEditor: () => editor,
  _populateWindow: () => populateWindow(editor),
});
