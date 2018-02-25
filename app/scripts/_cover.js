// ======= Cover.JS =======
console.log('Cover is loaded');

class Cover {
    constructor() {
        // == Setings ==
        this.animationPartialsTime = 0.5;
        this.codeTime = 4;
        this.introTime = 0.5;

        // == Variables ==
        this.openedBoxArray = [];
        this.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        // == Elements ==
        this.loadingBox = document.querySelector('#cover .loading-box');
        this.circleOrnament = document.querySelector('#cover .circle-ornament');

        this.codeMainBoxes = document.querySelectorAll('#cover .code-main-block');
        this.codeBoxes = document.querySelectorAll('#cover .code-block pre');
        this.loadingTexts = document.querySelectorAll('#cover .loading-txt');
        this.loadingText1Dots = document.querySelectorAll('#cover .loading-txt1 .dot');
        this.loadingText2Dots = document.querySelectorAll('#cover .loading-txt2 .dot');
        this.loadingText3Dots = document.querySelectorAll('#cover .loading-txt3 .dot');
        this.loadingText4Dots = document.querySelectorAll('#cover .loading-txt4 .dot');

        this.boxes = document.querySelectorAll('#cover .box');
        this.circles = document.querySelectorAll('#cover .circle');
        this.wheel = document.querySelectorAll('#cover .wheel');

    }

    intro() {
        var introTimeline = new TimelineLite({
            delay: 0.5
        });

        introTimeline.to(this.loadingBox, this.animationPartialsTime, {
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
            .to(this.wheel, this.animationPartialsTime * 2, { scale: 1, ease: Back.easeOut.config(1) }, 2)

            .set(this.loadingTexts[2], { opacity: 0 }, 1.7)
            .set(this.loadingTexts[3], { opacity: 1 }, 1.7)
            .set(this.loadingText4Dots[0], { opacity: 1 }, 1.8)
            .set(this.loadingText4Dots[1], { opacity: 1 }, 1.9)
            .set(this.loadingText4Dots[2], { opacity: 1 }, 2)
            .set(this.loadingText4Dots, { opacity: 0 }, 2.1)
            .set(this.loadingText4Dots[0], { opacity: 1 }, 2.2)
            .set(this.loadingText4Dots[1], { opacity: 1 }, 2.3)
            .set(this.loadingText4Dots[2], { opacity: 1 }, 2.4)

            .to(this.boxes[0], this.animationPartialsTime, { x: -this.windowWidth * 0.125, y: this.windowHeight * 0.06, ease: Back.easeInOut.config(2) }, 3)
            .to(this.boxes[1], this.animationPartialsTime, { x: -this.windowWidth * 0.375, y: -this.windowHeight * 0.185, ease: Back.easeInOut.config(2) }, 3)
            
            .to(this.boxes[2], this.animationPartialsTime, { x: this.windowWidth * 0.375, y: -this.windowHeight * 0.185, ease: Back.easeInOut.config(2) }, 3)
            .to(this.boxes[3], this.animationPartialsTime, { x: this.windowWidth * 0.125, y: this.windowHeight * 0.06, ease: Back.easeInOut.config(2) }, 3)
            
            .to(this.circles[0], this.animationPartialsTime, { x: -this.windowWidth * 0.066, y: -this.windowHeight * 0.05, ease: Back.easeInOut.config(2) }, 3)
            .to(this.circles[1], this.animationPartialsTime, { x: -this.windowWidth * 0.198, y: this.windowHeight * 0.07, ease: Back.easeInOut.config(2) }, 3)
            .to(this.circles[2], this.animationPartialsTime, { x: -this.windowWidth * 0.320, y: this.windowHeight * 0.19, ease: Back.easeInOut.config(2) }, 3)
            .to(this.circles[3], this.animationPartialsTime, { x: -this.windowWidth * 0.066, y: this.windowHeight * 0.11, ease: Back.easeInOut.config(2) }, 3)
            .to(this.circles[4], this.animationPartialsTime, { x: -this.windowWidth * 0.198, y: this.windowHeight * 0.23, ease: Back.easeInOut.config(2) }, 3)
            
            // .to(this.circles[5], this.animationPartialsTime, { x: -this.windowWidth * 0.320, y: this.windowHeight * 0.28, ease: Back.easeInOut.config(2) }, 3)

            .to(this.circles[6], this.animationPartialsTime, { x: this.windowWidth * 0.934, y: -this.windowHeight * 0.48, ease: Back.easeInOut.config(2) }, 3)
            .to(this.circles[7], this.animationPartialsTime, { x: this.windowWidth * 0.802, y: -this.windowHeight * 0.36, ease: Back.easeInOut.config(2) }, 3)
            .to(this.circles[8], this.animationPartialsTime, { x: this.windowWidth * 0.680, y: -this.windowHeight * 0.24, ease: Back.easeInOut.config(2) }, 3)

            .to(this.wheel, this.animationPartialsTime, { x: this.windowWidth * 0.28, y: this.windowHeight * 0.24, ease: Back.easeInOut.config(2) }, 3)
            
            
            
            // .to(this.boxes[0], this.animationPartialsTime / 2, { rotation: 20, yoyo: true, repeat: 1, ease: Back.easeInOut.config(2) }, 3)
            // .to(this.boxes[1], this.animationPartialsTime, { x: -this.windowWidth * 0.375, y: '50%', rotation: 360, ease: Back.easeInOut.config(2) }, 3.2)
            

        introTimeline.timeScale(0.5);
        }

    addEventListeners() {

    }

    init() {
        this.intro();
    }
}