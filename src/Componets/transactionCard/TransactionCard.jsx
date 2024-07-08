import React, { useState } from 'react';
import './transactionCard.scss';

export default function TransactionCard({ element, index, setData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [transaction, setTransaction] = useState(element);
  const API = import.meta.env.VITE_BASE_URL;

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!transaction.item_name || !transaction.amount || !transaction.date) {
      alert('Please fill out all fields.');
      return;
    }

    const transactionId = transaction.id;
    const updatedTransaction = {
      ...transaction,
      amount: parseInt(transaction.amount, 10) 
    };

    fetch(`${API}/${index}`, {
      method: "PUT",
      body: JSON.stringify(updatedTransaction),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log('Response from server:', res);
        setData(prevState => prevState.map(item => item.id === index ? res : item));
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Error submitting form:', error);
      });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      fetch(`${API}/${index}`, {
        method: "DELETE",
      })
        .then(() => {
          setData(prevState => prevState.filter(item => item.id !== transaction.id));
        })
        .catch(error => {
          console.error('Error deleting transaction:', error);
        });
    }
  };

  return (
    <div key={index} className="transaction-card">
      <p>Transaction ID: {transaction.id}</p>
      <p>Name: {transaction.item_name}</p>
      <p className="amount">Amount: {transaction.amount}</p>
      <p className="date">Date: {transaction.date}</p>
      <button onClick={handleToggleExpand}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      <button onClick={handleDelete} className="delete-button">
        Delete
      </button>
      {isExpanded && (
        <>
          {isEditing ? (
            <form className="edit-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="item_name"
                value={transaction.item_name}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="amount"
                value={transaction.amount}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="date"
                value={transaction.date}
                onChange={handleChange}
                required
              />
              <button type="submit">Save</button>
            </form>
          ) : (
            <>
              <div className="expanded-content">
                <p>Category: {transaction.category}</p>
              </div>
              <button onClick={handleToggleEdit}>
                Edit
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
