import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import QuadrantChart from './QuadrantChart';

const Filters = ({ isFilterOpen, setIsFilterOpen }) => {
  const toggleFilter = () => {
    setIsFilterOpen(prevState => !prevState);
  };

  return (
    <aside
      className={`filtersContainer fixed top-0 h-screen flex flex-col p-3 gap-3 overflow-auto
        transition-all ease-in-out duration-300 bg-white z-30 ${isFilterOpen ? 'right-0 w-[65vw]' : '-right-96 w-0'}`}
      style={{ zIndex: 999 }}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Product Chart</h1>
        <AiOutlineClose className="text-xl cursor-pointer" onClick={toggleFilter} />
      </div>
      <div>
        <QuadrantChart />
      </div>
    </aside>
  );
};

export default Filters;
