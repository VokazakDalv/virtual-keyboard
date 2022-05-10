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
    if (down === ' ') {
      this.span.node.classList.add('space');
    }
    if (down === 'Crtl') {
      this.span.node.classList.add('ctrl');
    }
    this.iUp = new Control(this.span.node, 'i', 'up', up);
    this.iDown = new Control(this.span.node, 'i', 'down', down);
  }

  mouseDownHandle(event) {
    event.preventDefault();
    this.currentTextArea.node.focus();
    const start = this.currentTextArea.node.selectionStart;
    const end = this.currentTextArea.node.selectionEnd;
    this.keyPrint(start, end);
    if (this.span.node.dataset.key === ' ') {
      this.specialKeysHandle(' ');
    }
    this.span.node.addEventListener('mouseout', () => {
      this.span.node.classList.remove('span-click');
    });
    this.span.node.classList.add('span-click');

    if (this.span.node.dataset.key === 'Backspace') {
      this.specialKeysHandle('Backspace');
    }
    if (this.span.node.dataset.key === 'Delete') {
      this.specialKeysHandle('Delete');
    }
    if (this.span.node.dataset.key === 'Tab') {
      this.specialKeysHandle('Tab');
    }
    if (this.span.node.dataset.key === 'Enter') {
      this.specialKeysHandle('Enter');
    }
    if (this.span.node.dataset.key === 'CapsLock') {
      this.span.node.classList.toggle('span-active');
    }
  }

  keyPrint(start, end, node = this.iDown.node) {
    if (specialKeys.indexOf(this.span.node.dataset.key) < 0) {
      const cursorPosition = this.currentTextArea.node.selectionStart;
      this.currentTextArea.node.value = this.currentTextArea.node.value.substring(0, start)
        + node.innerText + this.currentTextArea.node.value.substring(end);
      this.currentTextArea.node.selectionEnd = cursorPosition + 1;
    }
  }

  specialKeysHandle(key) {
    const cursorPosition = this.currentTextArea.node.selectionStart;
    const [node] = [this.currentTextArea.node];
    const start = node.selectionStart;
    const end = node.selectionEnd;
    switch (key) {
      case ' ':
        console.log(start);
        console.log(end);
        console.log(node.value.substring(0, start));
        console.log(node.value.substring(end));
        node.value = `${node.value.substring(0, start)} ${node.value.substring(start)}`;
        node.selectionEnd = cursorPosition + 1;
        break;
      case 'Delete':
        node.value = node.value.substring(0, start) + node.value.substring(start + 1);
        node.selectionEnd = cursorPosition;
        break;
      case 'Backspace':
        node.value = node.value.substring(0, start - 1) + node.value.substring(end);
        node.selectionEnd = cursorPosition - 1;
        break;
      case 'Enter':
        node.value = `${node.value.substring(0, start)}\n${node.value.substring(end)}`;
        node.selectionEnd = cursorPosition + 1;
        break;
      case 'Tab':
        node.value = `${node.value.substring(0, start)}\t${node.value.substring(end)}`;
        node.selectionEnd = cursorPosition + 1;
        break;
      default:
        console.log('Нет таких значений');
    }
  }

  arrowHandle() {
    console.log('arrowHandle');
  }
}
export default Key;
