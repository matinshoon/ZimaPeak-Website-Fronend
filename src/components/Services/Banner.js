import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';
import { format, addDays, subDays } from 'date-fns';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import Card2Image from '../../images/1.jpg';
import Card5Vid from '../../videos/1.mp4';

const Banner = () => {
    const { darkMode } = useContext(ThemeContext);

    const today = new Date();
    const tomorrow = addDays(today, 1);
    const yesterday = subDays(today, 1);

    const todos = [
        { date: today, tasks: ['Create ad creatives', 'Set up targeting options', 'Monitor ad performance', 'Optimize ad copy', 'Adjust bidding strategies'] },
        { date: tomorrow, tasks: ['Launch new ad campaign', 'A/B test ad variations', 'Refine audience segments', 'Review campaign budget', 'Evaluate ROI'] },
        { date: yesterday, tasks: ['Research competitor ads', 'Brainstorm ad campaign ideas', 'Prepare ad schedule', 'Compile ad performance report', 'Adjust ad scheduling'] },
    ];

    const dateList = [
        yesterday,
        today,
        tomorrow,
    ];

    const [selectedDate, setSelectedDate] = useState(today);
    const [quotes, setQuotes] = useState([]);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    const paidAdsQuotes = [
        '“Stopping advertising to save money is like stopping your watch to save time.” - Henry Ford',
        '“Half the money I spend on advertising is wasted; the trouble is I don\'t know which half.” - John Wanamaker',
        '“Good advertising does not just circulate information. It penetrates the public mind with desires and belief.” - Leo Burnett',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % paidAdsQuotes.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setQuotes([paidAdsQuotes[currentQuoteIndex]]);
    }, [currentQuoteIndex]);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const selectedTodo = todos.find(todo => format(todo.date, 'PPPP') === format(selectedDate, 'PPPP'));

    const todayDay = today.getDate();
    const leadsGeneratedToday = Math.ceil(todayDay * 8.8);

    const leadsGeneratedData = Array.from({ length: 6 }, (_, index) => {
        if (index === 5) {
            return leadsGeneratedToday;
        }
        return Math.ceil(leadsGeneratedToday - (Math.random() * 10) - 1 * (5 - index));
    }).sort((a, b) => a - b);

    // Generate labels for the last six days
    const chartLabels = Array.from({ length: 6 }, (_, index) => format(subDays(today, 5 - index), 'M/d'));

    const chartData = {
        labels: chartLabels,
        datasets: [
            {
              data: leadsGeneratedData,
              borderColor: '#f80', // Orange border color for the line
              borderWidth: 2,
              fill: false,
            },
          ],
        };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)', // White grid lines with transparency
                },
                ticks: {
                  color: '#fff', // White tick labels
                },
              },
              y: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)', // White grid lines with transparency
                },
                ticks: {
                  color: '#fff', // White tick labels
                },
              },
        },
        plugins: {
            legend: {
                display: false,
            },
              tooltip: {
                backgroundColor: '#fff', // White background for tooltips
                titleColor: '#000', // Black tooltip title text
                bodyColor: '#000', // Black tooltip body text
              },
        },
    };

    return (
        <div className={`flex flex-col justify-around items-center ${darkMode ? 'text-white' : 'text-black'}`}>
            <div className="z-20 flex flex-col justify-center items-center">
                <h1 className="text-dark text-3xl md:text-8xl font-bold text-center mt-20 mb-10">
                Services <br /> that make a <span className='text-primary sm:text-dark font-black'>difference</span>
                </h1>
                <p className="text-2xl md:text-2xl text-center mb-6">Elevating Your Brand's Social Media Presence.</p>
                <Link to="https://zimapeak.com/go/booking">
                    <button className={`${darkMode ? 'glass' : 'bg-white text-black border-4 border-dark'} hover:bg-dark hover:text-white transition duration-200 px-6 py-3 rounded-full text-lg font-semibold`}>
                        Get Started!
                    </button>
                </Link>
            </div>
            <div className="hidden md:block -translate-y-20 relative px-20 w-full overflow-x-hidden">
                <div className="relative flex items-end">
                    <div className={`${darkMode ? 'border-4 border-gray-100' : 'border-4 border-dark text-dark bg-white'} p-6 m-4 rounded-3xl flex flex-col items-start w-[20%] h-[50vh]`}>
                        <h3 className="text-gray-400 text-lg mb-2">Select time slot</h3>
                        <p className="text-lg mb-4">{format(selectedDate, 'PPPP')}</p>
                        <div className="flex flex-row items-center mb-4 overflow-x-hidden w-full justify-center">
                            <div className="flex space-x-4 bg-dark text-white rounded-xl">
                                {dateList.map((date, index) => (
                                    <button
                                        key={index}
                                        className={`px-4 py-2 rounded ${format(date, 'PPPP') === format(selectedDate, 'PPPP') ? 'bg-secondary' : 'bg-transparent'} whitespace-nowrap`}
                                        onClick={() => handleDateClick(date)}
                                    >
                                        {format(date, 'd')}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {selectedTodo ? (
                            <ul className="w-full">
                                {selectedTodo.tasks.map((task, index) => (
                                    <li key={index} className="flex items-center justify-start py-2">
                                        <button className={`flex items-center justify-center mr-2 focus:outline-none rounded-full ${darkMode ? 'text-gray-300 border-gray-300' : 'text-green-500 border-green-500'}`}>
                                            {darkMode ? (
                                                <MdRadioButtonUnchecked size={12} />
                                            ) : (
                                                <MdRadioButtonChecked size={12} />
                                            )}
                                        </button>
                                        <span className="text-lg">{task}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No tasks for this date</p>
                        )}
                    </div>
                    <div className={`m-4 rounded-3xl flex flex-col items-center w-[20%] h-[35vh]`}>
                        <img src={Card2Image} alt="zimapeak Card 2" className="rounded-3xl w-full h-[35vh] object-cover" />
                    </div>
                    <div className={`text-white bg-secondary p-6 m-4 rounded-3xl flex flex-col justify-center items-center w-[20%] h-[20vh]`}>
                        <p className="text-lg font-black text-center mb-4">{quotes}</p>
                    </div>
                    <div className={`bg-dark text-white p-6 m-4 rounded-3xl flex items-center justify-center w-[20%] h-[35vh]`}>
                        <div className="w-full">
                            <p className="text-center text-5xl font-black mb-2">{leadsGeneratedToday}</p>
                            <p className="text-center text-sm mb-2">Leads generated today</p>
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="m-4 rounded-3xl items-center w-[20%] relative h-[50vh] flex flex-col justify-end">
                        <video src={Card5Vid} className="rounded-3xl w-full h-[50vh] object-cover" autoPlay loop muted playsInline />
                        <Link to="https://zimapeak.com/go/booking" className="w-full flex justify-center">
                            <button className={`glass absolute -translate-y-20 text-white z-10 px-6 py-3 rounded-2xl text-lg font-semibold m-2`}>
                                See how it all works
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
