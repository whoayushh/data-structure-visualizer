import React, { useState } from 'react';
// import './App.css';
import './index.css';
import ArrayVisualizer from './components/ArrayVisualizer/ArrayVisualizer';
import StackVisualizer from './components/StackVisualizer/StackVisualizer';
import QueueVisualizer from './components/QueueVisualizer/QueueVisualizer';
import BinarySearchVisualizer from './components/BinarySearchVisualizer/BinarySearchVisualizer';
import LinkedListVisualizer from './components/LinkedListVisualizer/LinkedListVisualizer';

function App() {
  const [selectedDS, setSelectedDS] = useState('');

  const renderVisualizer = () => {
    switch (selectedDS) {
      case 'Array':
        return <ArrayVisualizer />;
      case 'Stack':
        return <StackVisualizer />;
      case 'Queue':
        return <QueueVisualizer />;
      case 'BinarySearch':
        return <BinarySearchVisualizer />;
      case 'LinkedList':
        return <LinkedListVisualizer />;
      default:
        return <p>Please select a data structure to visualize.</p>;
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Data Structure Visualizer</h1>
      </header>
      <main>
        <div className="selector">
          <label htmlFor="ds-select">Choose a Data Structure:</label>
          <select
            id="ds-select"
            value={selectedDS}
            onChange={(e) => setSelectedDS(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="Array">Array</option>
            <option value="Stack">Stack</option>
            <option value="Queue">Queue</option>
            <option value="BinarySearch">Binary Search</option>
            <option value="LinkedList">Linked List</option>
          </select>
        </div>
        {renderVisualizer()}
      </main>
    </div>
  );
}

export default App;
