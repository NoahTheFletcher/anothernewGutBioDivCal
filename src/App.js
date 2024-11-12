import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragImage from './components/DragImage';
import DropBox from './components/DropBox';
import axios from 'axios';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [resetAll, setResetAll] = useState(false);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Fetch images from Pixabay based on user query
  const fetchImages = async (query) => {
    const API_KEY = '46431107-7050ca08745535f836ac095c5';
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&per_page=10`
      );
      setImages(response.data.hits);
    } catch (error) {
      console.error("Error fetching images from Pixabay", error);
    }
  };

  // Handle search input changes
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Trigger search when user submits the form
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImages(searchQuery);
  };

  const handleClearAll = () => {
    setResetAll(true);
    setTimeout(() => setResetAll(false), 100); // Reset the toggle after clearing
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>Search and Drag the Fruits and Vegetables into the Days of the Week</h1>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search for fruits or vegetables"
          />
          <button type="submit">Search</button>
        </form>

        {/* Global Clear Button */}
        <button onClick={handleClearAll} className="clear-all-button">Clear All Boxes</button>

        {/* Display Search Results as Draggable Images */}
        <div className="drag-area">
          {images.length === 0 ? (
            <p>Enter a search term to find images</p>
          ) : (
            images.map((image) => (
              <DragImage key={image.id} src={image.webformatURL} />
            ))
          )}
        </div>

        {/* Drop Area for Days of the Week */}
        <div className="drop-area">
          {daysOfWeek.map((day, index) => (
            <DropBox key={index} id={index} label={day} resetAll={resetAll} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;