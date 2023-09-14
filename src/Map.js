import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Polygon, Tooltip, Popup } from 'react-leaflet';
import L from 'leaflet';
import { statesData } from './data';
import img1 from './assets/Group 9177.png';
import img2 from './assets/Group 9187.png';
import img3 from './assets/Group 9178.png';

const center = [40.63463151377654, -97.89969605983609];

export default function Map({ setOpenValue }) {
  const [apiD, setApiD] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [fillColor, setFillColor] = useState(statesData.features.map(() => 'green'));
  const [selectedState, setSelectedState] = useState(null);
  const [visibilityStates, setVisibilityStates] = useState(statesData.features.map(() => true));

  const fetchData = async () => {
    try {
      const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=CtjfrXiKZxlAcodiNGwgxB9S-zz4W8AiDE1M-YjaPZWZWnGtE9e-mvPEEpYnSrEp0HM0G5ZTw2YicrNY8dLb9FrKQhbMsR-Om5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnN9qIpFGl2kbI44RgyusawYb3kKTtUxt_ZUr5eI5kimfTjTsj9_-p_pgTpkGDxd_Zg44_CbVxs9MjYo34pRzBa4g56DPeGTkdNz9Jw9Md8uu&lib=MYh46KwtR1PGqq2iJu_X2srTH389liFSA');
      const data = await response.json();
      setMapData(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (mapData.length) {
      const updatedFillColor = fillColor.map((color, index) => {
        const stateName = statesData.features[index].properties.name;
        const sumSales = mapData.reduce((acc, item) => item.store_state === stateName ? acc + parseFloat(item.Actual_Sellout) : acc, 0);
        const sumTargets = mapData.reduce((acc, item) => item.store_state === stateName ? acc + parseFloat(item.Target) : acc, 0);
        return sumTargets > sumSales ? 'red' : 'green';
      });
      setFillColor(updatedFillColor);
    }
  }, [mapData]);

  const handleStateClick = (e, state, index) => {
    setOpenValue(true);
    setSelectedState(state);
    setVisibilityStates(visibilityStates.map((_, i) => i === index));
    fetchData();
  };

  return (
    <MapContainer
      center={center}
      zoom={3.5}
      style={{ width: '55vw', height: '75vh', backgroundColor: '#0000' }}
      zoomControl={false}
      attributionControl={false}
      className="rounded-lg border-[1px] border-[#DEDEDE]"
    >
      {statesData.features.map((state, index) => {
        if (!visibilityStates[index]) return null;
        const coordinates = state.geometry.coordinates[0].map(item => [item[1], item[0]]);
        const isSelected = selectedState?.properties.name === state.properties.name;
        return (
          <Polygon
            key={state.properties.name}
            pathOptions={{
              fillColor: isSelected ? '#c7f9cc' : fillColor[index],
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: isSelected ? '' : '3',
              color: 'white',
            }}
            positions={coordinates}
            eventHandlers={{
              click: (e) => handleStateClick(e, state, index),
            }}
          >
            <Tooltip direction="center" offset={[0, 0]} opacity={1} permanent className="custom-tooltip">
              {state.properties.name}
            </Tooltip>
          </Polygon>
        );
      })}
      {apiD.map((city, id) => {
        const sales = city.Actual_Sellout;
        const target = city.Target;
        let iconUrl;
        if (sales > target) {
          iconUrl = img1;
        } else if (sales === target) {
          iconUrl = img2;
        } else {
          iconUrl = img3;
        }
        const customIcon = new L.Icon({
          iconUrl: iconUrl,
          iconSize: [12, 18],
          iconAnchor: [17, 45],
          popupAnchor: [0, -45],
        });
        return (
          <Marker
            key={id}
            icon={customIcon}
            position={[city.latitude, city.longitude]}
            opacity={selectedState && city.store_state === selectedState.properties.name ? 1 : 0}
          >
            <Popup>{city.store_name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
