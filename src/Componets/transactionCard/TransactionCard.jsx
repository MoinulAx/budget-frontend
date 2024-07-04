import React from 'react';
import './transactionCard.scss';
export default function TransactionCard({ element, index }) {
  return (
    <div key={index} className="transaction-card">
      <p>Transaction ID: {element.id}</p>
      <p>Name: {element.item_name}</p>
      <p className="amount">Amount: {element.amount}</p>
      <p className="date">Date: {element.date}</p>
    </div>
  );
}
