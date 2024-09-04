// import React, { useState } from 'react';
// import PropertyCard from '@/components/PropertyCard';

// const Slider = ({ slides }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const slidesToShow = 3; // Number of slides to show at once

//     const nextSlide = () => {
//         setCurrentIndex((prevIndex) =>
//             (prevIndex + slidesToShow) % slides.length
//         );
//     };

//     const prevSlide = () => {
//         setCurrentIndex((prevIndex) =>
//             (prevIndex - slidesToShow + slides.length) % slides.length
//         );
//     };

//     return (
//         <div className="relative">
//             <div className="flex overflow-hidden">
//                 {slides.slice(currentIndex, currentIndex + slidesToShow).map((property) => (
//                     <div className="w-full flex-shrink-0" key={property._id}>
//                         <PropertyCard property={property} />
//                     </div>
//                 ))}
//             </div>
//             <button
//                 className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-black p-2"
//                 onClick={prevSlide}
//             >
//                 &#10094;
//             </button>
//             <button
//                 className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white text-black p-2"
//                 onClick={nextSlide}
//             >
//                 &#10095;
//             </button>
//         </div>
//     );
// };

// export default Slider;
