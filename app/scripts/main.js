console.log('Script is loaded');

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    console.log('%c Document is ready', 'color: #42dcf4');
    const boxes = new Boxes();
    const wheel = new Wheel();
    const skills = new Skills();

    boxes.init();
    skills.init();
    wheel.init();

  }
};