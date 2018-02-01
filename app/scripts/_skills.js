// ======= Skills.JS =======
console.log('Skills is loaded');

class Skills {
  constructor() {
    // == Setings ==
    this.animationTime = 0.35;
    this.showTimeoutTime = 100;

    // == Elements ==
    this.logoBoxes = document.querySelectorAll('#skills .skill-logo-box');
    this.descBox = document.querySelectorAll('#skills .desc-box');
    this.skillLogo = document.querySelectorAll('#skills .skill-logo-box .skill-logo');
    
    this.showAllBtn = document.querySelector('#skills .show-all-btn');

    // == Variables ==
    this.boxInFirstRow = document.querySelectorAll('#skills .flex-box-top .skill-logo-box').length;
    this.descriptionOpenedArray = [];
    this.isShowedAll = false;

    for (let i = 0; i < this.logoBoxes.length; i++) {
      this.descriptionOpenedArray[i] = false;
    }
    this.showTimeout = null;
    this.animationOrderArray = [0, 5, 1, 6, 2, 7, 3, 8, 4, 9];
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

  init() {
    this.addEventListeners();
  }
}