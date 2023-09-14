import React, { useState } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import { AppProvider } from './AppContext';

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <AppProvider value={{ searchValue, setSearchValue }}>
      <div className="App bg-[#F6F7FA]">
        <Navbar />
        <div className="px-[28px] pb-[26px]">
          <Home />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
