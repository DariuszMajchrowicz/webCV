// ======= Skills.JS =======
console.log('Skills is loaded');

class Skills {
  constructor() {
    // == Setings ==
    this.animationTime = 0.35;
    this.showTimeoutTime = 100;
    this.introTime = 0.7;

    // == Elements ==
    this.skillsSection = document.querySelector('#skills');
    this.skills = document.querySelectorAll('#skills .skill-box');
    this.logoBoxes = document.querySelectorAll('#skills .skill-logo-box');
    this.descBox = document.querySelectorAll('#skills .desc-box');
    this.descLines = document.querySelectorAll('#skills .desc-box .desc-line');
    this.skillLogo = document.querySelectorAll('#skills .skill-logo-box .skill-logo');
    
    this.showAllBtn = document.querySelector('#skills .show-all-btn');

    // == Variables ==
    this.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
    this.windowSize = this.windowWidth < 1250 ? 'mobile' : 'desktop';
    this.boxInFirstRow = document.querySelectorAll('#skills .flex-box-top .skill-logo-box').length;
    this.descriptionOpenedArray = [];
    this.isShowedAll = false;

    for (let i = 0; i < this.logoBoxes.length; i++) {
      this.descriptionOpenedArray[i] = false;
    }
    this.showTimeout = null;
    this.animationOrderArray = [0, 5, 1, 6, 2, 7, 3, 8, 4];

    // ==== Canvas ====
    this.canvas = document.querySelector('#skills #skillCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.boxX = [];
    this.boxY = [];

  }

  drawCanvas(){
    let xCorrection =  1920 / this.canvas.clientWidth;
    let yCorrection = 1080 / this.canvas.clientHeight;

    for (let i = 0; i < this.logoBoxes.length; i++) {
      this.boxX[i] = (this.logoBoxes[i].getBoundingClientRect().left + 50) * xCorrection;
      this.boxY[i] = (this.logoBoxes[i].getBoundingClientRect().top - 
        this.skillsSection.getBoundingClientRect().top  + 50) * yCorrection;
    }

    
    this.skillsSection.addEventListener('mousemove', (event) => {
      this.ctx.clearRect(0, 0, 1920, 1080);
      this.drawLinesBetween();
      console.log(event.clientX, event.clientY - this.skillsSection.getBoundingClientRect().top);
      this.drawLinesToMouse(event.clientX, event.clientY - this.skillsSection.getBoundingClientRect().top);
    })

  }

  drawLinesBetween(){
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 1;

    this.ctx.beginPath();
    this.ctx.moveTo(0, 400);
    this.ctx.lineTo(this.boxX[0], this.boxY[0]);
    this.ctx.lineTo(this.boxX[1], this.boxY[1]);
    this.ctx.lineTo(this.boxX[5], this.boxY[5]);
    this.ctx.lineTo(this.boxX[6], this.boxY[6]);
    this.ctx.lineTo(this.boxX[2], this.boxY[2]);
    this.ctx.lineTo(this.boxX[7], this.boxY[7]);
    this.ctx.lineTo(this.boxX[3], this.boxY[3]);
    this.ctx.lineTo(this.boxX[4], this.boxY[4]);
    this.ctx.lineTo(this.boxX[8], this.boxY[8]);
    this.ctx.lineTo(1920, 600);
    this.ctx.stroke();
  }

  drawLinesToMouse(x, y) {
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 0.5;

    let xCorrection = 1920 / this.canvas.clientWidth;
    let yCorrection = 1080 / this.canvas.clientHeight;

    requestAnimationFrame(()=>{
      for (let i = 0; i < this.boxX.length; i = i + 2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x * xCorrection, y * yCorrection);
        this.ctx.lineTo(this.boxX[i], this.boxY[i]);
        this.ctx.stroke();
      }
    })
  }


  addEventListeners() {
    for (let i = 0; i < this.logoBoxes.length; i++) {
      this.logoBoxes[i].addEventListener('mouseover', () => { this.showDescription(i); });
      this.logoBoxes[i].addEventListener('mouseout', () => { this.hideDescription(i); });
      this.logoBoxes[i].addEventListener('mousedown', () => { this.toggleDescription(i); });
    }
    this.showAllBtn.addEventListener('mousedown', () => { this.showAll(); });
  }

