import React, { useState } from 'react';
import './BinarySearchVisualizer.css';

const BinarySearchVisualizer = () => {
  const [arr, setArr] = useState('');
  const [target, setTarget] = useState('');
  const [steps, setSteps] = useState([]);
  const [found, setFound] = useState(false);
  const [error, setError] = useState('');

  // Handle array input change
  const handleArrayChange = (event) => {
    setArr(event.target.value);
    setError(''); // Clear error when user starts typing
  };

  // Handle target input change
  const handleTargetChange = (event) => {
    setTarget(event.target.value);
    setError(''); // Clear error when user starts typing
  };

  // Binary Search function
  const binarySearch = (array, target) => {
    let low = 0;
    let high = array.length - 1;
    const steps = [];

    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      steps.push({
        low,
        high,
        mid,
        midValue: array[mid],
      });

      if (array[mid] === target) {
        setFound(true);
        return steps;
      } else if (array[mid] < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    setFound(false);
    return steps;
  };

  // Handle the start of the search
  const handleSearch = () => {
    const parsedArray = arr
      .split(',')
      .map((num) => parseInt(num.trim()))
      .sort((a, b) => a - b);

    const parsedTarget = parseInt(target);

    if (isNaN(parsedTarget)) {
      setError('Please enter a valid target number.');
      return;
    }
    if (parsedArray.some((item) => isNaN(item))) {
      setError('Please enter a valid array of numbers.');
      return;
    }

    const searchSteps = binarySearch(parsedArray, parsedTarget);
    setSteps(searchSteps);
  };

  return (
    <div className="binary-search-visualizer">
      <div className="controls">
        <input
          type="text"
          value={arr}
          placeholder="Enter sorted array (comma-separated)"
          onChange={handleArrayChange}
        />
        <input
          type="text"
          value={target}
          placeholder="Enter target value"
          onChange={handleTargetChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <div className="error">{error}</div>}
      {found !== null && (
        <div className={found ? 'found' : 'not-found'}>
          {found ? 'Target Found!' : 'Target Not Found!'}
        </div>
      )}
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <div className="step-info">
              <p>Step {index + 1}:</p>
              <p>
                Low: {step.low}, High: {step.high}, Mid: {step.mid}, Mid Value: {step.midValue}
              </p>
            </div>
            <div className="array-container">
              {arr
                .split(',')
                .map((num, idx) => (
                  <div
                    key={idx}
                    className={`array-item ${
                      idx >= step.low && idx <= step.high
                        ? 'highlighted'
                        : ''
                    } ${step.mid === idx ? 'mid' : ''}`}
                  >
                    {num.trim()}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BinarySearchVisualizer;
