import React, { useState } from 'react';
import './ArrayVisualizer.css';

const ArrayVisualizer = () => {
  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [speed, setSpeed] = useState(500);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddToArray = () => {
    if (inputValue.trim() !== '' && !isNaN(inputValue)) {
      setArray([...array, Number(inputValue)]);
      setInputValue('');
    }
  };

  const handleClearArray = () => {
    setArray([]);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleTraversal = async () => {
    setIsAnimating(true);
    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      await sleep(speed);
    }
    setCurrentIndex(-1);
    setIsAnimating(false);
  };

  const handleDelete = async (index) => {
    setCurrentIndex(index);
    await sleep(speed);
    setArray(array.filter((_, i) => i !== index));
    setCurrentIndex(-1);
  };

  const handleInsert = async (index) => {
    if (inputValue.trim() !== '' && !isNaN(inputValue)) {
      setCurrentIndex(index);
      await sleep(speed);
      const newArray = [...array];
      newArray.splice(index, 0, Number(inputValue));
      setArray(newArray);
      setInputValue('');
      setCurrentIndex(-1);
    }
  };

  const calculateBarHeight = (value) => {
    const maxValue = Math.max(...array, value);
    return Math.max((value / maxValue) * 200, 30);
  };

  return (
    <div className="array-visualizer-page">
      <h1>Array Visualization</h1>
      <div className="array-visualizer-container">
        <div className="controls">
          <input
            type="text"
            value={inputValue}
            placeholder="Enter a number"
            onChange={handleInputChange}
          />
          <button onClick={handleAddToArray}>Add</button>
          <button onClick={handleClearArray}>Clear</button>
          <button 
            onClick={handleTraversal} 
            disabled={isAnimating}
          >
            Traverse
          </button>
          <input
            type="range"
            min="100"
            max="1000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <span>Speed: {speed}ms</span>
        </div>
        <div className="visualization-container">
          {array.map((value, index) => (
            <div
              key={index}
              className={`array-bar ${currentIndex === index ? 'active' : ''}`}
              style={{ height: `${calculateBarHeight(value)}px` }}
            >
              <div className="bar-value">{value}</div>
              <div className="bar-controls">
                <button 
                  onClick={() => handleDelete(index)}
                  disabled={isAnimating}
                >
                  Delete
                </button>
                <button 
                  onClick={() => handleInsert(index)}
                  disabled={isAnimating}
                >
                  Insert Before
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualizer;