  showDescription(_boxNumber) {
    let verticalTranslation = (_boxNumber >= this.boxInFirstRow ? '120%' : '-120%');
    let horizontalTranslation = '-50%';
    if ( this.windowWidth < 1250 ) {
      verticalTranslation = '-15%';
      horizontalTranslation = '20%';
    }
  
    TweenMax.to(this.skillLogo[_boxNumber], this.animationTime, { scale: 1, opacity: 1 });
    this.skillLogo[_boxNumber].style.transition = 'filter ' + this.animationTime + 's';
    this.skillLogo[_boxNumber].style.filter = 'none';
    this.logoBoxes[_boxNumber].classList.add('active');
    
    TweenMax.to(this.descBox[_boxNumber], this.animationTime, { y: verticalTranslation, x: horizontalTranslation, opacity: 1, delay: this.animationTime/3 });
    TweenMax.to(this.descLines[_boxNumber], this.animationTime / 2, { width: '80%', delay: this.animationTime / 2 });
  }

  hideDescription(_boxNumber) {
    if ( this.descriptionOpenedArray[_boxNumber] ) { return; }
    if ( this.windowSize == 'mobile') { return; }
    
    let verticalTranslation = (_boxNumber >= this.boxInFirstRow ? '50%' : '-50%');
    let horizontalTranslation = '-50%';
    if (this.windowWidth < 1250) {
      verticalTranslation = '-15%';
      horizontalTranslation = '-75%';
    }
    
    TweenMax.to(this.skillLogo[_boxNumber], this.animationTime, { scale: 0.8, opacity: 0.6 });
    this.skillLogo[_boxNumber].style.filter = 'grayscale(100%)';
    this.logoBoxes[_boxNumber].classList.remove('active');
    
    TweenMax.to(this.descLines[_boxNumber], this.animationTime / 2, { width: '0%', delay: this.animationTime / 2 });
    TweenMax.to(this.descBox[_boxNumber], this.animationTime, { y: verticalTranslation, x: horizontalTranslation, opacity: 0, delay: this.animationTime / 3 });
  }
  
  toggleDescription(_boxNumber) {
    if (this.descriptionOpenedArray[_boxNumber]) {
      this.descriptionOpenedArray[_boxNumber] = false;
    }
    else{
      this.descriptionOpenedArray[_boxNumber] = true;
    }
    this.allElementsAreShowHide(true);
    this.allElementsAreShowHide(false);
  }
  
  showAll(){
    if (this.isShowedAll) {
      this.hideOneTimeout(8);
      this.showAllBtn.innerHTML = 'SHOW ALL';
      this.isShowedAll = false;
    }
    else{
      this.showOneTimeout(0);
      this.showAllBtn.innerHTML = 'HIDE ALL';
      this.isShowedAll = true;
    }
  }

  showOneTimeout(_numb) {
    clearTimeout(this.showTimeout);
    if (_numb == this.logoBoxes.length) { return; }

    if (!this.descriptionOpenedArray[this.animationOrderArray[_numb]]) {
      this.descriptionOpenedArray[this.animationOrderArray[_numb]] = true;
      this.showDescription(this.animationOrderArray[_numb]);

      this.showTimeout = setTimeout(() => { this.showOneTimeout(_numb + 1); }, this.showTimeoutTime);
    }
    else{
      this.showOneTimeout(_numb + 1);
    }
  }

  hideOneTimeout(_numb) {
    clearTimeout(this.showTimeout);
    if (_numb == -1) { return; }
    
    this.descriptionOpenedArray[this.animationOrderArray[_numb]] = false;
    this.hideDescription(this.animationOrderArray[_numb]);

    this.showTimeout = setTimeout(() => { this.hideOneTimeout(_numb - 1); }, this.showTimeoutTime);
  }

