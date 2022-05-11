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
    this.lang = 'EN';
    this.form = new Control(document.body, 'form');
    this.textArea = new Control(this.form.node, 'textarea');
    this.container = new Control(document.body, 'div', 'container');
    keys.forEach((elem, index) => {
      this.key = new Key(this.container.node, keysData[index], '', elem, this.textArea);
      this.collectionKey.push(this.key.iDown);
      this.collectionSpan.push(this.key.span);
      if (this.key.iDown.node.innerText === 'CapsLock') {
        this.key.span.node.addEventListener('click', this.changeLetterCase.bind(this));
      }
    });

    document.addEventListener('keydown', (event) => {
      this.textArea.node.focus();
      if (keysRus.indexOf(event.key) >= 0 || keysEng.indexOf(event.key) >= 0) {
        event.preventDefault();
        if (arrows.indexOf(event.key) < 0 && specialKeys.indexOf(event.key) < 0) {
          const eventSpan = this.collectionSpan.find((elem) => elem.node.dataset.key
          === event.key.toLowerCase());
          eventSpan.node.classList.add('span-click');
          this.keyPrint(
            this.textArea.node.selectionStart,
            this.textArea.node.selectionEnd,
            eventSpan.node.children[1].innerHTML,
          );
        } else {
          this.specialKeysHandle(event);
        }

        if (event.key === 'Tab') {
          this.key.tabHandle();
        }
        if (event.key === 'CapsLock') {
          this.collectionSpan[29].node.classList.toggle('span-active');
          this.changeLetterCase();
        }
        if (arrows.indexOf(event.key) >= 0) {
          this.key.keyPrint(this.textArea.node.selectionStart, this.textArea.node.selectionEnd);
        }
      }
    });

    document.addEventListener('keyup', (event) => {
      if (arrows.indexOf(event.key) < 0 && specialKeys.indexOf(event.key) < 0) {
        const eventSpan = this.collectionSpan.find((elem) => elem.node.dataset.key
        === event.key.toLowerCase());
        eventSpan.node.classList.remove('span-click');
      } else {
        this.specialKeysHandle(event);
      }
    });

    this.runOnKeys(
      () => {
        this.changeLang();
      },
      'AltLeft',
      'ControlLeft',
    );
  }

  specialKeysHandle(event) {
    if (!event.repeat) {
      const eventSpan = this.collectionSpan.find((elem) => elem.node.dataset.key
          === event.key);
      if (event.key !== 'Shift' && event.key !== 'Control' && event.key !== 'Alt') {
        eventSpan.node.classList.toggle('span-click');
      }
      if (event.key === 'Shift') {
        if (event.code === 'ShiftLeft') {
          eventSpan.node.classList.toggle('span-click');
        } else {
          this.collectionSpan[54].node.classList.toggle('span-click');
        }
      }
      if (event.key === 'Control') {
        if (event.code === 'ControlLeft') {
          eventSpan.node.classList.toggle('span-click');
        } else {
          this.collectionSpan[63].node.classList.toggle('span-click');
        }
      }
      if (event.key === 'Alt') {
        if (event.code === 'AltLeft') {
          eventSpan.node.classList.toggle('span-click');
        } else {
          this.collectionSpan[59].node.classList.toggle('span-click');
        }
      }
    }
  }

  keyPrint(start, end, nodeText) {
    const cursorPosition = this.textArea.node.selectionStart;
    this.textArea.node.value = this.textArea.node.value.substring(0, start)
        + nodeText + this.textArea.node.value.substring(end);
    this.textArea.node.selectionEnd = cursorPosition + 1;
  }

  changeLang() {
    let arr = [...keysRus];
    if (this.lang === 'EN') {
      this.lang = 'RU';
    } else {
      this.lang = 'EN';
      arr = [...keysEng];
    }
    this.collectionKey.forEach((elem, index) => {
      const letterContainer = elem;
      letterContainer.node.innerText = arr[index];
    });
  }

  runOnKeys(func, ...args) {
    let temp = '';
    temp = this.lang;
    this.lang = temp;
    const arrChars = [];
    document.addEventListener('keydown', (event) => {
      if (event.repeat) return;
      arrChars.push(event.code);
    });
    document.addEventListener('keyup', () => {
      if (arrChars.length === 0) return;
      let runFunc = true;
      args.forEach((elem) => {
        if (!arrChars.includes(elem)) {
          runFunc = false;
        }
      });
      if (runFunc) func();
      arrChars.length = 0;
    });
  }

  changeLetterCase() {
    const firstLetter = this.collectionKey[15].node.innerText;
    this.collectionSpan.forEach((elem, index) => {
      if (specialKeys.indexOf(elem.node.dataset.key) < 0) {
        if (firstLetter.toUpperCase() !== firstLetter) {
          this.collectionKey[index].node.innerText = this.collectionKey[index].node.innerText
            .toUpperCase();
        } else {
          this.collectionKey[index].node.innerText = this.collectionKey[index].node.innerText
            .toLowerCase();
        }
      }
    });
  }
}

export default Keyboard;
