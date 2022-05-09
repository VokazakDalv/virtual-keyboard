import Key from './Key.js';
import {
  keysEng, arrows, keysData, keysRus, specialKeys,
} from '../data/key-array.js';
import Control from './Control.js';

class Keyboard {
  constructor() {
    let keys = [];
    if (!localStorage.getItem('chizhikov-LG')) {
      keys = [...keysEng];
    } else {
      keys = [...keysRus];
    }
    this.collectionKey = [];
    this.collectionSpan = [];
    this.form = new Control(document.body, 'form');
    this.textArea = new Control(this.form.node, 'textarea');
    this.textArea.node.focus();
    this.container = new Control(document.body, 'div', 'container');
    keys.forEach((elem, index) => {
      this.key = new Key(this.container.node, keysData[index], '', elem, this.textArea);
      this.collectionKey.push(this.key.iDown);
      this.collectionSpan.push(this.key.span);
      if (this.key.iDown.node.innerText === 'CapsLock') {
        this.key.span.node.addEventListener('click', this.changeLetterCase.bind(this));
      }
    });

    window.addEventListener('keydown', (event) => {
      this.textArea.node.focus();
      // console.log(`event.key=${event.key}`);
      // console.log(`event.code=${event.code}`);
      if (arrows.indexOf(event.key) < 0 && specialKeys.indexOf(event.key) < 0) {
        const eventSpan = this.collectionSpan.find((elem) => elem.node.dataset.key
        === event.key.toLowerCase());
        eventSpan.node.classList.add('span-click');
      } else {
        const eventSpan = this.collectionSpan.find((elem) => elem.node.dataset.key
        === event.key);
        if (event.key !== 'Shift' && event.key !== 'Control' && event.key !== 'Alt') {
          eventSpan.node.classList.add('span-click');
        }
        if (event.key === 'Shift' && event.code === 'ShiftLeft') {
          eventSpan.node.classList.add('span-click');
        } else if (event.key === 'Shift' && event.code === 'ShiftRight') {
          this.collectionSpan[54].node.classList.add('span-click');
        }
        if (event.key === 'Control' && event.code === 'ControlLeft') {
          eventSpan.node.classList.add('span-click');
        } else if (event.key === 'Control' && event.code === 'ControlRight') {
          this.collectionSpan[63].node.classList.add('span-click');
        }
        if (event.key === 'Alt' && event.code === 'AltLeft') {
          event.preventDefault();
          eventSpan.node.classList.add('span-click');
        } else if (event.key === 'Alt' && event.code === 'AltRight') {
          event.preventDefault();
          this.collectionSpan[59].node.classList.add('span-click');
        }
      }
      this.key.keyPrint(this.textArea.node.selectionStart, this.textArea.node.selectionEnd);
      if (event.key === 'Tab') {
        event.preventDefault();
        this.key.tabHandle();
      }
      if (event.key === 'CapsLock') {
        event.preventDefault();
        this.changeLetterCase();
      }
      if (arrows.indexOf(event.key) >= 0) {
        event.preventDefault();
        this.key.arrowHandle();
      }
    });
    window.addEventListener('keyup', (event) => {
      if (arrows.indexOf(event.key) < 0 && specialKeys.indexOf(event.key) < 0) {
        const eventSpan = this.collectionSpan.find((elem) => elem.node.dataset.key
        === event.key.toLowerCase());
        eventSpan.node.classList.remove('span-click');
      } else {
        const eventSpan = this.collectionSpan.find((elem) => elem.node.dataset.key
        === event.key);
        if (event.key !== 'Shift' && event.key !== 'Control' && event.key !== 'Alt') {
          eventSpan.node.classList.remove('span-click');
        }
        if (event.key === 'Shift' && event.code === 'ShiftLeft') {
          eventSpan.node.classList.remove('span-click');
        } else if (event.key === 'Shift' && event.code === 'ShiftRight') {
          this.collectionSpan[54].node.classList.remove('span-click');
        }
        if (event.key === 'Control' && event.code === 'ControlLeft') {
          eventSpan.node.classList.remove('span-click');
        } else if (event.key === 'Control' && event.code === 'ControlRight') {
          this.collectionSpan[63].node.classList.remove('span-click');
        }
        if (event.key === 'Alt' && event.code === 'AltLeft') {
          eventSpan.node.classList.remove('span-click');
        } else if (event.key === 'Alt' && event.code === 'AltRight') {
          this.collectionSpan[59].node.classList.remove('span-click');
        }
      }
    });
  }

  changeLetterCase() {
    if (this.collectionKey[15].node.innerText === 'q') {
      this.collectionKey.forEach((elem) => {
        const letterContainer = elem;
        letterContainer.node.innerText = elem.node.innerText.toUpperCase();
      });
    } else {
      this.collectionKey.forEach((elem) => {
        const letterContainer = elem;
        letterContainer.node.innerText = elem.node.innerText.toLowerCase();
      });
    }
  }
}

export default Keyboard;
