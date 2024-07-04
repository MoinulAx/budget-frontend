import React, { useEffect, useState } from 'react';
import TransactionCard from '../transactionCard/TransactionCard';
import './transactionLog.scss';

export default function TransactionLog({ data }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const totalAmount = data.reduce((acc, element) => acc + element.amount, 0);
      setTotal(totalAmount);
    }
  }, [data]);

  if (!data || !Array.isArray(data)) {
    return <div>Loading Your Logs</div>;
  }

  return (
    <div className="transaction-log">
      <h2>Total Amount: {total}</h2>
      {data.map((element, index) => (
        <TransactionCard key={index} element={element} />
      ))}
    </div>
  );
}
