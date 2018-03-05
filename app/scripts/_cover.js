// ======= Cover.JS =======
console.log('Cover is loaded');

class Cover {
    constructor() {
        // == Setings ==
        this.animationPartialsTime = 0.5;
        this.codeTime = 4;
        this.introTime = 0.5;
        window.coverStage = true;

        // == Variables ==
        this.outroIsPlayed = false;
        this.introTimeline = null;
        this.openedBoxArray = [];
        this.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        // == Elements ==
        this.cover = document.querySelector('#cover');
        this.coverBg = document.querySelector('#cover .bg');
        this.loadingBox = document.querySelector('#cover .loading-box');
        this.skipBox = document.querySelector('#cover .skip');
        this.skipIcon = document.querySelector('#cover .skip .scroll-icon');
        this.skipText = document.querySelector('#cover .skip .text-box');
        this.skipTextDots = document.querySelectorAll('#cover .skip .text-box .dot');
        this.circleOrnament = document.querySelector('#cover .circle-ornament');

        this.codeMainBoxes = document.querySelectorAll('#cover .code-main-block');
        this.codeBoxes = document.querySelectorAll('#cover .code-block pre');
        this.loadingTexts = document.querySelectorAll('#cover .loading-txt');
        this.loadingText1Dots = document.querySelectorAll('#cover .loading-txt1 .dot');
        this.loadingText2Dots = document.querySelectorAll('#cover .loading-txt2 .dot');
        this.loadingText3Dots = document.querySelectorAll('#cover .loading-txt3 .dot');
        this.loadingText4Dots = document.querySelectorAll('#cover .loading-txt4 .dot');
        this.loadingText5Dots = document.querySelectorAll('#cover .loading-txt5 .dot');

        this.boxes = document.querySelectorAll('#cover .box');
        this.circles = document.querySelectorAll('#cover .circle');
        this.wheel = document.querySelectorAll('#cover .wheel');

        this.navigationBox = document.querySelector('#navigation .hover-box');
        this.navigationCircle = document.querySelector('#navigation .circle');

        this.outroLeft = document.querySelectorAll('#cover .left');
        this.outroRight = document.querySelectorAll('#cover .right');
    }

