// ======= Navigation.JS =======
console.log('Nav is loaded');

class Navigation {
    constructor(classes) {
        this.cover = classes.cover;
        this.boxes = classes.boxes;
        this.skills = classes.skills;
        this.wheel = classes.wheel;

        // == Variables ==
        this.introIsLoaded = [false, false, false];

        this.currentTime = 0;
        this.time = 0;
        this.scrollY = document.documentElement.scrollTop;
        this.scrollTargetY = 0;
        this.speed = 2000;
        this.easing = 'easeOutSine';

        this.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this.documentHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );

        this.scrollCircleIsClicked = false;
        this.circleProgresCorrection = document.querySelector('#navigation .circle').getBoundingClientRect().left + 14;

        // == Elements ==
        this.mainWrapper = document.querySelector('#main-wrapper');
        this.buttons = [
            document.querySelector('#about-nav-btn'),
            document.querySelector('#skills-nav-btn'),
            document.querySelector('#boxes-nav-btn'),
            document.querySelector('#wheel-nav-btn'),
            document.querySelector('#footer-nav-btn')
        ]
        this.sections = [
            document.querySelector('#about'),
            document.querySelector('#skills'),
            document.querySelector('#boxes'),
            document.querySelector('#wheel'),
            document.querySelector('#footer')
        ]

        this.nav = document.querySelector('#navigation');
        this.navHover = document.querySelector('#navigation .hover-box');
        this.navWrapper = document.querySelector('#navigation .nav-wrapper');
        this.navProgressLine = document.querySelector('#navigation .progress-line');
        this.navCircle = document.querySelector('#navigation .circle');
        this.telepotLine = document.querySelector('#navigation .teleport-line');

        // == Easing equations from https://github.com/danro/easing-js/blob/master/easing.js ==
        this.easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };
    }

    addEventListeners() {
        this.nav.addEventListener('mouseover', () => {
            if (window.coverStage) { return; }
            TweenMax.to(this.navHover, 0.35, { y: '0%' });
        })

        this.nav.addEventListener('mouseout', () => {
            if (window.coverStage) { return; }
            TweenMax.to(this.navHover, 0.35, { y: '-80%'});
        })

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].addEventListener('mousedown', () => {
                if (window.coverStage) {
                    this.cover.outro(()=>{
                        this.scrollToY(this.sections[i].offsetTop, 500, 'easeInOutQuint');
                    });
                    return;
                }
                this.scrollToY(this.sections[i].offsetTop, 500, 'easeInOutQuint');
            })
        }

        window.addEventListener('scroll', ()=>{
            if ( window.coverStage ) { window.scrollTo(0,0); }
            this.setProgressLine();

            if (!this.introIsLoaded[0] && document.documentElement.scrollTop + this.windowHeight * 0.5 > this.sections[1].offsetTop) { 
                this.skills.intro();
                this.introIsLoaded[0] = true;
            }
            
            if (!this.introIsLoaded[1] && document.documentElement.scrollTop + this.windowHeight * 0.5 > this.sections[2].offsetTop) { 
                this.boxes.intro();
                this.introIsLoaded[1] = true;
            }
            
            if (!this.introIsLoaded[2] && document.documentElement.scrollTop + this.windowHeight * 0.5 > this.sections[3].offsetTop) { 
                this.wheel.intro();
                this.introIsLoaded[2] = true;
            }

        });

        this.navCircle.addEventListener('mousedown', ()=>{
            this.scrollCircleIsClicked = true;
        })

        window.addEventListener('mouseup', () => {
            this.scrollCircleIsClicked = false;
            this.setProgressLine();
        })

        window.addEventListener('mousemove', (event)=>{
            if (!this.scrollCircleIsClicked) { return; }
            if (window.coverStage) { return; }
            this.movePageWithScrollCircle(event);
        })

        this.telepotLine.addEventListener('mousedown', (event) => {
            if (window.coverStage) {
                this.cover.outro(() => {
                    this.scrollAfterClickOnLine(event);
                });
                return;
            }
            this.scrollAfterClickOnLine(event);
        })
    }

    scrollToY(scrollTargetY, speed, easing) {
    // scrollTargetY: the target scrollY property of the window
    // speed: time in pixels per second
    // easing: easing equation to use

    this.scrollY = window.scrollY || document.documentElement.scrollTop;
    this.scrollTargetY = scrollTargetY || 0;
    this.speed = speed || 2000;
    this.easing = easing || 'easeOutSine';

    // min time .1, max time .8 seconds
    this.time = Math.max(.1, Math.min(Math.abs(this.scrollY - this.scrollTargetY) / this.speed, .8));

    this.currentTime = 0;
 
    // call it once to get started
        this.tick();
    }

    tick() {
        this.currentTime += 1 / 60;
        
        let p = this.currentTime / this.time;
        let t = this.easingEquations[this.easing](p);
        this.setProgressLine();
        if (p < 1) {
            requestAnimFrame(()=>{
                this.tick();
            });
            window.scrollTo(0, this.scrollY + ((this.scrollTargetY - this.scrollY) * t));
        } else {
            window.scrollTo(0, this.scrollTargetY);
        }
    }

    setProgressLine(){
        let progressInPercent = (window.scrollY) / (this.documentHeight - this.windowHeight); 
        let progress = progressInPercent * this.navWrapper.getBoundingClientRect().width;

        this.navProgressLine.style.width = progress + 'px';
        TweenMax.set(this.navCircle, { x: progress });
    }

    movePageWithScrollCircle(event){
        let circlePosition = event.clientX - this.circleProgresCorrection;
        let wrapperWidth = this.navWrapper.getBoundingClientRect().width;
        if (circlePosition < 0 || circlePosition > wrapperWidth) { return; }

        TweenMax.set(this.navCircle, { x: circlePosition });

        let scrollPosition = (this.documentHeight - this.windowHeight) * circlePosition/wrapperWidth;
        window.scrollTo(0, scrollPosition);
    }

    scrollAfterClickOnLine(event) {
        let clickedPositions = event.clientX - this.circleProgresCorrection;
        let wrapperWidth = this.navWrapper.getBoundingClientRect().width;

        let scrollPosition = (this.documentHeight - this.windowHeight) * clickedPositions / wrapperWidth;
        this.scrollToY(scrollPosition, 500, 'easeInOutQuint');
    }

    init() {
        this.addEventListeners();
    }
}