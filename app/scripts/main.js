console.log('Script is loaded');

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    console.log('%c Document is ready', 'color: #42dcf4');
    let wheel = new Wheel();
    wheel.init();
  }
};

// ======= Wheel.JS =======

class Wheel {
  constructor() {
    this.mainCircle = document.querySelector('.main-circle');
    this.outerCircle = document.querySelector('.outer-circle');
  }
  addEventListeners() {
    this.mainCircle.addEventListeners('mousedown', () => {
      console.log('%c Whell is ready', 'color: #42dcf4');
      this.outerCircleRotate();
    });
  }
  outerCircleRotate() {
    TweenMax.to(this.outerCircle, 3, { rotation: '360deg' });
  }
  init() {
    console.log('%c Whell is ready', 'color: #42dcf4');
  }
}
