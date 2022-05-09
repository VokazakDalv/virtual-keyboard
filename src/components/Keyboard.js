import Key from './Key.js';
import { keys } from '../data/key-array.js';
import Control from './Control.js';

class Keyboard {
  constructor() {
    this.collection = [];
    this.form = new Control(document.body, 'form');
    this.textArea = new Control(this.form.node, 'textarea');
    this.container = new Control(document.body, 'div', 'container');
    keys.forEach((elem) => {
      this.key = new Key(this.container.node, '', elem, this.textArea);
      this.collection.push(this.key.iDown);
      if (this.key.iDown.node.innerText === 'CapsLock') {
        this.key.span.node.addEventListener('click', this.changeLetterCase.bind(this));
      }
    });
    localStorage.setItem('chizhikov-collection', this.collection);
  }

  changeLetterCase() {
    console.log(this.collection[15].node.innerText);
    if (this.collection[15].node.innerText === 'q') {
      this.collection.forEach((elem) => {
        const letterContainer = elem;
        letterContainer.node.innerText = elem.node.innerText.toUpperCase();
      });
    } else {
      this.collection.forEach((elem) => {
        const letterContainer = elem;
        letterContainer.node.innerText = elem.node.innerText.toLowerCase();
      });
    }
  }
}

export default Keyboard;
