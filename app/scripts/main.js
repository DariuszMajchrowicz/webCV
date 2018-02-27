console.log('Script is loaded');

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    // console.log('%c Document is ready', 'color: #42dcf4');
    const cover = new Cover();
    const boxes = new Boxes();
    const skills = new Skills();
    const wheel = new Wheel();
    const navigation = new Navigation();

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