import React, { useEffect, useState } from 'react';
import TransactionCard from '../transactionCard/TransactionCard';
import './transactionLog.scss';

export default function TransactionLog({ data, setData }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const totalAmount = data.reduce((acc, element) => {
        const amount = parseInt(element.amount, 10);
        return isNaN(amount) ? acc : acc + amount;
      }, 0);
      setTotal(totalAmount);
    }
  }, [data]);

  if (!data || !Array.isArray(data)) {
    return <div>Loading Your Logs</div>;
  }

  return (
    <div className="transaction-log">
      <h2>Total Amount: {total}</h2>
      {data.map((element) => (
        <TransactionCard key={element.id} element={element} setData={setData} index={element.id} />
      ))}
    </div>
  );
}
