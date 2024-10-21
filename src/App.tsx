import React, { useState } from 'react';
import QuestionnaireForm from './components/QuestionnaireForm';
import Disclaimer from './components/Disclaimer';

function App() {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Legal Aid Assistant</h1>
        <h2 className="text-xl text-gray-600">California Income and Expense Declaration (FL-150)</h2>
      </header>

      {!disclaimerAccepted ? (
        <Disclaimer onAccept={() => setDisclaimerAccepted(true)} />
      ) : (
        <QuestionnaireForm />
      )}

      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>© 2024 Legal Aid Assistant. This is a basic legal service and not a substitute for professional legal advice.</p>
      </footer>
    </div>
  );
}

export default App;