import { useState } from 'react';
import { Text } from 'slate';
/* eslint-disable import/no-webpack-loader-syntax */
import DecorateWorker from 'worker!./decorateWorker.js';
import getDecorComponents from '@editor/decorators/getDecorComponents';
import getDecorTriggers from '@editor/decorators/getDecorTriggers';
import getDecoratorKey from '@editor/decorators/utils/getDecoratorKey';
import regexFromRegex from '@editor/decorators/utils/regexFromRegex';
import regexFromString from '@editor/decorators/utils/regexFromString';
import isTest from '@utils/test/isTest';

// commands dict
const commands = {
  generate: 'generage-ranges',
}

// decorator class
class Decorator {

  // instantiate worker
  constructor() {
    this.initiate();
    this.editor = null;
    this.triggers = [];
    this.components = {};
    this.ranges = [];
    this.rangesDict = {};
    this.total = 0;
    this.matches = {};
    this.aggregates = {};
  }

  useLeafUpdater() {
    const [ leafUpdater, setLeafUpdater ] = useState(0);
    this.leafUpdater = leafUpdater;
    this.setLeafUpdater = setLeafUpdater;
    return leafUpdater;
  }

  forceRenderLeafs() {
    this.setLeafUpdater(this.leafUpdater + 1)
    this.leafUpdater += 1;
  }

  // set a ref to the editor object
  setEditor(editor) {
    this.editor = editor;
  }

  // return object to be passed as decors
  getDecors() {
    return {
      matches: this.matches,
      aggregates: this.aggregates,
      total: this.total,
    }
  }

  // extract values from decorator list
  applyPlugins(decorators = []) {

    // pre-calculate decorator values
    this.decoratorsSerializable = decorators.map(d => {

      // create regex
      let regex = d.match;
      if (regex instanceof RegExp) regex = regexFromRegex(regex);
      if (typeof regex === 'string') regex = regexFromString(regex);
      if (Array.isArray(regex)) {
        regex = d.match
          .map(s => regexFromString(s, { wholeWord: true }))
          .filter(Boolean)
          .map(regexFromRegex);
      }
      if (!Array.isArray(regex) && regex instanceof RegExp !== true) {
        regex = null;
      }

      const id = d.id;
      const key = getDecoratorKey(id);

      // return a serializable object
      // to pass on to the worker
      return { regex, id, key };
    });

    // extract components
    this.triggers = getDecorTriggers(decorators);
    this.components = getDecorComponents(decorators);

    // trigger generate ranges cycle with timeout
    this.generateRanges();
  }

  // start web worker
  initiate() {
    // bail if test
    if (isTest()) return;
    // instantiate web worker
    this.worker = new DecorateWorker();
    this.worker.onmessage = e => {
      this.onResponse(e.data);
    }
  }

  // terminate worker
  terminate() {
    this.worker.terminate();
  }

  // when worker gets invoked rapidly, it will unlikely
  // have enough time to finish the last process, and
  // eventually stack up and crash. to avoid this,
  // terminate the current running process and start a new
  // one, so only the last invocation will take effect
  restart() {
    this.terminate();
    this.initiate();
  }

  // start the worker
  generateRanges() {
    if (!this.worker) return;
    if (!this.editor) return;

    // kill old process and start a new one
    this.restart();

    // send signal to worker
    this.worker.postMessage({
      command: commands.generate,
      children: this.editor.children,
      decorators: this.decoratorsSerializable,
      commands,
    });
  }

  // response received from webworker
  onResponse(res = {}) {

    // generate callback
    if (res.command === commands.generate) {
      this.ranges = res.ranges;
      this.rangesDict = res.rangesDict;
      this.matches = res.matches;
      this.aggregates = res.aggregates;
      this.total = res.total;
      // call onChange to trigger decoration cycle
      this.editor.onChange();
      // force rerender leafs to register decorations
      this.forceRenderLeafs();
    }
  }

  decorate = ([ node, path ]) => {
    if (!Text.isText(node)) return [];
    const pathJoined = path.join('-');
    return this.rangesDict[pathJoined] || [];
  }
}

// export singleton since we only need one worker
export default new Decorator();
