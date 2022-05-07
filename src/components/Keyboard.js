import Key from './Key.js';
import keys from '../data/key-array.js';
import Control from './Control.js';

class Keyboard {
  constructor() {
    this.container = new Control(document.body, 'div', 'container');
    keys.forEach((elem) => {
      this.key = new Key(this.container.node, '', elem);
    });
  }
}

export default Keyboard;
