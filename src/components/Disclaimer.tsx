import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface DisclaimerProps {
  onAccept: () => void;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ onAccept }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full">
      <div className="flex items-center mb-4 text-yellow-600">
        <AlertCircle className="mr-2" />
        <h2 className="text-xl font-semibold">Important Information</h2>
      </div>
      <p className="mb-4 text-gray-700">
        This application provides basic legal services to assist you in filling out the California Income and Expense Declaration (FL-150) form. Please be aware of the following:
      </p>
      <ul className="list-disc pl-5 mb-4 text-gray-700">
        <li>This is not a substitute for professional legal advice.</li>
        <li>We always recommend that you talk to a legal professional in your jurisdiction.</li>
        <li>The information you provide is stored securely to complete the form and for your future reference.</li>
        <li>We do not share or sell your information to any third parties.</li>
        <li>You can request deletion of your data at any time.</li>
        <li>Ensure all information you provide is accurate and truthful.</li>
      </ul>
      <p className="mb-4 text-gray-700">
        By using this service, you acknowledge that you understand these terms and agree to our data handling practices.
      </p>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">
            I understand and agree to proceed with using this basic legal service
          </span>
        </label>
      </div>
      <button
        onClick={onAccept}
        disabled={!isChecked}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Proceed
      </button>
    </div>
  );
};

export default Disclaimer;