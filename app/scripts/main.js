console.log('Script is loaded');

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    const cover = new Cover();
    // console.log('%c Document is ready', 'color: #42dcf4');
    // const boxes = new Boxes();
    // const skills = new Skills();
    // const wheel = new Wheel();

    cover.init();
    // boxes.init();
    // skills.init();
    // wheel.init();

    // addSmothScrollToNav();


  }
};