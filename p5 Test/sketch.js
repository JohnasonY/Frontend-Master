const sketch = (p) => {
  class DraggableRect {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.dragging = false;
      this.offsetX = 0;
      this.offsetY = 0;
    }

    draw() {
      p.rect(this.x, this.y, this.w, this.h);
    }

    isMouseOver() {
      return (
        p.mouseX > this.x &&
        p.mouseX < this.x + this.w &&
        p.mouseY > this.y &&
        p.mouseY < this.y + this.h
      );
    }

    pressed() {
      if (this.isMouseOver()) {
        this.dragging = true;
        this.offsetX = p.mouseX - this.x;
        this.offsetY = p.mouseY - this.y;
      }
    }

    dragged() {
      if (this.dragging) {
        this.x = p.mouseX - this.offsetX;
        this.y = p.mouseY - this.offsetY;
      }
    }

    released() {
      this.dragging = false;
    }
  }

  let item;

  p.setup = () => {
    p.createCanvas(600, 400);
    item = new DraggableRect(200, 150, 120, 80);
  };

  p.draw = () => {
    p.background(230);
    item.draw();
  };

  p.mousePressed = () => {
    item.pressed();
  };

  p.mouseDragged = () => {
    item.dragged();
  };

  p.mouseReleased = () => {
    item.released();
  };
};

new p5(sketch);
