// import React, { useContext, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { ThemeContext } from '../ThemeContext';
// import caseStudiesData from '../data/casestudiesData';
// import { BsArrowUpRightCircle } from 'react-icons/bs';

// const CaseStudy = () => {
//     const { darkMode } = useContext(ThemeContext);
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const caseStudy = caseStudiesData.find((study) => study.id === id);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     if (!caseStudy) {
//         return <div className="flex justify-center items-center min-h-screen">No case study found.</div>;
//     }

//     // Find related case studies based on matching tags
//     const relatedCases = caseStudiesData.filter(
//         (study) =>
//             study.id !== id && // Exclude the current case study
//             study.tags.some(tag => caseStudy.tags.includes(tag)) // Check if any tag matches
//     );

//     // Slang for the Call to Action
//     const slang = "Want to learn more about how we can help you?";

//     return (
//         <div id="casestudies" className={`flex justify-center items-center ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'} overflow-x-hidden`}>
//             <div className="flex flex-col justify-center items-center px-4 sm:px-6 w-full">
//                 {/* Header Section */}
//                 <div
//                     className={`w-[99vw] h-[60vh] sm:h-[40vh] flex flex-col items-center justify-center text-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} px-4 sm:px-6`}
//                 >
//                     <h1 className="text-center text-3xl sm:text-4xl font-bold">{caseStudy.title}</h1>
//                     {/* Display services */}
//                     <div className="my-10 flex flex-col sm:flex-row gap-6">
//                         <h2 className="text-xl font-bold mb-2">Services:</h2>
//                         <ul className="list-disc pl-6 flex gap-6 sm:flex-row flex-wrap">
//                             {caseStudy.services.map((service, index) => (
//                                 <li key={index} className="text-lg">{service}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>

//                 {/* Display Growth metrics */}
//                 <div className={`-translate-y-32 w-full md:w-3/5 h-28 my-20 flex justify-around items-center text-white ${darkMode ? 'border' : 'bg-black opacity-90'} md:rounded-lg`}>
//                     {caseStudy.growth.map((growth, index) => {
//                         const growthKey = Object.keys(growth)[0];
//                         const growthValue = growth[growthKey];
//                         return (
//                             <div key={index} className="text-center">
//                                 <p className='font-bold text-2xl mb-2'>{growthValue}</p>
//                                 <p>{growthKey}</p>
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {/* Challenge, Solution, and Results */}
//                 <div className="mx-4 sm:mx-40 w-full sm:w-3/5 text-lg">
//                     <div className="flex flex-col sm:flex-row mb-6">
//                         <h2 className="text-xl font-bold mb-2 mr-10">Summary:</h2>
//                         <p className="mb-10 whitespace-pre-line">{caseStudy.summary}</p>
//                     </div>
//                     <div className="flex flex-col sm:flex-row mb-6">
//                         <h2 className="text-xl font-bold mb-2 mr-10">Challenge:</h2>
//                         <p className="mb-10 whitespace-pre-line">{caseStudy.challenge}</p>
//                     </div>
//                     <div className="flex flex-col sm:flex-row mb-6">
//                         <h2 className="text-xl font-bold mb-2 mr-10">Solution:</h2>
//                         <div className="flex flex-col">
//                             <p className="mb-10 whitespace-pre-line">{caseStudy.solution}</p>
//                             {/* Display Solution Image */}
//                             <img 
//                                 src={caseStudy.images.solution} 
//                                 alt="Solution"
//                                 className="w-full object-cover object-center border-4 border-gray-100 rounded-xl mb-10" 
//                             />
//                         </div>
//                     </div>
//                     <div className="flex flex-col sm:flex-row mb-6">
//                         <h2 className="text-xl font-bold mb-2 mr-10">Results:</h2>
//                         <div className="flex flex-col items-center">
//                             <p className="mb-10 whitespace-pre-line">{caseStudy.results}</p>
//                             {/* Display Results Image */}
//                             <img 
//                                 src={caseStudy.images.results} 
//                                 alt="Results"
//                                 className="w-full sm:w-auto sm:max-w-2xl max-h-96 object-contain object-center rounded-2xl mb-10 border-4 border-gray-300" 
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Call to Action */}
//                 <div className="mt-16">
//                     <h2 className="text-xl text-center font-semibold mb-6">{slang}</h2>
//                     <Link to="/go/booking">
//                         <button
//                             className={`w-full py-3 rounded-2xl text-white text-xl font-bold bg-primary ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300 hover:text-slate-900'}`}
//                         >
//                             Book a Free Discovery Call
//                         </button>
//                     </Link>
//                 </div>

//                 {/* Related Cases */}
//                 <div className="flex flex-col justify-center items-center py-14 px-6 gap-6">
//                     <h3 className="text-3xl font-bold mb-6">Related Case Studies</h3>
//                     <div className="flex flex-wrap justify-center items-center gap-6">
//                         {relatedCases.map((relatedCase, index) => (
//                             <div
//                                 key={relatedCase.id}
//                                 className="flex flex-col w-full sm:w-3/12 items-center justify-center bg-gray-100 rounded-xl overflow-hidden"
//                             >
//                                 <div className="w-full h-48 sm:h-56 p-2">
//                                     <img
//                                         src={relatedCase.banner}
//                                         alt={relatedCase.title}
//                                         className="w-full h-full object-cover object-center rounded-xl"
//                                     />
//                                 </div>
//                                 <div className="w-full p-2">
//                                     <div className="flex flex-col items-left">
//                                         <h2 className="text-lg sm:text-xl font-semibold">{relatedCase.title}</h2>
//                                         <p className="text-sm text-gray-500 mt-2 line-clamp-3">{relatedCase.summary}</p>
//                                         <button
//                                             onClick={() => navigate(`/go/casestudies/${relatedCase.id}`)}
//                                             className="flex items-center text-blue-500 mt-4 hover:text-blue-700"
//                                         >
//                                             <span>View Case Study</span>
//                                             <BsArrowUpRightCircle className="ml-2" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CaseStudy;

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CaseStudy = () => {
  const { id } = useParams();

  useEffect(() => {
    window.location.href = `https://zimapeak.com/go/casestudies/${id}`;
  }, [id]);

  return null;
};

export default CaseStudy;