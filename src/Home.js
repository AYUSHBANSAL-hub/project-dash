import React, { useState, useEffect, useContext } from 'react';
import Map from './Map';
import QuadrantChart from './QuadrantChart';
import { AppContext } from './AppContext';

const Home = () => {
  const { searchValue } = useContext(AppContext);
  
  const [apiData, setApiData] = useState([]);
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    // Fetch data based on the searchValue (e.g., selected week)
    // This is a placeholder; replace with your actual API call
    fetch(`/api/data?week=${searchValue}`)
      .then(response => response.json())
      .then(data => setApiData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [searchValue]);

  const handleCarrierSelect = (carrier) => {
    setSelectedCarrier(carrier);
  };

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
  };

  return (
    <div className="home">
      <div className="home-filters">
        {/* Placeholder for carrier and device selection */}
        <button onClick={() => handleCarrierSelect('Verizon')}>Verizon</button>
        <button onClick={() => handleDeviceSelect('Pixel 7 Pro')}>Pixel 7 Pro</button>
      </div>
      <div className="home-content">
        <Map data={apiData} />
        <QuadrantChart data={apiData} />
      </div>
    </div>
  );
};

export default Home;
