import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';

const DropBox = ({ id, label, resetAll }) => {
  const [droppedImages, setDroppedImages] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'image',
    drop: (item) => addImageToBox(item.src),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const addImageToBox = (src) => {
    setDroppedImages((prev) => [...prev, src]);
  };

  const clearBox = () => {
    setDroppedImages([]);
  };

  // Clear all boxes when the global resetAll state changes
  useEffect(() => {
    if (resetAll) {
      setDroppedImages([]);
    }
  }, [resetAll]);

  return (
    <div
      ref={drop}
      style={{
        height: '250px',
        width: '150px',
        margin: '10px',
        border: '2px dashed gray',
        backgroundColor: isOver ? 'lightgreen' : 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      <strong>{label}</strong>
      {droppedImages.length === 0 ? (
        <p style={{ marginTop: '20px' }}>Drop Here</p>
      ) : (
        droppedImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`dropped-${index}`}
            style={{ width: '90%', margin: '5px 0' }}
          />
        ))
      )}
      {/* Individual Clear Button */}
      <button
        onClick={clearBox}
        style={{
          marginTop: 'auto',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          cursor: 'pointer',
          borderRadius: '4px',
          marginBottom: '5px',
        }}
      >
        Clear Box
      </button>
    </div>
  );
};

export default DropBox;