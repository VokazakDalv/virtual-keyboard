import Control from './Control.js';
import { specialKeys } from '../data/key-array.js';

class Key {
  constructor(parentNode, keyData, up = '', down = '', textArea = '') {
    this.currentTextArea = textArea;
    this.span = new Control(parentNode, 'span');
    this.span.node.dataset.key = keyData;
    this.span.node.addEventListener('mousedown', this.mouseDownHandle.bind(this));
    this.span.node.addEventListener('mouseup', (event) => {
      event.currentTarget.classList.remove('span-click');
    });
    if (down === 'Backspace' || down === 'Enter' || down === 'Shift' || down === 'CapsLock') {
      this.span.node.classList.add('big');
    }
    if (down === 'Space') {
      this.span.node.classList.add('space');
    }
    if (down === 'Crtl') {
      this.span.node.classList.add('ctrl');
    }
    this.iUp = new Control(this.span.node, 'i', 'up', up);
    this.iDown = new Control(this.span.node, 'i', 'down', (down !== 'Space') ? down : '');
  }

  mouseDownHandle(event) {
    event.preventDefault();
    this.currentTextArea.node.focus();
    // console.log(this.currentTextArea.node.selectionStart);
    const start = this.currentTextArea.node.selectionStart;
    const end = this.currentTextArea.node.selectionEnd;
    this.keyPrint(start, end);
    if (this.span.node.dataset.key === 'Space') {
      this.spaceHandle(start, end);
    }
    this.span.node.addEventListener('mouseout', () => {
      this.span.node.classList.remove('span-click');
    });
    this.span.node.classList.add('span-click');

    if (this.span.node.dataset.key === 'Backspace') {
      this.backSpaceHandle(start, end);
    }
    if (this.span.node.dataset.key === 'Delete') {
      this.delHandle(start);
    }
    if (this.span.node.dataset.key === 'Tab') {
      this.tabHandle(start, end);
    }
    if (this.span.node.dataset.key === 'Enter') {
      this.enterHandle(start, end);
    }
    if (this.span.node.dataset.key === 'CapsLock') {
      this.span.node.classList.toggle('span-active');
    }
  }

  keyPrint(start, end) {
    if (specialKeys.indexOf(this.span.node.dataset.key) < 0) {
      const cursorPosition = this.currentTextArea.node.selectionStart;
      this.currentTextArea.node.value = this.currentTextArea.node.value.substring(0, start)
        + this.iDown.node.innerText + this.currentTextArea.node.value.substring(end);
      this.currentTextArea.node.selectionEnd = cursorPosition + 1;
    }
  }

  tabHandle() {
    const start = this.currentTextArea.node.selectionStart;
    const end = this.currentTextArea.node.selectionEnd;
    const cursorPosition = this.currentTextArea.node.selectionStart;
    this.currentTextArea.node.value = `${this.currentTextArea.node.value.substring(0, start)
    }\t${this.currentTextArea.node.value.substring(end)}`;
    this.currentTextArea.node.selectionEnd = cursorPosition + 1;
  }

  enterHandle(start, end) {
    const cursorPosition = this.currentTextArea.node.selectionStart;
    this.currentTextArea.node.value = `${this.currentTextArea.node.value.substring(0, start)
    }\n${this.currentTextArea.node.value.substring(end)}`;
    this.currentTextArea.node.selectionEnd = cursorPosition + 1;
  }

  spaceHandle(start, end) {
    const cursorPosition = this.currentTextArea.node.selectionStart;
    this.currentTextArea.node.value = `${this.currentTextArea.node.value.substring(0, start)
    } ${this.currentTextArea.node.value.substring(end)}`;
    this.currentTextArea.node.selectionEnd = cursorPosition + 1;
  }

  backSpaceHandle(start, end) {
    const cursorPosition = this.currentTextArea.node.selectionStart;
    this.currentTextArea.node.value = this.currentTextArea.node.value.substring(0, start - 1)
      + this.currentTextArea.node.value.substring(end);
    this.currentTextArea.node.selectionEnd = cursorPosition - 1;
  }

  delHandle(start) {
    const cursorPosition = this.currentTextArea.node.selectionStart;
    this.currentTextArea.node.value = this.currentTextArea.node.value.substring(0, start)
      + this.currentTextArea.node.value.substring(start + 1);
    this.currentTextArea.node.selectionEnd = cursorPosition;
  }

  arrowHandle() {
    console.log('arrowHandle');
  }
}
export default Key;
