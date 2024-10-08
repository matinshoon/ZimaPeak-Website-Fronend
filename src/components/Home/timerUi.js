import React, { useEffect } from 'react';

const TimerUi = () => {
  useEffect(() => {
    const handleResize = () => scale();
    window.addEventListener('resize', handleResize);
    scale();

    document.addEventListener('touchstart', () => document.getElementById('timerUi').classList.add('punch'));
    document.addEventListener('touchend', () => document.getElementById('timerUi').classList.remove('punch'));

    const sec_menge = 60;
    let segment = '';
    for (let i = 0; i < sec_menge; i++) {
      segment += `<div class='container' style='transform: translate(-50%,-50%) rotate(${(360 / sec_menge) * i}deg);'><div class='element'></div></div>`;
    }
    document.getElementById('timeUi').innerHTML = segment;

    const interval = setInterval(() => {
      tick();
      setTimeout(() => {
        document.querySelectorAll('.element').forEach(element => {
          element.classList.remove('tick');
        });
      }, 500);
    }, 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  const scale = () => {
    const minwindow = Math.min(window.innerWidth, window.innerHeight);
    let fontSize = '1.2em';
    if (minwindow < 99) fontSize = '0.3em';
    else if (minwindow < 199) fontSize = '0.4em';
    else if (minwindow < 299) fontSize = '0.5em';
    else if (minwindow < 399) fontSize = '0.6em';
    else if (minwindow < 499) fontSize = '0.7em';
    else if (minwindow < 599) fontSize = '0.8em';
    else if (minwindow < 699) fontSize = '0.9em';
    else if (minwindow < 799) fontSize = '1em';
    else if (minwindow < 899) fontSize = '1.1em';

    document.querySelectorAll('#timerUi #timeUi, #timerUi #scale, #timerUi #hour, #timerUi #minute, #timerUi #quater, #timerUi #half, #timerUi #third').forEach(el => {
      el.style.fontSize = fontSize;
    });
  };

  const tick = () => {
    document.querySelectorAll('#timerUi .element').forEach(el => (el.style.marginLeft = '0'));
    const jetzt = new Date();
    const sekunden = jetzt.getSeconds();
    const minuten = jetzt.getMinutes();
    document.querySelectorAll(`#timerUi .element:nth-child(${sekunden + 1})`).forEach(el => {
      el.classList.add('tick');
      el.style.marginLeft = `${(1 - (1 / 60) * minuten) * 50}%`;
    });
    document.getElementById('minute').style.width = `${(1 / 60) * minuten * 30}%`;
    document.getElementById('minute').style.height = `${(1 / 60) * minuten * 30}%`;
    document.getElementById('stunde').innerHTML = jetzt.getHours();
  };

  return (
    <div className="flex glass w-96 h-72">
      <div className="flex-grow"></div>
      <div className="h-full w-1/3 flex items-center justify-center">
        <div id="timerUi" className="relative w-full h-full bg-transparent">
          <div id="wrapper" className="relative w-full h-full flex items-center justify-center">
            <div id="minute" className="transition-[width,height] absolute"></div>
            <div id="scale" className="relative">
              <div id="quater" className="absolute bg-white/15 border border-transparent"></div>
              <div id="half" className="absolute bg-white/15 border border-transparent"></div>
              <div id="third" className="absolute bg-white/15 border border-transparent"></div>
            </div>
            <div id="hour" className="text-center bg-transparent absolute">
              <span id="stunde" className="text-white font-nunito font-normal relative left-1/2 top-1/2 text-2xl transform -translate-x-1/2 -translate-y-1/2"></span>
            </div>
            <div id="timeUi" className="bg-transparent absolute w-[30em] h-[30em] overflow-hidden rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-90"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerUi;
