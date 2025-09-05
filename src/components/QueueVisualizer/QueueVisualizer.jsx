import React, { useState } from 'react';
import './QueueVisualizer.css';

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  // Handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setError(''); // Clear any error when user starts typing
  };

  // Enqueue operation
  const handleEnqueue = () => {
    if (inputValue.trim() === '' || isNaN(inputValue)) {
      setError('Please enter a valid number.');
      return;
    }
    setQueue([...queue, Number(inputValue)]);
    setInputValue('');
  };

  // Dequeue operation
  const handleDequeue = () => {
    if (queue.length === 0) {
      setError('Queue is empty! Cannot dequeue.');
      return;
    }
    setQueue(queue.slice(1)); // Remove the first element (FIFO)
  };

  return (
    <div className="queue-visualizer">
      <div className="controls">
        <input
          type="text"
          value={inputValue}
          placeholder="Enter a number"
          onChange={handleInputChange}
        />
        <button onClick={handleEnqueue}>Enqueue</button>
        <button onClick={handleDequeue}>Dequeue</button>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="queue-container">
        {queue.map((value, index) => (
          <div key={index} className="queue-item">
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueueVisualizer;
