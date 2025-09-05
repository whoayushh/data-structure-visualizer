import React, { useState } from 'react';
import './LinkedListVisualizer.css';

// Node class to represent a node in the Linked List
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const LinkedListVisualizer = () => {
  const [inputValues, setInputValues] = useState('');
  const [head, setHead] = useState(null);
  const [error, setError] = useState('');

  // Build the linked list from the input values
  const buildLinkedList = (values) => {
    if (values.length === 0) return null;

    const headNode = new ListNode(values[0]);
    let currentNode = headNode;

    for (let i = 1; i < values.length; i++) {
      currentNode.next = new ListNode(values[i]);
      currentNode = currentNode.next;
    }

    return headNode;
  };

  // Handle the creation of the linked list
  const handleBuildLinkedList = () => {
    const values = inputValues
      .split(',')
      .map((item) => item.trim())
      .map((item) => parseInt(item));

    if (values.some((val) => isNaN(val))) {
      setError('Please enter valid numbers.');
      return;
    }

    const linkedListHead = buildLinkedList(values);
    setHead(linkedListHead);
    setError('');
  };

  // Remove the head node of the linked list
  const handleRemoveNode = () => {
    if (head) {
      setHead(head.next); // Move head to the next node
    }
  };

  // Function to render the linked list dynamically
  const renderLinkedList = (node) => {
    const nodes = [];
    let currentNode = node;

    while (currentNode) {
      nodes.push(
        <React.Fragment key={currentNode.value}>
          <div className="linked-list-node">
            <div className="node-value">{currentNode.value}</div>
          </div>
          {currentNode.next && <span className="arrow">→</span>}
        </React.Fragment>
      );
      currentNode = currentNode.next;
    }

    return <div className="linked-list">{nodes}</div>;
  };

  return (
    <div className="linked-list-visualizer">
      <div className="controls">
        <input
          type="text"
          value={inputValues}
          onChange={(e) => setInputValues(e.target.value)}
          placeholder="Enter node values (comma-separated)"
        />
        <button onClick={handleBuildLinkedList}>Build Linked List</button>
        <button onClick={handleRemoveNode} disabled={!head}>Remove Head Node</button>
      </div>
      {error && <div className="error">{error}</div>}
      {head && (
        <div>
          <h3>Linked List Visualization</h3>
          {renderLinkedList(head)}
        </div>
      )}
      {!head && <p>The linked list is empty.</p>}
    </div>
  );
};

export default LinkedListVisualizer;
