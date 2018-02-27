console.log('Script is loaded');

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    // console.log('%c Document is ready', 'color: #42dcf4');
    const cover = new Cover();
    const boxes = new Boxes();
    const skills = new Skills();
    const wheel = new Wheel();

    cover.init();
    boxes.init();
    skills.init();
    wheel.init();

    addSmothScrollToNav();


  }
};