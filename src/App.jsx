import React, { useEffect, useState } from 'react';
import './App.css';
import Details from './components/Details';
import { FaSearch } from 'react-icons/fa';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [currentItem, setCurrentItem] = useState(null);
  const [resourceType, setResourceType] = useState('image');
  const [data, setData] = useState([]);
  const [banList, setBanList] = useState([]);
  const [banAttributes, setBanAttributes] = useState([]);
  const [viewedHistory, setViewedHistory] = useState([]);

  const makeQuery = async () => {
    try {
      const query = `https://api.harvardartmuseums.org/${resourceType}?apikey=${ACCESS_KEY}&size=100`;
      const response = await fetch(query);
      const responseData = await response.json();
      setData(responseData.records);
      showRandomItem(responseData.records);
    } catch (error) {
      console.error(error);
    }
  };

  const showRandomItem = (data) => {
    if (data.length > 0) {
      const filteredData = data.filter((item) => !isBanned(item));
      if (filteredData.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredData.length);
        const randomItem = filteredData[randomIndex];
        setCurrentItem(randomItem);
        // Add the current item to the viewed history
        setViewedHistory([...viewedHistory, randomItem]);
      } else {
        setCurrentItem(null); // No items to display
      }
    } else {
      setCurrentItem(null); // No items to display
    }
  };

  const isBanned = (item) => {
    return banAttributes.some((attribute) => item[attribute.type] === attribute.value);
  };

  const handleChange = (type, value) => {
    const attribute = { type, value };
    setBanAttributes([...banAttributes, attribute]);
    filterDataAndShowRandomItem();
  };

  const removeFromBanList = (type, value) => {
    const updatedBanAttributes = banAttributes.filter((attribute) => attribute.type !== type || attribute.value !== value);
    setBanAttributes(updatedBanAttributes);
    filterDataAndShowRandomItem();
  };

  const filterDataAndShowRandomItem = () => {
    const filteredData = data.filter((item) => !isBanned(item));
    setData(filteredData);
    showRandomItem(filteredData);
  };

  const submitForm = (e) => {
    e.preventDefault();
    makeQuery();
  };

  return (
    <div className="App">
      <div className="banListContainer">
        <h3>Select attributes to ban</h3>
        <ul className='banList'>
          {banAttributes.map((attribute, index) => (
            <li key={index} onClick={() => removeFromBanList(attribute.type, attribute.value)}>
              {attribute.value}
            </li>
          ))}
        </ul>
      </div>
      <div className='artWork'>
        <h1>Harvard Art Museum</h1>
        <h2>Get New Artwork</h2>
        {currentItem && <Details item={currentItem} handleChange={handleChange} />}
        <button onClick={submitForm}>Discover <FaSearch /></button>
      </div>
      
      <div className="viewedHistory">
        <h3>Viewed History</h3>
        <ul className='viewedHistoryList'>
          {viewedHistory.map((item, index) => (
            <li key={index}>{item.copyright} - {item.date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