  allElementsAreShowHide(_bool){
    for (let i = 0; i < this.descriptionOpenedArray.length; i++) {

      if (this.descriptionOpenedArray[i] != _bool) {
        return;
      }
    }
    this.showAll();
  }
  intro() {
    TweenMax.to(this.skills[0], this.introTime, { x: 0, y: 0, ease: Back.easeOut.config(1), delay: 0 });
    TweenMax.to(this.skills[5], this.introTime, { x: 0, y: 0, ease: Back.easeOut.config(1), delay: 0.1 });
    TweenMax.to(this.skills[1], this.introTime, { x: 0, y: 0, ease: Back.easeOut.config(1), delay: 0.2 });
    TweenMax.to(this.skills[6], this.introTime, { x: 0, y: 0, ease: Back.easeOut.config(1), delay: 0.3 });
    TweenMax.to(this.skills[2], this.introTime, { x: 0, y: 0, ease: Back.easeOut.config(1), delay: 0.4 });
    TweenMax.to(this.skills[3], this.introTime, { x: 0, y: 0, ease: Back.easeOut.config(1), delay: 0.6 });
    TweenMax.to(this.skills[8], this.introTime, { x: 0, y: 0, ease: Back.easeOut.config(1), delay: 0.7 });
    TweenMax.to(this.skills[4], this.introTime, { x: 0, y: 0, ease: Back.easeOut.config(1), delay: 0.8 });
    
    TweenMax.to(this.skills[7], this.introTime, { x: '-100%', y: '-200%', ease: Back.easeOut.config(1), delay: 0.5 });
    TweenMax.to(this.skills[7], 0.1, { x: -10, ease: Back.easeOut.config(5), delay: 0.5 + this.introTime, yoyo: true, repeat: 3 });
    TweenMax.to(this.skills[8], this.introTime / 2, { x: '-150%', y: '-180%', ease: Back.easeOut.config(1), delay: 0.7 + this.introTime, onComplete: ()=>{
      TweenMax.to(this.skills[8], this.introTime / 3, { x: '0%', y: '0%', ease: Back.easeOut.config(1) });
      TweenMax.to(this.skills[7], this.introTime / 3, { x: '0%', y: '0%', ease: Back.easeOut.config(1), delay: 0.1,});
      if ( this.windowSize == 'mobile' ) { this.showAll(); }
    } });
  }

  paralaxOne(numb){
    this.skillsSection.addEventListener('mousemove', (event)=>{

      let x = (event.clientX - this.logoBoxes[numb].getBoundingClientRect().left - 50) / this.windowWidth;
      let y = (event.clientY - this.logoBoxes[numb].getBoundingClientRect().top - 50) / this.windowHeight;

      x = x * 30;
      y = -y * 30;
      TweenMax.to(this.logoBoxes[numb], 0.1, { rotationY: x + 'deg', rotationX: y + 'deg'})
      TweenMax.to(this.skillLogo[numb], 0.1, { rotationY: x + 'deg', rotationX: y + 'deg', x: x, y: -y })
      TweenMax.to(this.canvas, 0.1, { rotationY: x/2 + 'deg', rotationX: y/2 + 'deg', x: x, y: -y })
    })
  }
  paralax(){
    for (let i = 0; i < this.logoBoxes.length; i++) {
      this.paralaxOne(i);
    }
  }

  resizeCorrection() {
    window.addEventListener('resize', ()=>{
      this.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      this.windowSize = this.windowWidth < 1250 ? 'mobile' : 'desktop';
      this.isShowedAll = true;
      this.showAll();
      setTimeout(()=>{
        this.isShowedAll = false;
        this.showAll();
      }, 1000);
    });
  }

  setPositionBeforeIntro() {
    TweenMax.set(this.skills[0], { x: -this.windowWidth * 0.7, y: -400 });
    TweenMax.set(this.skills[1], { x: -this.windowWidth * 0.7, y: -200 });
    TweenMax.set(this.skills[2], { x: -this.windowWidth * 0.7, y: 0 });
    TweenMax.set(this.skills[5], { x: -this.windowWidth * 0.7, y: 200 });
    TweenMax.set(this.skills[6], { x: -this.windowWidth * 0.7, y: 400 });
  
    TweenMax.set(this.skills[3], { x: this.windowWidth * 0.7, y: -300 });
    TweenMax.set(this.skills[4], { x: this.windowWidth * 0.7, y: -100 });
    TweenMax.set(this.skills[7], { x: this.windowWidth * 0.7, y: 100 });
    TweenMax.set(this.skills[8], { x: this.windowWidth * 0.7, y: 300 });
  }


  init() {
    this.addEventListeners();
    this.resizeCorrection();
    this.paralax();
    this.drawCanvas();
  }
}