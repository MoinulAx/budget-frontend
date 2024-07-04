import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './transactionForms.scss'; // Adjust path as needed


export default function TransactionForm({setData}) {
    const API = import.meta.env.VITE_BASE_URL

    const navigate = useNavigate()

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
        
        setTransactionData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(API, {
            method: "POST",
            body: JSON.stringify(transactionData),
            headers: {
                "Content-Type": "application/json" // Corrected content type
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log('Response from server:', res);
            setData(prevState => [...prevState, res]); // Update state with new data
            navigate("/logs"); // Navigate to /logs route
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            // Handle error if needed
        });
    };
    

    return (
        <div className="transaction-form-container">
            <div className="transaction-form">
                <h2>Transaction Form</h2>
                <form onSubmit={handleSubmit}>
                    {Object.keys(initialTransactionData).map((key) => (
                        <div key={key}>
                            <label>{key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}</label>
                            <input
                                type="text"
                                name={key}
                                value={transactionData[key]}
                                onChange={handleChange}
                                className="input-field"
                                placeholder={`Enter ${key}`}
                            />
                        </div>
                    ))}
                    <br />
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
}
