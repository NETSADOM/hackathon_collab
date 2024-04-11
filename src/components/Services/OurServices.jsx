import React, { useEffect, useState } from 'react';
import { IoFilterSharp } from "react-icons/io5";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import saveIcon from '../../Assets/saveicon.png';
import savedIcon from '../../Assets/savedicon.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OurServices() {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCategories, setShowCategories] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [savedServices, setSavedServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getServices = async (category = null) => {
    try {
      let apiUrl = 'https://aguero.pythonanywhere.com/service/';
    if (category) {
      apiUrl += `?type=${category}`;
    }
      console.log("API URL:", apiUrl);
    const response = await axios.get(apiUrl);
    setServices(response.data);
  } catch (err) {
    console.error('Error fetching products:', err);
  }
};

  useEffect(() => {
    getServices();
  }, []);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleMouseEnter = (serviceId) => {
    setIsHovered(true);
    setHoveredImage(serviceId);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredImage(null);
  };

   const toggleSaved = (serviceId) => {
    if (savedServices.includes(serviceId)) {
      setSavedServices(savedServices.filter((id) => id !== serviceId));
    } else {
      setSavedServices([...savedServices, serviceId]);
    }
  };

  const isSaved = (serviceId) => savedServices.includes(serviceId);

  const lineStyle = {
    width: isHovered ? '35%' : '0%',
    height: '2px',
    backgroundColor: 'rgb(11, 11, 63)',
    display: 'block',
    margin: '8px auto',
    transition: 'width 0.7s',
  };
  const saveIconStyle = {
    display: isHovered ? 'block' : 'none',
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: 'white' ,
    borderRadius: '50%',
    padding: '5px',
    cursor: 'pointer',
    transition: 'opacity 0.3s',
  };
  

  // Calculate the index of the first and last item to display
  const indexOfLastItem = currentPage * 8;
  const indexOfFirstItem = indexOfLastItem - 8;
  const currentServices = services.slice(indexOfFirstItem, indexOfLastItem);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowCategories(false);
    getServices(category);
  };

  return (
    <div className="p-8 bg-sky-50 relative">
       <div className="text-center font-bold text-3xl my-8 relative">
  <p
    className="inline-block relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
  >
    <span className="font-light text-lg">DISCOVER</span><br />
    <span className=" text-5xl">Our Services</span>
  </p>
  <span style={lineStyle}></span>
</div>

      <div className="flex justify-end mr-20 mb-4 relative">
        <button onClick={toggleCategories} 
        className="flex items-center font-bold py-2 px-4 rounded-full hover:bg-gray-300 relative border-2 border-black"
         style={{ zIndex: showCategories ? '20' : 'auto' }}
        >
           <IoFilterSharp className="mr-2" />
              Filters
        </button>
      </div>
      <div className={`absolute left-0 top-0 h-full w-full max-w-sm bg-white border border-gray-300 rounded shadow-md py-8 px-16 z-10 transform transition-transform ${showCategories ? 'translate-x-0' : '-translate-x-full'}`}>
         <h2 className="text-3xl font-light mb-4">Filters</h2>
         <div>
      <h3 className="text-md font-semibold mb-1">Categories</h3>
        <ul>
          <li className="cursor-pointer py-1 px-2 " onClick={() => handleCategoryChange("DL")}>
            <input type="radio" id="delivery" name="category" checked={selectedCategory === "DL"}  />
            <label htmlFor="delivery">Delivery</label>
          </li>
          <li className="cursor-pointer py-1 px-2 " onClick={() => handleCategoryChange("DL")}>
            <input type="radio" id="Repair Electronics" name="category" checked={selectedCategory === "DL"}  />
            <label htmlFor="Repair Electronics">Repair Electronics</label>
          </li>
          <li className="cursor-pointer py-1 px-2 " onClick={() => handleCategoryChange("DL")}>
            <input type="radio" id="other" name="category" checked={selectedCategory === "DL"}  />
            <label htmlFor="other">Other</label>
          </li>
        </ul>
      </div>
       <div>
    <h3 className="text-md font-semibold mb-1 mt-2">Price ($)</h3>
    {/* <ul>
      <li className="cursor-pointer py-1 px-2 " onClick={() => handleCategoryChange("clothes")}>
            <input type="radio" id="clothes" name="category" checked={selectedCategory === "clothes"} readOnly />
            <label htmlFor="clothes">Clothes</label>
      </li>
      <li className="cursor-pointer py-1 px-2 " onClick={() => handleCategoryChange("clothes")}>
            <input type="radio" id="clothes" name="category" checked={selectedCategory === "clothes"} readOnly />
            <label htmlFor="clothes">Clothes</label>
          </li>
      <li className="cursor-pointer py-1 px-2 " onClick={() => handleCategoryChange("clothes")}>
            <input type="radio" id="clothes" name="category" checked={selectedCategory === "clothes"} readOnly />
            <label htmlFor="clothes">Clothes</label>
          </li>
    </ul> */}
  </div>
</div>



      <div className="flex flex-wrap justify-center gap-4">
        {currentServices.map((service) => (
          <Link to={`/service/${service.id}`} key={service.id}>
          <div 
              key={service.id} 
              className="w-64 rounded-lg p-2 mb-4 relative hover:scale-110 hover:opacity-90 transition duration-300 ease-in-out cursor-pointer shadow-lg"
              onMouseEnter={() => handleMouseEnter(service.id)}
              onMouseLeave={handleMouseLeave}
              style={{ backgroundColor: isHovered && hoveredImage === service.id ? "#E5E7EB" : "white" }}
            >
              <div className="flex flex-col items-center relative">
                <div className="w-64 h-64 overflow-hidden mb-2 relative rounded-lg">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover rounded-lg" />
                   {isHovered && hoveredImage==service.id ? <img src={isSaved(service.id) ? savedIcon : saveIcon} alt="Save" style={saveIconStyle} onClick={() => toggleSaved(service.id)}/> : ""}

                </div>
                <p className="text-center mt-2 max-h-16 overflow-hidden whitespace-normal font-bold">{service.title}</p>
                <p className="text-gray-600">{service.rating.rate} stars</p>
                <p className="text-gray-600 text-center">Price: ${service.price}</p>
              </div>
            </div>
          </Link>
        ))}
         {/* Render empty placeholders if there are less than 8 products */}
        {currentServices.length < 8 && [...Array(8 - currentServices.length)].map((_, index) => (
          <div key={`placeholder-${index}`} className="w-64 h-64"></div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg focus:outline-none bg-slate-200 mr-4"
        >
          <FaCaretLeft /> {/* Left Icon */}
        </button>
        <p>{currentPage}</p>
        <button
          onClick={handleNextPage}
          disabled={currentServices.length < 8}
          className="px-4 py-2 border rounded-lg focus:outline-none bg-slate-200 ml-4"
        >
          <FaCaretRight /> {/* Right Icon */}
        </button>
      </div>
    </div>
  );
}

export default OurServices;