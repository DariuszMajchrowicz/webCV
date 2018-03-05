console.log('Script is loaded');

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    // console.log('%c Document is ready', 'color: #42dcf4');
    const cover = new Cover();
    const boxes = new Boxes();
    const skills = new Skills();
    const wheel = new Wheel();

    const classes = {
      cover : cover,
      boxes : boxes,
      skills : skills,
      wheel : wheel
    }
    const navigation = new Navigation(classes);

    cover.init();
    boxes.init();
    skills.init();
    wheel.init();
    navigation.init();

  }
};

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();


function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
  e.preventDefault();
  e.returnValue = false;
}

function onWheelAndSimilar(func){

  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  // left: 37, up: 38, right: 39, down: 40,
  var keys = { 32: 1, 33: 1, 34: 1, 35: 1, 36: 1, 37: 1, 38: 1, 39: 1, 40: 1 };
  if (window.addEventListener) // older FF
  {
    window.addEventListener('DOMMouseScroll', func, false);
  }
  window.onwheel = func; // modern standard
  window.onmousewheel = document.onmousewheel = func; // older browsers, IE
  window.ontouchmove = func; // mobile
  document.onkeydown = (e)=>{
    if (keys[e.keyCode]) {
      func();
      return false;
    }
  };
}