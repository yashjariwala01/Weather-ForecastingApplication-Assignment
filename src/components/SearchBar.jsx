
// // export default SearchBar;
// import React, { useState } from 'react';
// import { CiSearch } from "react-icons/ci";

// function SearchBar({ onSearch }) {
//   const [location, setLocation] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(location);
//     setLocation('');
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <form className='input-wrapper' onSubmit={handleSubmit}>
//         <input
//           className='w-32 md:w-48 p-2 border border-gray-300 rounded-md focus:outline-none text-black'
//           type="text"
//           placeholder="Enter location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         />
//         <button className='flex items-center justify-center gap-1 p-1 ml-2 bg-blue-500 text-white rounded-md focus:outline-none' type="submit">Search</button>
//       </form>
//     </div>
//   );
// }

// export default SearchBar;


import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";

function SearchBar({ onSearch }) {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(location);
    setLocation('');
  };

  return (
    <div className="flex items-center justify-center">
      <form className='input-wrapper flex items-center' onSubmit={handleSubmit}>
        <input
          className='w-full sm:w-64 md:w-72 lg:w-96 p-1 border border-gray-300 rounded-md justify-center items-center lg:ml-16 focus:outline-none text-black'
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className='flex items-center justify-center gap-1 p-1 ml-2 bg-blue-500 text-white rounded-md focus:outline-none' type="submit">
          <CiSearch />
          <span className="hidden sm:inline">Search</span>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
