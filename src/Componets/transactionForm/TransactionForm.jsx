import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './transactionForms.scss'; 

export default function TransactionForm({ setData }) {
    const API = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    const initialTransactionData = {
        item_name: '',
        amount: '', 
        date: '',
        from: '',
        category: ''
    };

    const [transactionData, setTransactionData] = useState(initialTransactionData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'amount') {
            const parsedValue = parseFloat(value);
            if (!isNaN(parsedValue)) { 
                setTransactionData(prevState => ({
                    ...prevState,
                    [name]: parsedValue
                }));
            } else {
                setTransactionData(prevState => ({
                    ...prevState,
                    [name]: '' 
                }));
            }
        } else {
            setTransactionData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(API, {
            method: "POST",
            body: JSON.stringify(transactionData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log('Response from server:', res);
            setData(prevState => [...prevState, res]);
            navigate("/logs");
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });
    };

    return (
        <div className="transaction-form-container">
            <div className="transaction-form">
                <h2>Transaction Form</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Item Name:</label>
                        <input
                            type="text"
                            name="item_name"
                            value={transactionData.item_name}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter Item Name"
                        />
                    </div>
                    <div>
                        <label>Amount:</label>
                        <input
                            type="text"
                            name="amount"
                            value={transactionData.amount}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter Amount"
                        />
                    </div>
                    <div>
                        <label>Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={transactionData.date}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label>From:</label>
                        <input
                            type="text"
                            name="from"
                            value={transactionData.from}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter From"
                        />
                    </div>
                    <div>
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={transactionData.category}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter Category"
                        />
                    </div>
                    <br />
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
}
