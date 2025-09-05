import React, { useState } from 'react';
import './StackVisualizer.css';

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [history, setHistory] = useState([]);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setError('');
  };

  const handlePush = async () => {
    if (inputValue.trim() === '' || isNaN(inputValue)) {
      setError('Please enter a valid number.');
      return;
    }
    setIsAnimating(true);
    const newValue = Number(inputValue);
    setHistory(prev => [...prev, [...stack]]); // Save current state for undo
    setStack(prev => [...prev, newValue]);
    setActiveIndex(stack.length);
    await sleep(speed);
    setActiveIndex(-1);
    setIsAnimating(false);
    setInputValue('');
  };

  const handlePop = async () => {
    if (stack.length === 0) {
      setError('Stack is empty! Cannot pop.');
      return;
    }
    setIsAnimating(true);
    setActiveIndex(stack.length - 1);
    await sleep(speed);
    setHistory(prev => [...prev, [...stack]]); // Save current state for undo
    setStack(prev => prev.slice(0, -1));
    setActiveIndex(-1);
    setIsAnimating(false);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    setStack(history[history.length - 1]);
    setHistory(prev => prev.slice(0, -1)); // Remove last state from history
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear the stack?")) {
      setStack([]);
      setError('');
    }
  };

  return (
    <div className="stack-visualizer">
      <div className="controls">
        <input
          type="text"
          value={inputValue}
          placeholder="Enter a number"
          onChange={handleInputChange}
          disabled={isAnimating}
          title="Enter a number to push onto the stack"
        />
        <button onClick={handlePush} disabled={isAnimating} title="Add an item to the stack">Push</button>
        <button onClick={handlePop} disabled={isAnimating} title="Remove the top item from the stack">Pop</button>
        <button onClick={handleUndo} disabled={isAnimating || history.length === 0} title="Undo the last operation">Undo</button>
        <button onClick={handleClear} disabled={isAnimating} title="Clear the stack">Clear</button>
        <div className="speed-control">
          <input
            type="range"
            min="100"
            max="1000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <span>Speed: {speed}ms</span>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="stack-info">
        <p>Size: {stack.length}</p>
        <p>Top: {stack.length > 0 ? stack[stack.length - 1] : 'Empty'}</p>
      </div>
      <div className="stack-container">
        {stack.map((value, index) => (
          <div
            key={index}
            className={`stack-item ${activeIndex === index ? 'active' : ''}`}
            style={{
              transform: `translateY(${isAnimating && index === stack.length - 1 ? '-10px' : '0'})`,
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackVisualizer;