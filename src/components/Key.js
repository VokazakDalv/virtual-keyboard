import Control from './Control.js';
import { specialKeys } from '../data/key-array.js';

class Key {
  constructor(parentNode, keyData, up = '', down = '', textArea = '') {
    this.currentTextArea = textArea;
    this.span = new Control(parentNode, 'span');
    this.span.node.dataset.key = keyData;
    this.span.node.addEventListener('mousedown', this.mouseDownHandle.bind(this));
    this.span.node.addEventListener('mouseup', () => {
      this.span.node.classList.remove('span-click');
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
    const datasetKey = this.span.node.dataset.key;
    event.preventDefault();
    this.currentTextArea.node.focus();
    this.keyPrint();
    this.span.node.addEventListener('mouseout', () => {
      this.span.node.classList.remove('span-click');
    });
    this.span.node.classList.add('span-click');
    if (datasetKey === 'CapsLock') {
      this.span.node.classList.toggle('span-active');
    } else {
      this.specialKeysHandle(datasetKey);
    }
  }

  keyPrint() {
    const [node] = [this.currentTextArea.node];
    const start = node.selectionStart;
    const end = node.selectionEnd;
    if (specialKeys.indexOf(this.span.node.dataset.key) < 0) {
      const cursorPosition = node.selectionStart;
      node.value = node.value.substring(0, start)
        + this.iDown.node.innerText + node.value.substring(end);
      node.selectionEnd = cursorPosition + 1;
    }
  }

  specialKeysHandle(key) {
    const [node] = [this.currentTextArea.node];
    const start = node.selectionStart;
    const end = node.selectionEnd;
    const cursorPosition = node.selectionStart;
    switch (key) {
      case ' ':
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
    }
  }
}
export default Key;
