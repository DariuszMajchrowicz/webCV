// ======= Skills.JS =======
console.log('Skills is loaded');

class Skills {
  constructor() {
    // == Setings ==
    this.animationTime = 0.35;
    this.showTimeoutTime = 100;
    this.introTime = 0.7;

    // == Elements ==
    this.skills = document.querySelectorAll('#skills .skill-box');
    this.logoBoxes = document.querySelectorAll('#skills .skill-logo-box');
    this.descBox = document.querySelectorAll('#skills .desc-box');
    this.skillLogo = document.querySelectorAll('#skills .skill-logo-box .skill-logo');
    
    this.showAllBtn = document.querySelector('#skills .show-all-btn');

    // == Variables ==
    this.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.boxInFirstRow = document.querySelectorAll('#skills .flex-box-top .skill-logo-box').length;
    this.descriptionOpenedArray = [];
    this.isShowedAll = false;

    for (let i = 0; i < this.logoBoxes.length; i++) {
      this.descriptionOpenedArray[i] = false;
    }
    this.showTimeout = null;
    this.animationOrderArray = [0, 5, 1, 6, 2, 7, 3, 8, 4];
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
  
    TweenMax.to(this.skillLogo[_boxNumber], this.animationTime, { scale: 1, opacity: 1 });
    this.skillLogo[_boxNumber].style.transition = 'filter ' + this.animationTime + 's';
    this.skillLogo[_boxNumber].style.filter = 'none';

    TweenMax.to(this.descBox[_boxNumber], this.animationTime, { y: verticalTranslation, opacity: 1, delay: this.animationTime/3 });
  }

  hideDescription(_boxNumber) {
    if ( this.descriptionOpenedArray[_boxNumber] ) { return; }
    
    let verticalTranslation = (_boxNumber >= this.boxInFirstRow ? '50%' : '-50%');
    
    TweenMax.to(this.skillLogo[_boxNumber], this.animationTime, { scale: 0.8, opacity: 0.6 });
    this.skillLogo[_boxNumber].style.filter = 'grayscale(100%)';
    
    TweenMax.to(this.descBox[_boxNumber], this.animationTime, { y: verticalTranslation, opacity: 0, delay: this.animationTime / 3 });
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
    console.log('skills intro1');
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
      TweenMax.to(this.skills[7], this.introTime / 3, { x: '0%', y: '0%', ease: Back.easeOut.config(1), delay: 0.1 });
    } });
  
  } 

  init() {
    TweenMax.set(this.skills[0], { x: -this.windowWidth * 0.7, y: -400 });
    TweenMax.set(this.skills[1], { x: -this.windowWidth * 0.7, y: -200 });
    TweenMax.set(this.skills[2], { x: -this.windowWidth * 0.7, y: 0 });
    TweenMax.set(this.skills[5], { x: -this.windowWidth * 0.7, y: 200 });
    TweenMax.set(this.skills[6], { x: -this.windowWidth * 0.7, y: 400 });

    TweenMax.set(this.skills[3], { x: this.windowWidth * 0.7, y: -300 });
    TweenMax.set(this.skills[4], { x: this.windowWidth * 0.7, y: -100 });
    TweenMax.set(this.skills[7], { x: this.windowWidth * 0.7, y: 100 });
    TweenMax.set(this.skills[8], { x: this.windowWidth * 0.7, y: 300 });
    this.addEventListeners();
  }
}