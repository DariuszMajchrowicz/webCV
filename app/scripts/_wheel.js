// ======= Wheel.JS =======
console.log('Wheel is loaded');

class Wheel {
  constructor() {

    // == Setings ==
    this.timeoutTime = 2000;
    this.animationTime = 0.7;

    // == Variables ==
    this.isStoped = false;
    this.canSpin = true;
    this.currentCircle = 0;
    this.currentAngle = 0;

    // == Elements ==
    this.smallCirles = document.querySelectorAll('.wheel-circle');
    this.innerCirle = document.querySelector('.inner-circle');
    this.innerCirleIcons = document.querySelectorAll('.inner-circle i');
    this.boxes = document.querySelectorAll('#wheel .box-container .box');
    this.innerBoxes = document.querySelectorAll('#wheel .box-container .box .inner-box');
    this.numberOfCircles = this.smallCirles.length;

    this.mainCircle = document.querySelector('.main-circle');
    this.outerCircle = document.querySelector('.outer-circle');

    // ==== Canvas ====
    this.canvas = document.querySelector('#inner-circle-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.step = 0;
    this.startTime = 0;
    this.rAF = null;

  }
  addEventListeners() {
    for (let i = 0; i < this.smallCirles.length; i++) {
      this.smallCirles[i].addEventListener('mousedown', () => { this.circleRotate(i); });
    }

    this.innerCirle.addEventListener('mousedown', () => { this.stopStart(); });

  }

  circleRotate(_circleNumber) {
    if (!this.canSpin) { return; }
    this.canSpin = false;
    clearTimeout(this.rotationTimeout);
    cancelAnimationFrame(this.rAF);

    this.currentAngle = 360 * _circleNumber / this.numberOfCircles;

    this.moveCircle(_circleNumber);
    this.showBox(_circleNumber);
    this.drawCanvasCounter();

    this.currentCircle = _circleNumber;
    if (this.isStoped) { return; }
    this.rotationTimeoutMethod();
  }

  rotationTimeoutMethod() {
    this.rotationTimeout = setTimeout(() => {
      let nextCircle = (this.currentCircle == (this.numberOfCircles - 1) ? -this.numberOfCircles + 1 : 1);
      this.circleRotate(this.currentCircle + nextCircle);
    }, this.timeoutTime);
  }

  showBox(_newBox) {
    // out
    TweenMax.to(this.boxes[this.currentCircle], this.animationTime / 2, { ease: Power0.easeNone, x: '100%' });

    // in
    TweenMax.to(this.boxes[_newBox], this.animationTime / 2, { ease: Power0.easeNone, x: '5%', delay: 0.35 });
    TweenMax.fromTo(this.innerBoxes[_newBox], this.animationTime / 2, { y: '-100%' }, { y: '0%', delay: this.animationTime });
  }

  moveCircle(_circleNumber) {
    if (this.currentCircle >= _circleNumber) {
      TweenMax.to(this.outerCircle, this.animationTime, {
        rotation: this.currentAngle + 360,
        onComplete: () => {
          TweenMax.set(this.outerCircle, { rotation: this.currentAngle })
          this.canSpin = true;
        }
      });
    }
    else {
      TweenMax.to(this.outerCircle, this.animationTime, {
        rotation: this.currentAngle,
        onComplete: () => {
          this.canSpin = true;
        }
      });
    }
  }

  drawCanvasCounter() {
    this.ctx.clearRect(0, 0, 240, 240);
    this.startTime = Date.now();
    if (this.isStoped) { return; }
    this.rAF = requestAnimationFrame(() => { this.draw(); });
  }

  draw() {

    this.ctx.clearRect(0, 0, 240, 240);
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 7;

    this.ctx.beginPath();
    this.ctx.arc(120, 120, 100, -0.5 * Math.PI, ((this.step + 0.005) * 2 + -0.5) * Math.PI);
    this.ctx.stroke();

    this.step = (Date.now() - this.startTime) / this.timeoutTime;
    if (this.step >= 1.01) {
      cancelAnimationFrame(this.rAF);
      return;
    }

    this.rAF = requestAnimationFrame(() => { this.draw(); });
  }

  stopStart() {
    if (this.isStoped) {
      this.startWheel();
    }
    else {
      this.stopWheel();
    }
  }

  startWheel() {
    TweenMax.to(this.innerCirleIcons[0], 0.35, { opacity: 1 });
    TweenMax.to(this.innerCirleIcons[1], 0.35, { opacity: 0 });
    TweenMax.to(this.canvas, 0.35, { opacity: 1, delay: 0.2 });
    clearTimeout(this.rotationTimeout);
    cancelAnimationFrame(this.rAF);
    this.isStoped = false;
    this.circleRotate(this.currentCircle);
  }

  stopWheel() {
    TweenMax.to(this.innerCirleIcons[0], 0.35, { opacity: 0 });
    TweenMax.to(this.innerCirleIcons[1], 0.35, { opacity: 1 });
    TweenMax.to(this.canvas, 0.35, { opacity: 0, delay: 0.2 });
    clearTimeout(this.rotationTimeout);
    cancelAnimationFrame(this.rAF);
    this.isStoped = true;
    this.drawCanvasCounter();
  }


  init() {
    this.addEventListeners();
    this.circleRotate(0);
  }
}