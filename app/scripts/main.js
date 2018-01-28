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
    this.canSpin = true;
    this.currentCircle = 0;
    this.currentAngle = 0;
    this.numberOfCircles = 6;
    this.smallCirles = document.querySelectorAll('.wheel-circle');

    this.mainCircle = document.querySelector('.main-circle');
    this.outerCircle = document.querySelector('.outer-circle');
  }
  addEventListeners() {
    this.smallCirles[0].addEventListener('mousedown', () => { this.circleRotate(0); });
    this.smallCirles[1].addEventListener('mousedown', () => { this.circleRotate(1); });
    this.smallCirles[2].addEventListener('mousedown', () => { this.circleRotate(2); });
    this.smallCirles[3].addEventListener('mousedown', () => { this.circleRotate(3); });
    this.smallCirles[4].addEventListener('mousedown', () => { this.circleRotate(4); });
    this.smallCirles[5].addEventListener('mousedown', () => { this.circleRotate(5); });
  }
  circleRotate(_circleNumber) {
    if ( !this.canSpin ) { return; }
    this.canSpin = false;

    this.currentAngle = 360 * _circleNumber / this.numberOfCircles;
    if ( this.currentCircle >= _circleNumber ) {
      TweenMax.to(this.outerCircle, 1, { rotation: this.currentAngle + 360, onComplete: () =>{
        TweenMax.set(this.outerCircle, { rotation: this.currentAngle })
        this.canSpin = true;
      }});
    }
    else{
      TweenMax.to(this.outerCircle, 1, { rotation: this.currentAngle, onComplete: ()=>{
        this.canSpin = true;
      }})
    }
    
    this.currentCircle = _circleNumber;
  }
  init() {
    this.addEventListeners();
  }
}
