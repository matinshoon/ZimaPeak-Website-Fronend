import React from 'react';

const Card = ({ data }) => {
  return (
    <div className="flex justify-center items-center w-full md:w-1/3">
      <a href={data.link} className="flex flex-col justify-start p-4 items-center w-full h-80 bg-glass hover:bg-white transition duration-300 ease-in-out text-white hover:text-dark rounded-2xl overflow-hidden mb-6 md:mb-0">
        <img
          src={data.imageSrc}
          alt={data.title}
          className="w-full h-40 sm:h-[58%] rounded-xl object-cover"
        />
        <h2 className="text-lg font-semibold line-clamp-2" dangerouslySetInnerHTML={{ __html: data.title }}></h2>
        <p className="text-sm mt-2 line-clamp-2">{data.description}</p>
      </a>
    </div>
  );
};

const CardContainer = ({ cardsData }) => {
  return (
    <div className='w-full flex flex-wrap md:flex-nowrap justify-center md:justify-between space-x-0 md:space-x-4'>
      {cardsData.length > 0 ? (
        cardsData.map((data, index) => (
          <Card key={index} data={data} />
        ))
      ) : (
        <p className="text-center text-white font-bold w-full mt-4">Nothing available at the moment.</p>
      )}
    </div>
  );
};

export default CardContainer;