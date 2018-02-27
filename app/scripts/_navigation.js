// ======= Navigation.JS =======
console.log('Nav is loaded');

class Navigation {
    constructor() {

        // == Variables ==
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
        this.circleProgress = 0;


        // == Elements ==
        this.mainWrapper = document.querySelector('#main-wrapper');
        this.buttons = [
            document.querySelector('#home-nav-btn'),
            document.querySelector('#about-nav-btn'),
            document.querySelector('#skills-nav-btn'),
            document.querySelector('#boxes-nav-btn'),
            document.querySelector('#wheel-nav-btn'),
            document.querySelector('#footer-nav-btn')
        ]
        this.sections = [
            document.querySelector('#cover'),
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
            TweenMax.to(this.navHover, 0.35, { y: 0 });
        })

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].addEventListener('mousedown', () => {
                this.scrollToY(this.sections[i].offsetTop, 500, 'easeInOutQuint');
            })
        }

        window.addEventListener('scroll', ()=>{
            this.setProgressLine();
        });

        this.navCircle.addEventListener('mousedown', ()=>{
            this.scrollCircleIsClicked = true;    
        })

        window.addEventListener('mouseup', () => {
            this.scrollCircleIsClicked = false;
            this.setProgressLine();
        })

        window.addEventListener('mousemove', (event)=>{
            this.movePageWithScrollCircle(event)
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
        // let progressInPercent = (window.scrollY) / (this.documentHeight - this.windowHeight * 0.5); 
        // let progress = progressInPercent * this.navWrapper.getBoundingClientRect().width;

        // this.navProgressLine.style.width = progress + 'px';
        // TweenMax.set(this.navCircle, { x: progress });
    }

    movePageWithScrollCircle(event){
        if ( !this.scrollCircleIsClicked ) { return }
        // let progressInPercent = (window.scrollY) / (this.documentHeight - this.windowHeight * 0.5); 
        
        console.log(event.clientX)
        console.log(this.navCircle.getBoundingClientRect().left)

        this.circleProgress = event.clientX - this.navCircle.getBoundingClientRect().left;
        TweenMax.set(this.navCircle, { x: this.circleProgress });
        
    }

    init() {
        this.addEventListeners();
    }
}