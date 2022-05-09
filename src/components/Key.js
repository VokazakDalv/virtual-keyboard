import Control from './Control.js';
import { specialKeys } from '../data/key-array.js';

class Key {
  constructor(parentNode, up = '', down = '', textArea = '') {
    this.currentTextArea = textArea;
    this.span = new Control(parentNode, 'span');
    this.span.node.dataset.key = down;
    this.span.node.addEventListener('mousedown', this.mouseDownHandle.bind(this));
    this.span.node.addEventListener('mouseup', (event) => {
      event.currentTarget.classList.remove('span-click');
    });
    if (down === 'Backspace'
      || down === 'Enter'
      || down === 'Shift'
      || down === 'CapsLock'
    ) {
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

    if (specialKeys.indexOf(this.span.node.dataset.key) < 0) {
      const cursorPosition = this.currentTextArea.node.selectionStart;
      this.currentTextArea.node.value = this.currentTextArea.node.value.substring(0, start)
        + this.iDown.node.innerText + this.currentTextArea.node.value.substring(end);
      this.currentTextArea.node.selectionEnd = cursorPosition + 1;
    }
    if (this.span.node.dataset.key === 'Space') {
      const cursorPosition = this.currentTextArea.node.selectionStart;
      this.currentTextArea.node.value = `${this.currentTextArea.node.value.substring(0, start)
      } ${this.currentTextArea.node.value.substring(end)}`;
      this.currentTextArea.node.selectionEnd = cursorPosition + 1;
    }

    this.span.node.addEventListener('mouseout', () => {
      this.span.node.classList.remove('span-click');
    });
    this.span.node.classList.add('span-click');

    if (this.span.node.dataset.key === 'Backspace') {
      this.backSpaceHandle(start, end);
    }
    if (this.span.node.dataset.key === 'Del') {
      this.delHandle(start);
    }
    if (this.span.node.dataset.key === 'Tab') {
      const cursorPosition = this.currentTextArea.node.selectionStart;
      this.currentTextArea.node.value = `${this.currentTextArea.node.value.substring(0, start)
      }\t${this.currentTextArea.node.value.substring(end)}`;
      this.currentTextArea.node.selectionEnd = cursorPosition + 1;
    }
    if (this.span.node.dataset.key === 'Enter') {
      const cursorPosition = this.currentTextArea.node.selectionStart;
      this.currentTextArea.node.value = `${this.currentTextArea.node.value.substring(0, start)
      }\n${this.currentTextArea.node.value.substring(end)}`;
      this.currentTextArea.node.selectionEnd = cursorPosition + 1;
    }
    if (this.span.node.dataset.key === 'CapsLock') {
      this.span.node.classList.toggle('span-active');
    }
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
}
export default Key;
