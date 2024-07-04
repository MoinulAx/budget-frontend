// HomePage.jsx

import React from 'react';
import './homePage.scss'; // Import SCSS file

export default function HomePage() {
    return (
        <div className="home-page">
            <header>
                <h1>Welcome to Your Budgeting App</h1>
                <p>Track your finances, set goals, and manage your money effectively.</p>
            </header>
            <main>
                <section>
                    <h2>Track Your Spending</h2>
                    <p>Monitor your expenses by category and analyze your spending habits.</p>
                </section>
                <section>
                    <h2>Set Financial Goals</h2>
                    <p>Plan and achieve your savings targets with personalized goals.</p>
                </section>
                <section>
                    <h2>Stay Organized</h2>
                    <p>Keep all your financial information organized and accessible.</p>
                </section>
            </main>
            <footer>
                <p>&copy; rummy</p>
            </footer>
        </div>
    );
}
