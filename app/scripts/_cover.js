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
        this.windowWidth = window.innerWidth;

        // == Elements ==
        this.loadingBox = document.querySelector('#cover .loading-box');
        this.circleOrnament = document.querySelector('#cover .circle-ornament');

        this.codeMainBoxes = document.querySelectorAll('#cover .code-main-block');
        this.codeBoxes = document.querySelectorAll('#cover .code-block pre');
        this.loadingTexts = document.querySelectorAll('#cover .loading-txt');
        this.loadingText1Dots = document.querySelectorAll('#cover .loading-txt1 .dot');
        this.loadingText2Dots = document.querySelectorAll('#cover .loading-txt2 .dot');
        this.loadingText3Dots = document.querySelectorAll('#cover .loading-txt3 .dot');

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

            .to(this.codeMainBoxes[0], this.animationPartialsTime, { x: '0%', ease: Back.easeOut.config(1.1) }, 0.4)
            .to(this.codeBoxes[0], this.codeTime, { y: '-95%', ease: Power0.easeNone }, 0.4)
            .to(this.loadingTexts[0], 0.1, { opacity: 1 }, 0.3)
            .set(this.loadingText1Dots[0], { opacity: 1 }, 0.5)
            .set(this.loadingText1Dots[1], { opacity: 1 }, 0.6)
            .set(this.loadingText1Dots[2], { opacity: 1 }, 0.7)

            .to(this.codeMainBoxes[1], this.animationPartialsTime, { x: '0%', ease: Back.easeOut.config(1.1) }, 0.8)
            .to(this.codeBoxes[1], this.codeTime, { y: '-95%', ease: Power0.easeNone }, 0.8)
            .set(this.loadingTexts[0], { opacity: 0 }, 0.8)
            .set(this.loadingTexts[1], { opacity: 1 }, 0.8)
            .set(this.loadingText2Dots[0], { opacity: 1 }, 0.9)
            .set(this.loadingText2Dots[1], { opacity: 1 }, 1.0)
            .set(this.loadingText2Dots[2], { opacity: 1 }, 1.1)

            .to(this.codeMainBoxes[2], this.animationPartialsTime, { y: '0%', ease: Back.easeOut.config(1.1) }, 1.2)
            .to(this.codeBoxes[2], this.codeTime, { y: '-95%', ease: Power0.easeNone }, 1.2)
            .set(this.loadingTexts[1], { opacity: 0 }, 1.2)
            .set(this.loadingTexts[2], { opacity: 1 }, 1.2)
            .set(this.loadingText3Dots[0], { opacity: 1 }, 1.3)
            .set(this.loadingText3Dots[1], { opacity: 1 }, 1.4)
            .set(this.loadingText3Dots[2], { opacity: 1 }, 1.5)


            .to(this.codeMainBoxes[0], this.animationPartialsTime, { y: '-130%', ease: Back.easeIn.config(1.1) }, 1.4)
            .to(this.codeMainBoxes[1], this.animationPartialsTime, { x: '140%', ease: Back.easeIn.config(1.1) }, 1.6)
            .to(this.codeMainBoxes[2], this.animationPartialsTime, { y: '-130%', ease: Back.easeIn.config(1.1) }, 1.8);
        }

    addEventListeners() {

    }

    init() {
        this.intro();
    }
}