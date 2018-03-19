// ======= Boxes.JS =======
console.log('Boxes is loaded');

class Boxes {
  constructor() {
    // == Setings ==
    this.carouselTime = 5000;
    this.animationTime = 0.5;
    this.introTime = 1;
    this.numberOfBoxes = 5;
    this.rotationArray = [];

    for (let i = 0; i < this.numberOfBoxes; i++) {
      this.rotationArray[i] = (360 / this.numberOfBoxes) * (i);
    }

    // == Variables ==
    this.carouselCanPlay = true;
    this.carouselTimeout = null;
    this.currentBox = 0;
    this.openedBoxArray = [];
    this.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    // == Elements ==
    this.boxes = document.querySelectorAll('#boxes .box');
    this.boxEventArea = document.querySelectorAll('#boxes .box-event-area');

    this.leftSideOfBox = document.querySelectorAll('#boxes .box .translation-box-left');
    this.rightSideOfBox = document.querySelectorAll('#boxes .box .translation-box-right');

    this.leftText = document.querySelectorAll('#boxes .box .translation-box-left .box-title');
    this.righText = document.querySelectorAll('#boxes .box .translation-box-right .box-title');

    this.mainTitles = document.querySelectorAll('#boxes .box .main-title');
    this.closeBtns = document.querySelectorAll('#boxes .box .close-box-btn');

    this.prevBtn = document.querySelector('#boxes .perv-btn');
    this.nextBtn = document.querySelector('#boxes .next-btn');
    this.stopPlayBtn = document.querySelector('#boxes .stop-play-btn');
    this.progressBar = document.querySelector('#boxes .progess-bar');

    this.boxBtns = document.querySelectorAll('#boxes .box-btns-container .box-btn');
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

    this.stopPlayBtn.addEventListener('mousedown', ()=>{
      clearTimeout(this.carouselTimeout);
      this.stopPlayCarousel();
    })
    this.nextBtn.addEventListener('mousedown', () => {
      this.rotateCarousel(1);
    })
    this.prevBtn.addEventListener('mousedown', () => {
      this.rotateCarousel(-1);
    })

    for (let i = 0; i < this.boxBtns.length; i++) {
      this.boxBtns[i].addEventListener('mousedown', () => {
        
        // let x = i - this.currentBox;
        this.rotateCarousel(1, i, true);
      })
    }

  }

  openBox(_boxNumber) {
    TweenMax.to(this.leftSideOfBox[_boxNumber], this.animationTime, { x: '-75%' });
    TweenMax.to(this.rightSideOfBox[_boxNumber], this.animationTime, { x: '75%' });

    TweenMax.set([this.leftText[_boxNumber], this.righText[_boxNumber]], { opacity: 1 });
    TweenMax.set(this.mainTitles[_boxNumber], { opacity: 0 });
    TweenMax.set(this.closeBtns[_boxNumber], { opacity: 1 });


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
    TweenMax.set(this.closeBtns[_boxNumber], { opacity: 0, delay: this.animationTime * 0.65 });

  }

  intro() {
    TweenMax.to(this.boxes[0], this.introTime, { x: 0, y: '0%', rotation: 360, ease: Back.easeOut.config(2) });
    TweenMax.to(this.boxes[1], this.introTime, { x: 0, y: '0%', delay: 0.1, ease: Back.easeOut.config(2) });
    TweenMax.to(this.boxes[2], this.introTime, { x: 0, y: '0%', delay: 0.2, ease: Back.easeOut.config(2) });
    TweenMax.to(this.boxes[3], this.introTime * 2, { y: '0%', ease: Back.easeOut.config(2) });
    TweenMax.to(this.boxes[3], this.introTime * 2, { x: 0, ease: Back.easeOut.config(1)});

  }

  setPositionBeforeIntro() {
    TweenMax.set(this.boxes[0], { x: -this.windowWidth * 0.5, y: '-30%' });
    TweenMax.set(this.boxes[1], { x: this.windowWidth * 0.5, y: '-30%' });
    TweenMax.set(this.boxes[2], { x: -this.windowWidth * 0.5, y: '30%' });
    TweenMax.set(this.boxes[3], { x: this.windowWidth * 0.5, y: '30%' });
  }

  rotateCarousel(numb, numb2, flag){
    clearTimeout(this.carouselTimeout);
    if (flag) { numb = numb2 - this.currentBox; }
    
    let translatonAngle = -(360 / this.numberOfBoxes) * numb;
    
    for (let i = 0; i < this.rotationArray.length; i++) {
      this.boxes[i].style.transitionDuration = '1s';
      
      this.rotationArray[i] = this.rotationArray[i] + translatonAngle;
      this.boxes[i].style.transform = 'rotateY( ' + this.rotationArray[i] + 'deg ) translateZ( 500px )';
    }
    
    this.currentBox = (this.currentBox + numb) % 5;
    // this.currentBox = (this.currentBox + numb) % this.numberOfBoxes;
    
    if (!this.carouselCanPlay) { return; }
    TweenMax.fromTo(this.progressBar, this.carouselTime / 1000, { width: '0%' }, { width: '100%', ease: Power0.easeNone});
    
    this.carouselTimeout = setTimeout(()=>{
      this.rotateCarousel(1);
    }, this.carouselTime);

  }

  stopPlayCarousel(){
    if (this.carouselCanPlay){
      this.carouselCanPlay = false;
      this.stopPlayBtn.style.background = 'green';
      TweenMax.to(this.progressBar, 0.35, { width: '0%' });
    }
    else{
      this.carouselCanPlay = true;
      this.stopPlayBtn.style.background = 'blue';
      this.rotateCarousel(0);
    }
  }

  init() {
    this.addEventListeners();
    this.rotateCarousel(0);
  }
}