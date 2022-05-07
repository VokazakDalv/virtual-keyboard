import Control from './Control.js';

class Key extends Control {
  constructor(parentNode, up = '', down = '') {
    super();
    const span = new Control(parentNode, 'span');
    span.node.dataset.key = down;
    span.node.addEventListener('mousedown', () => {
      span.node.addEventListener('mouseout', () => {
        span.node.classList.remove('span-click');
      });
      span.node.classList.add('span-click');
      if (span.node.dataset.key === 'Tab') {
        // console.log('Tab');
      }
    });
    span.node.addEventListener('mouseup', (event) => {
      event.currentTarget.classList.remove('span-click');
    });
    if (down === 'Backspace'
      || down === 'Enter'
      || down === 'Shift'
      || down === 'CapsLock'
    ) {
      span.node.classList.add('big');
    }
    if (down === 'Space') {
      span.node.classList.add('space');
    }
    if (down === 'Crtl') {
      span.node.classList.add('ctrl');
    }
    const iUp = new Control(span.node, 'i', 'up');
    const iDown = new Control(span.node, 'i', 'down');
    iUp.node.innerText = up;
    iDown.node.innerText = (down !== 'Space') ? down : '';
  }
}

export default Key;
