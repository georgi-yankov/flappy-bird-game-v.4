class Block {
  constructor(id, hole_yPos) {
    this.id = id;
    this.hole_yPos = hole_yPos;
  }

  draw() {
    const block = document.createElement('div');
    const hole = document.createElement('div');

    block.setAttribute('id', 'block-' + this.id);
    hole.setAttribute('id', 'hole-' + this.id);

    block.classList.add('block');
    hole.classList.add('hole');

    hole.style.top = this.hole_yPos + 'px';

    const documentFragment = document.createDocumentFragment();
    documentFragment.appendChild(block);
    documentFragment.appendChild(hole);

    return documentFragment;
  }

  move() {
    let hole = document.getElementById('hole-' + this.id);
    let block = document.getElementById('block-' + this.id);
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    let blockWidth = parseInt(window.getComputedStyle(block).getPropertyValue("width"));

    let blockInterval = setInterval(() => {
      if(blockLeft > -blockWidth) {
        blockLeft -= 2;
        block.style.left = blockLeft + 'px';    
        hole.style.left = blockLeft + 'px';    
      } else {
        clearInterval(blockInterval);
        block.remove();
        hole.remove();
      }
    }, 20);
  }
}

export { Block };