    intro() {
       this.introTimeline = new TimelineMax({
            delay: 0.5
        });

        this.introTimeline.to(this.loadingBox, this.animationPartialsTime, {
            scale: 1, ease: Back.easeOut.config(1.7), onComplete: () => {
                this.circleOrnament.classList.add('animation-FC');
            }
        })
            .to(this.codeMainBoxes[0], this.animationPartialsTime, { x: '0%', ease: Back.easeOut.config(2) }, 0.4)
            .to(this.codeBoxes[0], this.codeTime, { y: '-95%', ease: Power0.easeNone }, 0.4)
            .to(this.loadingTexts[0], 0.1, { opacity: 1 }, 0.3)
            .set(this.loadingText1Dots[0], { opacity: 1 }, 0.5)
            .set(this.loadingText1Dots[1], { opacity: 1 }, 0.6)
            .set(this.loadingText1Dots[2], { opacity: 1 }, 0.7)

            .to(this.codeMainBoxes[1], this.animationPartialsTime, { x: '0%', ease: Back.easeOut.config(2) }, 0.8)
            .to(this.codeBoxes[1], this.codeTime, { y: '-95%', ease: Power0.easeNone }, 0.8)
            .set(this.loadingTexts[0], { opacity: 0 }, 0.8)
            .set(this.loadingTexts[1], { opacity: 1 }, 0.8)
            .set(this.loadingText2Dots[0], { opacity: 1 }, 0.9)
            .set(this.loadingText2Dots[1], { opacity: 1 }, 1.0)
            .set(this.loadingText2Dots[2], { opacity: 1 }, 1.1)

            .to(this.skipBox, this.animationPartialsTime / 2, { y: '0%', ease: Power2.easeOut }, 0.4)
            .to(this.skipIcon, this.animationPartialsTime / 2, { scale: 1, ease: Back.easeOut.config(2) }, 0.6)
            .to(this.skipText, this.animationPartialsTime / 2, { opacity: 1}, 0.8)
            .set(this.skipTextDots[0], { opacity: 1}, 0.9)
            .set(this.skipTextDots[1], { opacity: 1}, 1)
            .set(this.skipTextDots[2], { opacity: 1}, 1.1)

            .to(this.codeMainBoxes[2], this.animationPartialsTime, { y: '0%', ease: Back.easeOut.config(2) }, 1.2)
            .to(this.codeBoxes[2], this.codeTime, { y: '-95%', ease: Power0.easeNone }, 1.2)
            .set(this.loadingTexts[1], { opacity: 0 }, 1.2)
            .set(this.loadingTexts[2], { opacity: 1 }, 1.2)
            .set(this.loadingText3Dots[0], { opacity: 1 }, 1.3)
            .set(this.loadingText3Dots[1], { opacity: 1 }, 1.4)
            .set(this.loadingText3Dots[2], { opacity: 1 }, 1.5)

            .to(this.codeMainBoxes[0], this.animationPartialsTime, { y: '-130%', ease: Back.easeIn.config(1) }, 1.4)
            .to(this.codeMainBoxes[1], this.animationPartialsTime, { x: '140%', ease: Back.easeIn.config(1) }, 1.6)
            .to(this.codeMainBoxes[2], this.animationPartialsTime, { y: '-130%', ease: Back.easeIn.config(1) }, 1.8)

            .staggerTo(this.boxes, this.animationPartialsTime, { scale: 1, ease: Back.easeOut.config(1) }, 0.225, 1.8)
            .staggerTo(this.circles, this.animationPartialsTime, { scale: 1, ease: Back.easeOut.config(1) }, 0.1, 1.8)
            .to(this.wheel, this.animationPartialsTime * 2, { scale: 1, ease: Back.easeOut.config(3) }, 2)
            .to(this.navigationBox, this.animationPartialsTime, { y: 0 }, 2.7)

            .set(this.loadingTexts[2], { opacity: 0 }, 1.7)
            .set(this.loadingTexts[3], { opacity: 1 }, 1.7)
            .set(this.loadingText4Dots[0], { opacity: 1 }, 1.8)
            .set(this.loadingText4Dots[1], { opacity: 1 }, 1.9)
            .set(this.loadingText4Dots[2], { opacity: 1 }, 2)
            .set(this.loadingText4Dots, { opacity: 0 }, 2.1)
            .set(this.loadingText4Dots[0], { opacity: 1 }, 2.2)
            .set(this.loadingText4Dots[1], { opacity: 1 }, 2.3)
            .set(this.loadingText4Dots[2], { opacity: 1 }, 2.4)

            .to(this.boxes[0], this.animationPartialsTime, { x: -this.windowWidth * 0.125, y: this.windowHeight * 0.06, rotation: 5, ease: Back.easeOut.config(1.3) }, 2.5)
            .to(this.boxes[1], this.animationPartialsTime, { x: -this.windowWidth * 0.39, y: -this.windowHeight * 0.185, ease: Back.easeOut.config(1.3) }, 2.6)
            .to(this.boxes[1], this.animationPartialsTime * 0.7, { rotation: 175, ease: Back.easeOut.config(3) }, 2.6)
            .to(this.boxes[2], this.animationPartialsTime, { x: this.windowWidth * 0.375, y: -this.windowHeight * 0.185, rotation: 3, ease: Back.easeOut.config(3) }, 2.7)
            .to(this.boxes[2], this.animationPartialsTime / 2, { rotation: -5, repeat: 1, yoyo: true, ease: Back.easeInOut.config(1) }, 2.6)
            .to(this.boxes[3], this.animationPartialsTime * 4, { x: this.windowWidth * 0.11, y: this.windowHeight * 0.06, ease: Back.easeOut.config(1) }, 2.8)
            .to(this.boxes[3], this.animationPartialsTime, { rotation: -5, }, 2.8)
            
            .to(this.circles[0], this.animationPartialsTime, { x: -this.windowWidth * 0.066, y: -this.windowHeight * 0.05, ease: Back.easeOut.config(1) }, 2.5)
            .to(this.circles[1], this.animationPartialsTime, { x: -this.windowWidth * 0.201, y: this.windowHeight * 0.07, ease: Back.easeOut.config(1) }, 2.6)
            .to(this.circles[2], this.animationPartialsTime, { x: -this.windowWidth * 0.320, y: this.windowHeight * 0.19, ease: Back.easeOut.config(1) }, 2.7)
            .to(this.circles[3], this.animationPartialsTime, { x: -this.windowWidth * 0.066, y: this.windowHeight * 0.11, ease: Back.easeOut.config(1) }, 2.8)
            .to(this.circles[4], this.animationPartialsTime, { x: -this.windowWidth * 0.201, y: this.windowHeight * 0.23, ease: Back.easeOut.config(1) }, 2.9)
            
            .to(this.circles[5], this.animationPartialsTime / 2, { x: -this.windowWidth * 0.25, y: this.windowHeight * 0.15, ease: Power4.easeOut }, 2.75)
            .to(this.circles[5], this.animationPartialsTime / 2, { x: this.windowWidth * 0.6, y: -this.windowHeight * 0.17, ease: Power4.easeOut }, 3.1)
            .to(this.circles[5], this.animationPartialsTime / 2, { x: -this.windowWidth * 0.2, y: -this.windowHeight * 0.25, ease: Power4.easeOut }, 3.45)
            .to(this.circles[5], this.animationPartialsTime / 2, { x: this.windowWidth * 0.41, y: -this.windowHeight * 0.55, ease: Power4.easeOut }, 3.8)
            .to(this.circles[5], this.animationPartialsTime / 4, { x: this.windowWidth * 0.40, y: -this.windowHeight * 0.55, ease: Back.easeInOut.config(5), yoyo: true, repeat: 3 }, 4.2)
            .to(this.circles[7], this.animationPartialsTime / 2, { x: this.windowWidth * 0.58, y: -this.windowHeight * 0.66, ease: Back.easeOut.config(1) }, 4.4)
            .to(this.circles[7], this.animationPartialsTime / 2, { x: this.windowWidth * 0.80, y: -this.windowHeight * 0.38, ease: Back.easeOut.config(1) }, 4.75)
            .to(this.circles[5], this.animationPartialsTime / 2, { x: this.windowWidth * 0.68, y: -this.windowHeight * 0.12, ease: Back.easeInOut.config(1) }, 4.8)

            .to(this.circles[6], this.animationPartialsTime*1.5, { x: this.windowWidth * 0.934, y: -this.windowHeight * 0.48, ease: Back.easeOut.config(1) }, 2.5)
            .to(this.circles[7], this.animationPartialsTime*1.5, { x: this.windowWidth * 0.80, y: -this.windowHeight * 0.36, ease: Back.easeOut.config(1) }, 2.6)
            .to(this.circles[8], this.animationPartialsTime*1.5, { x: this.windowWidth * 0.68, y: -this.windowHeight * 0.24, ease: Back.easeOut.config(1) }, 2.7)

            .to(this.wheel, this.animationPartialsTime, { x: this.windowWidth * 0.28, y: this.windowHeight * 0.24, ease: Back.easeOut.config(2) }, 2.8)
            
            .set(this.loadingTexts[3], { opacity: 0 }, 2.5)
            .set(this.loadingTexts[4], { opacity: 1 }, 2.5)
            .set(this.loadingText5Dots[0], { opacity: 1 }, 2.6)
            .set(this.loadingText5Dots[1], { opacity: 1 }, 2.7)
            .set(this.loadingText5Dots[2], { opacity: 1 }, 2.8)
            .set(this.loadingText5Dots, { opacity: 0 }, 2.9)
            .set(this.loadingText5Dots[0], { opacity: 1 }, 3)
            .set(this.loadingText5Dots[1], { opacity: 1 }, 3.1)
            .set(this.loadingText5Dots[2], { opacity: 1 }, 3.2)
            .set(this.loadingText5Dots, { opacity: 0 }, 3.3)
            .set(this.loadingText5Dots[0], { opacity: 1 }, 3.4)
            .set(this.loadingText5Dots[1], { opacity: 1 }, 3.5)
            .set(this.loadingText5Dots[2], { opacity: 1 }, 3.6)
            .set(this.loadingText5Dots, { opacity: 0 }, 3.7)
            .set(this.loadingText5Dots[0], { opacity: 1 }, 3.8)
            .set(this.loadingText5Dots[1], { opacity: 1 }, 3.9)
            .set(this.loadingText5Dots[2], { opacity: 1 }, 4)
            .set(this.loadingText5Dots, { opacity: 0 }, 4.1)
            .set(this.loadingText5Dots[0], { opacity: 1 }, 4.2)
            .set(this.loadingText5Dots[1], { opacity: 1 }, 4.3)
            .set(this.loadingText5Dots[2], { opacity: 1 }, 4.4)
            .set(this.loadingText5Dots, { opacity: 0 }, 4.5)
            .set(this.loadingText5Dots[0], { opacity: 1 }, 4.6)
            .set(this.loadingText5Dots[1], { opacity: 1 }, 4.7)
            .set(this.loadingText5Dots[2], { opacity: 1 }, 4.8)
            .set(this.loadingText5Dots, { opacity: 0 }, 4.9)
            .set(this.loadingText5Dots[0], { opacity: 1 }, 5)
            .set(this.loadingText5Dots[1], { opacity: 1 }, 5.1)
            .set(this.loadingText5Dots[2], { opacity: 1 }, 5.2)
            .set(this.loadingTexts[4], { opacity: 0 }, 5.3)
            .set(this.loadingTexts[5], { opacity: 1 }, 5.3);
            
        // this.introTimeline.timeScale(0.4);
        // this.introTimeline.timeScale(5);
        this.introTimeline.progress(1);
        }

