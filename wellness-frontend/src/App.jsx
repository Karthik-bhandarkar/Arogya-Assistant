import React, { useState } from 'react';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-brand mb-2">Arogya Wellness Assistant</h1>
                <p className="text-gray-600">Your AI-powered wellness companion</p>
            </header>

            <main className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <p className="mb-4">Welcome! The frontend is now set up.</p>
                    <button
                        className="px-4 py-2 bg-brand text-white rounded hover:bg-brand-dark transition-colors"
                        onClick={() => setCount(c => c + 1)}
                    >
                        Count is {count}
                    </button>
                </div>
            </main>
        </div>
    );
}

export default App;
