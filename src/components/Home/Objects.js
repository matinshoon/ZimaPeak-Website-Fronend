import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../ThemeContext';
import object1 from '../../images/objects/1.png';
import object3 from '../../images/objects/3.png';
import object6 from '../../images/objects/6.png';
import TimerUi from './timerUi';

const Objects = () => {
    const [scale, setScale] = useState(1);
    const maxScale = 2;
    const { darkMode } = useContext(ThemeContext);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        let newScale = 1 + scrollY / 500;

        if (newScale > maxScale) {
            newScale = maxScale;
        }

        setScale(newScale);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="relative overflow-x-clip">
            {/* Adjust this container's position based on your layout */}
            <div className="flex flex-col justify-center items-center min-h-screen sm:-translate-y-32">
                <img src={object1} alt="Object 1" className="z-10 w-1/2 r-floating" />
                <div
                    className={`${darkMode ? 'circle-gradient-dark' : 'circle-gradient-light'} transition-transform duration-300`}
                    // style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
                    style={{ transform: `translate(-50%, -50%) scale()` }}
                />
                <img src={object3} alt="Object 3" className="floating w-1/5 absolute top-1/4 left-80 transform -translate-x-1/2 -translate-y-1/2" />
                {/* <div className="floating w-1/5 absolute top-1/4 left-80 transform -translate-x-1/2 -translate-y-1/2">
                    <TimerUi />
                </div> */}
                {/* Adjust the positioning of other elements as needed */}
                <span className={`w-1/5 z-20 flex justify-center items-center absolute top-2/4 right-1/3 transform translate-x-1/2 -translate-y-1/2 h-20 glass text-white hover:bg-white hover:text-sky-600 font-bold rounded-full`}>
                    +100 Generated Leads
                </span>
                <img src={object6} alt="Object 6" className="w-40 absolute bottom-1/4 left-1/4 transform translate-x-1/2 translate-y-1/2" />
                <img src={object6} alt="Object 6" className="floating w-40 absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2" />
            </div>
        </div>
    );
};

export default Objects;