    outro(callback) {
        if (this.outroIsPlayed) { return; }
        this.outroIsPlayed = true;
        this.introTimeline.pause();  
        if (this.introTimeline.progress() < 0.45) {
            TweenMax.to(this.codeMainBoxes[0], this.animationPartialsTime, { y: '-130%', ease: Back.easeIn.config(1) });
            TweenMax.to(this.codeMainBoxes[1], this.animationPartialsTime, { x: '140%', ease: Back.easeIn.config(1) });
            TweenMax.to(this.codeMainBoxes[2], this.animationPartialsTime, { y: '-130%', ease: Back.easeIn.config(1) });
        }
        if (this.introTimeline.progress() >= 0.35 && this.introTimeline.progress() < 1) {
            TweenMax.staggerTo(this.outroLeft, this.animationPartialsTime, { x: -this.windowWidth });
            TweenMax.staggerTo(this.outroRight, this.animationPartialsTime, { x: this.windowWidth });
        }
        if (this.introTimeline.progress() >= 1) {
            TweenMax.staggerTo(this.outroLeft, this.animationPartialsTime, { x: '-=300' });
            TweenMax.staggerTo(this.outroRight, this.animationPartialsTime, { x: '+=300' });
        }
        TweenMax.to(this.skipBox, this.animationPartialsTime * 2, { y: '150%'});
        TweenMax.to(this.loadingBox, this.animationPartialsTime, { scale: 0 });
        TweenMax.to(this.loadingBox, this.animationPartialsTime, { scale: 0 });
        TweenMax.to(this.navigationBox, 0.35, { y: '-80%' });
        TweenMax.to(this.navigationCircle, 0.35, { opacity: 1 });
        
        TweenMax.to(this.coverBg, this.animationPartialsTime * 2, { y: -120 + '%'});
        setTimeout(()=>{
            window.coverStage = false;
            if (callback) { callback(); }
        }, 300)

    }

    addEventListeners(){
        onWheelAndSimilar((event)=>{
            if (!window.coverStage) { return; }
            preventDefault(event);
            this.outro();
        })
    }

    init() {
        window.scrollTo(0, 0);
        this.intro();
        setTimeout(()=>{
            this.addEventListeners();
        }, 500);
    }
}