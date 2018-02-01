// ======= Boxes.JS =======
console.log('Boxes is loaded');

class Boxes {
  constructor() {
    // == Setings ==
    this.animationTime = 0.5;

    // == Variables ==
    this.openedBoxArray = [];

    // == Elements ==
    this.boxes = document.querySelectorAll('#boxes .box');
    this.boxEventArea = document.querySelectorAll('#boxes .box-event-area');

    this.leftSideOfBox = document.querySelectorAll('#boxes .box .translation-box-left');
    this.rightSideOfBox = document.querySelectorAll('#boxes .box .translation-box-right');

    this.leftText = document.querySelectorAll('#boxes .box .translation-box-left .box-title');
    this.righText = document.querySelectorAll('#boxes .box .translation-box-right .box-title');

    this.mainTitles = document.querySelectorAll('#boxes .box .main-title');
    this.closeBtns = document.querySelectorAll('#boxes .box .close-box-btn');
  }

  addEventListeners() {
    for (let i = 0; i < this.boxes.length; i++) {
      this.boxEventArea[i].addEventListener('mouseover', () => { this.peekBox(i); });
      this.boxEventArea[i].addEventListener('mousedown', () => { this.openBox(i); });
      this.boxEventArea[i].addEventListener('mouseout', () => { this.closeBox(i); });
      this.closeBtns[i].addEventListener('mousedown', () => { 
        this.openedBoxArray[i] = false;
        this.closeBox(i); 
      });
    }
  }

  openBox(_boxNumber) {
    TweenMax.to(this.leftSideOfBox[_boxNumber], this.animationTime, { x: '-75%' });
    TweenMax.to(this.rightSideOfBox[_boxNumber], this.animationTime, { x: '75%' });

    TweenMax.set([this.leftText[_boxNumber], this.righText[_boxNumber]], { opacity: 1 });
    TweenMax.set(this.mainTitles[_boxNumber], { opacity: 0 });

    this.boxEventArea[_boxNumber].style.display = 'none';
    this.openedBoxArray[_boxNumber] = true;
  }

  peekBox(_boxNumber) {
    if (this.openedBoxArray[_boxNumber]) { return; }
    TweenMax.to(this.leftSideOfBox[_boxNumber], this.animationTime, { x: '-5%' });
    TweenMax.to(this.rightSideOfBox[_boxNumber], this.animationTime, { x: '5%' });

    TweenMax.set([this.leftText[_boxNumber], this.righText[_boxNumber]], { opacity: 1 });
    TweenMax.set(this.mainTitles[_boxNumber], { opacity: 0 });
  }

  closeBox(_boxNumber) {
    if (this.openedBoxArray[_boxNumber]) { return; }
    TweenMax.to([this.leftSideOfBox[_boxNumber], this.rightSideOfBox[_boxNumber]], this.animationTime, {
      x: '0%',
      onComplete: () => {
        TweenMax.set([this.leftText[_boxNumber], this.righText[_boxNumber]], { opacity: 0 });
        TweenMax.set(this.mainTitles[_boxNumber], { opacity: 1 });
        this.boxEventArea[_boxNumber].style.display = 'block';
      }
    });

  }

  init() {
    this.addEventListeners();
  }
}