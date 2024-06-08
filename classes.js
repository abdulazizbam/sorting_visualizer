class listVisualizer {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.list = [];
    this.listDrawn = false;
    this.isDrawing = false;
    this.animationList = [];
    this.currentAnimation = null;
    this.margin = 1;
    this.activeInterval = null;
    this.stop = false;
  }

  isStop() {
    return this.stop;
  }

  setStop(bool){
    this.stop = bool
  }


  stopAnimation() {
    if (!this.activeInterval) return;
    clearInterval(this.activeInterval);
    this.activeInterval = null;
    this.stop = false;
  }

  getBarWidth() {
    return Math.floor(this.canvas.width / this.list.length) - this.margin;
  }

  getY(i) {
    return this.canvas.height - this.list[i];
  }

  getX(i) {
    return i * this.getBarWidth() + i * this.margin;
  }

  getListLength() {
    return this.list.length;
  }

  populateList() {
    this.list = [];
    for (let i = 0; i < 300; i++) {
      this.list.push(Math.floor(Math.random() * (200 - 50) + 50));
    }
  }

  drawList() {
    if (this.list.length < 2) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const barWidth = this.getBarWidth();
    for (let i = 0; i < this.list.length; i++) {
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(
        i * barWidth + i * this.margin,
        this.canvas.height - this.list[i],
        barWidth,
        this.list[i]
      );
      this.ctx.fillStyle = "white";
      this.ctx.fillText(
        `${this.list[i]}`,
        i * barWidth + i * this.margin,
        this.getY(i)
      );
    }
  }

  highlight(i, color = "yellow") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      this.getX(i),
      this.getY(i),
      this.getBarWidth(),
      this.list[i]
    );
  }

  async sweep() {
    return new Promise((resolve, reject) => {
      let i = 0;
      if (this.activeInterval) clearInterval(this.activeInterval);
      this.activeInterval = setInterval(() => {
        if (this.stop) {
          this.stopAnimation();
          this.drawList();
          resolve();
        }

        if (i === this.list.length) {
          this.drawList();
          clearInterval(this.activeInterval);
          resolve();
        }
        this.drawList();
        this.highlight(i);
        i++;
      }, 1000 / 60);
    });
  }

  async sweepBack() {
    return new Promise((resolve, reject) => {
      let i = this.list.length - 1;
      if (this.activeInterval) clearInterval(this.activeInterval);
      this.activeInterval = setInterval(() => {
        if (this.stop) {
          this.stopAnimation();
          this.drawList();
          resolve();
        }

        if (i === -1) {
          this.drawList();
          clearInterval(this.activeInterval);
          resolve();
        }
        this.drawList();
        this.highlight(i, "blue");
        i--;
      }, 1000 / 60);
    });
  }

  async move(i, j) {
    return new Promise((resolve, reject) => {
      const initialI = i;
      const initialY = this.getY(i);
      const initialX = this.getX(i);
      const interval = setInterval(() => {
        this.drawList();
        this.ctx.clearRect(
          initialX,
          initialY,
          this.getBarWidth(),
          this.list[initialI]
        );

        i > j ? i-- : i++;
        const newX = this.getX(i);
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(
          newX,
          initialY,
          this.getBarWidth(),
          this.list[initialI]
        );
        if (newX === this.getX(j)) {
          clearInterval(interval);
          this.list[initialI] = this.list[j];
          this.list[j] = initialI;
          resolve();
        }
      }, 1000 / 60);
    });
  }

  async swap(i, j) {
    return new Promise((resolve, reject) => {
      const initialI = i;
      const initialJ = j;
      const initialIY = this.getY(i);
      const initialJY = this.getY(j);
      const initialIX = this.getX(i);
      const initialJX = this.getX(j);
      if (this.activeInterval) clearInterval(this.activeInterval);
      this.activeInterval = setInterval(() => {
        if (this.stop) {
          this.stopAnimation();
          this.drawList();
          resolve();
        }

        this.drawList();
        this.highlight(initialI);
        this.highlight(initialJ);

        if (this.getX(i) !== this.getX(initialJ)) {
          i > initialJ ? i-- : i++;
          const newX = this.getX(i);
          this.ctx.fillStyle = "green";
          this.ctx.fillRect(
            newX,
            initialIY,
            this.getBarWidth(),
            this.list[initialI]
          );
        } else {
          this.ctx.clearRect(
            initialJX,
            initialJY,
            this.getBarWidth(),
            this.list[initialJ]
          );
        }

        if (this.getX(j) !== this.getX(initialI)) {
          j > initialI ? j-- : j++;
          const newX = this.getX(j);
          this.ctx.fillStyle = "blue";
          this.ctx.fillRect(
            newX,
            initialJY,
            this.getBarWidth(),
            this.list[initialJ]
          );
        } else {
          this.ctx.clearRect(
            initialIX,
            initialIY,
            this.getBarWidth(),
            this.list[initialI]
          );
        }

        if (
          this.getX(i) === this.getX(initialJ) ||
          this.getX(j) === this.getX(initialI)
        ) {
          clearInterval(this.activeInterval);
          const temp = this.list[initialI];
          this.list[initialI] = this.list[initialJ];
          this.list[initialJ] = temp;
          this.drawList();
          resolve();
        }
      }, 1);
    });
  }

  clearList() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.list = [];
  }
}

