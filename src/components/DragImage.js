import React from 'react';
import { useDrag } from 'react-dnd';

const DragImage = ({ src }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'image',
    item: { src },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={src}
      alt="draggable"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        width: '150px',
        height: '150px',
        margin: '10px',
      }}
    />
  );
};

export default DragImage;
