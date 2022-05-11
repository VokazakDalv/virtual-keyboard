class Control {
  constructor(parentNode, tagName = 'div', className = '', content = '') {
    this.node = document.createElement(tagName);
    this.node.className = className;
    this.node.textContent = content;

    if (parentNode) {
      parentNode.append(this.node);
    }
  }

  destroy() {
    this.node.remove();
  }
}

export default Control;
