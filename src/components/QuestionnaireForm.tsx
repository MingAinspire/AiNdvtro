import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Check, Download, Save, Upload } from 'lucide-react';

const sections = [
  { title: "Case Information", questions: ['name', 'address', 'phone', 'email', 'courtName', 'courtAddress', 'caseNumber', 'petitioner', 'respondent'] },
  { title: "1. Employment", questions: ['employer', 'employerAddress', 'employerPhone', 'occupation', 'dateStarted', 'hoursPerWeek', 'salary'] },
  { title: "2. Age and Education", questions: ['age', 'education', 'degrees', 'licenses'] },
  { title: "3. Tax Information", questions: ['lastTaxYear', 'filingStatus', 'state', 'exemptions'] },
  { title: "4. Other Party's Income", questions: ['otherPartyIncome', 'incomeEstimateBasis'] },
  { title: "5. Income (Last 12 Months)", questions: ['salaryWages', 'overtime', 'commissions', 'publicAssistance', 'spousalSupport', 'pension', 'socialSecurity', 'disability', 'unemployment', 'workersComp', 'otherIncome'] },
  { title: "6. Investment Income", questions: ['dividends', 'rentalIncome', 'trustIncome', 'otherInvestmentIncome'] },
  { title: "7. Self-Employment", questions: ['businessType', 'businessYears', 'businessName'] },
  { title: "8. Additional Income", questions: ['oneTimeIncome'] },
  { title: "9. Change in Income", questions: ['incomeChange'] },
  { title: "10. Deductions", questions: ['unionDues', 'retirementContributions', 'healthInsurance', 'childSupport', 'spousalSupport', 'jobExpenses'] },
  { title: "11. Assets", questions: ['cashAccounts', 'stocks', 'realEstate'] },
  { title: "12. People Living with You", questions: ['householdMembers'] },
  { title: "13. Average Monthly Expenses", questions: ['rentMortgage', 'propertyTaxes', 'insurance', 'maintenance', 'foodSupplies', 'utilities', 'telephone', 'laundry', 'clothes', 'education', 'entertainment', 'autoExpenses', 'installmentPayments', 'otherExpenses'] },
  { title: "14. Installment Payments and Debts", questions: ['debts'] },
  { title: "15. Children Information", questions: ['childrenCount', 'childrenTimeShare', 'parentingSchedule'] },
  { title: "16. Children's Health-Care Expenses", questions: ['childrenHealthInsurance', 'insuranceCompany', 'insuranceCost'] },
  { title: "17. Additional Children's Expenses", questions: ['childCare', 'childHealthCare', 'travelExpenses', 'educationalExpenses'] },
  { title: "18. Special Hardships", questions: ['healthExpenses', 'catastrophicLosses', 'childrenExpenses', 'otherHardships'] },
  { title: "19. Additional Information", questions: ['additionalInfo'] }
];

const questions = [
  { id: 'name', question: "What is your full name?", type: "text", required: true },
  { id: 'address', question: "What is your current address?", type: "text", required: true },
  { id: 'phone', question: "What is your phone number?", type: "tel", required: true },
  { id: 'email', question: "What is your email address?", type: "email", required: true },
  { id: 'courtName', question: "What is the name of the court?", type: "text", required: true },
  { id: 'courtAddress', question: "What is the address of the court?", type: "text", required: true },
  { id: 'caseNumber', question: "What is your case number?", type: "text", required: true },
  { id: 'petitioner', question: "Who is the petitioner?", type: "text", required: true },
  { id: 'respondent', question: "Who is the respondent?", type: "text", required: true },
  { id: 'employer', question: "What is the name of your employer?", type: "text", required: true },
  { id: 'employerAddress', question: "What is your employer's address?", type: "text", required: true },
  { id: 'employerPhone', question: "What is your employer's phone number?", type: "tel", required: true },
  { id: 'occupation', question: "What is your occupation?", type: "text", required: true },
  { id: 'dateStarted', question: "When did you start this job?", type: "date", required: true },
  { id: 'hoursPerWeek', question: "How many hours do you work per week?", type: "number", required: true },
  { id: 'salary', question: "What is your salary or wage?", type: "number", required: true },
  { id: 'age', question: "What is your age?", type: "number", required: true },
  { id: 'education', question: "What is your highest level of education?", type: "text", required: true },
  { id: 'degrees', question: "What degrees do you have?", type: "text", required: false },
  { id: 'licenses', question: "Do you have any professional licenses? If yes, please specify.", type: "text", required: false },
  { id: 'lastTaxYear', question: "What was the last tax year you filed?", type: "number", required: true },
  { id: 'filingStatus', question: "What is your tax filing status?", type: "select", options: ["Single", "Married Filing Jointly", "Married Filing Separately", "Head of Household"], required: true },
  { id: 'state', question: "In which state do you file taxes?", type: "text", required: true },
  { id: 'exemptions', question: "How many exemptions do you claim?", type: "number", required: true },
  { id: 'otherPartyIncome', question: "What do you estimate the other party's monthly income to be?", type: "number", required: true },
  { id: 'incomeEstimateBasis', question: "What is this estimate based on?", type: "text", required: true },
  { id: 'salaryWages', question: "What is your monthly salary or wages (before taxes)?", type: "number", required: true },
  { id: 'overtime', question: "How much overtime do you earn monthly?", type: "number", required: false },
  { id: 'commissions', question: "How much do you earn in commissions monthly?", type: "number", required: false },
  { id: 'publicAssistance', question: "Do you receive any public assistance? If yes, how much monthly?", type: "number", required: false },
  { id: 'spousalSupport', question: "Do you receive spousal support? If yes, how much monthly?", type: "number", required: false },
  { id: 'pension', question: "Do you receive pension? If yes, how much monthly?", type: "number", required: false },
  { id: 'socialSecurity', question: "Do you receive Social Security? If yes, how much monthly?", type: "number", required: false },
  { id: 'disability', question: "Do you receive disability payments? If yes, how much monthly?", type: "number", required: false },
  { id: 'unemployment', question: "Do you receive unemployment? If yes, how much monthly?", type: "number", required: false },
  { id: 'workersComp', question: "Do you receive workers compensation? If yes, how much monthly?", type: "number", required: false },
  { id: 'otherIncome', question: "Do you have any other income? If yes, how much monthly?", type: "number", required: false },
  { id: 'dividends', question: "How much do you receive in dividends/interest monthly?", type: "number", required: false },
  { id: 'rentalIncome', question: "How much rental income do you receive monthly?", type: "number", required: false },
  { id: 'trustIncome', question: "How much trust income do you receive monthly?", type: "number", required: false },
  { id: 'otherInvestmentIncome', question: "Do you have any other investment income? If yes, how much monthly?", type: "number", required: false },
  { id: 'businessType', question: "If self-employed, what type of business do you have?", type: "text", required: false },
  { id: 'businessYears', question: "How many years have you been in this business?", type: "number", required: false },
  { id: 'businessName', question: "What is the name of your business?", type: "text", required: false },
  { id: 'oneTimeIncome', question: "Have you received any one-time money in the last 12 months? If yes, how much?", type: "number", required: false },
  { id: 'incomeChange', question: "Has your income changed in the last 12 months? If yes, please explain.", type: "textarea", required: false },
  { id: 'unionDues', question: "How much do you pay in union dues monthly?", type: "number", required: false },
  { id: 'retirementContributions', question: "How much do you contribute to retirement monthly?", type: "number", required: false },
  { id: 'healthInsurance', question: "How much do you pay for health insurance monthly?", type: "number", required: true },
  { id: 'childSupport', question: "How much child support do you pay monthly?", type: "number", required: false },
  { id: 'spousalSupport', question: "How much spousal support do you pay monthly?", type: "number", required: false },
  { id: 'jobExpenses', question: "Do you have any necessary job-related expenses? If yes, how much monthly?", type: "number", required: false },
  { id: 'cashAccounts', question: "What is the total in your cash accounts?", type: "number", required: true },
  { id: 'stocks', question: "What is the value of your stocks and other assets?", type: "number", required: false },
  { id: 'realEstate', question: "What is the value of your real estate?", type: "number", required: false },
  { id: 'householdMembers', question: "Who lives with you? (Name, age, relationship, income)", type: "textarea", required: true },
  { id: 'rentMortgage', question: "How much do you pay for rent or mortgage monthly?", type: "number", required: true },
  { id: 'propertyTaxes', question: "How much do you pay in property taxes monthly?", type: "number", required: false },
  { id: 'insurance', question: "How much do you pay for homeowner's/renter's insurance monthly?", type: "number", required: true },
  { id: 'maintenance', question: "How much do you spend on home maintenance monthly?", type: "number", required: false },
  { id: 'foodSupplies', question: "How much do you spend on food and household supplies monthly?", type: "number", required: true },
  { id: 'utilities', question: "How much do you pay for utilities monthly?", type: "number", required: true },
  { id: 'telephone', question: "How much do you pay for telephone and cell phone monthly?", type: "number", required: true },
  { id: 'laundry', question: "How much do you spend on laundry and cleaning monthly?", type: "number", required: false },
  { id: 'clothes', question: "How much do you spend on clothing monthly?", type: "number", required: true },
  { id: 'education', question: "How much do you spend on education monthly?", type: "number", required: false },
  { id: 'entertainment', question: "How much do you spend on entertainment, gifts, and vacation monthly?", type: "number", required: true },
  { id: 'autoExpenses', question: "How much are your auto expenses monthly?", type: "number", required: true },
  { id: 'installmentPayments', question: "How much do you pay in installment payments monthly?", type: "number", required: false },
  { id: 'otherExpenses', question: "Do you have any other expenses? If yes, how much monthly?", type: "number", required: false },
  { id: 'debts', question: "List your debts (creditor, purpose, amount, last payment date)", type: "textarea", required: false },
  { id: 'childrenCount', question: "How many children do you have with the other party in this case?", type: "number", required: false },
  { id: 'childrenTimeShare', question: "What percentage of time do the children spend with each parent?", type: "text", required: false },
  { id: 'parentingSchedule', question: "Describe your parenting schedule", type: "textarea", required: false },
  { id: 'childrenHealthInsurance', question: "Do you have health insurance available for the children?", type: "select", options: ["Yes", "No"], required: false },
  { id: 'insuranceCompany', question: "If yes, what is the name of the insurance company?", type: "text", required: false },
  { id: 'insuranceCost', question: "How much is the monthly cost for the children's health insurance?", type: "number", required: false },
  { id: 'childCare', question: "How much do you pay for child care monthly?", type: "number", required: false },
  { id: 'childHealthCare', question: "How much do you pay for children's health care not covered by insurance monthly?", type: "number", required: false },
  { id: 'travelExpenses', question: "How much do you pay for travel expenses related to visitation monthly?", type: "number", required: false },
  { id: 'educationalExpenses', question: "How much do you pay for children's educational or other special needs monthly?", type: "number", required: false },
  { id: 'healthExpenses', question: "Do you have any extraordinary health expenses? If yes, explain and provide amount.", type: "textarea", required: false },
  { id: 'catastrophicLosses', question: "Have you suffered any major losses not covered by insurance? If yes, explain and provide amount.", type: "textarea", required: false },
  { id: 'childrenExpenses', question: "Do you have expenses for children from other relationships? If yes, explain and provide amount.", type: "textarea", required: false },
  { id: 'otherHardships', question: "Do you have any other special hardships? If yes, explain.", type: "textarea", required: false },
  { id: 'additionalInfo', question: "Is there any additional information you would like the court to know?", type: "textarea", required: false },
];

const QuestionnaireForm: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('fl150FormData');
    if (savedData) {
      setAnswers(JSON.parse(savedData));
    }
  }, []);

  const getCurrentSection = () => sections[currentSection];
  const getCurrentQuestion = () => questions.find(q => q.id === getCurrentSection().questions[currentQuestion]);

  const handleNext = () => {
    if (currentQuestion < getCurrentSection().questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentQuestion(sections[currentSection - 1].questions.length - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAnswers({ ...answers, [getCurrentQuestion()?.id ?? '']: e.target.value });
  };

  const renderInput = () => {
    const question = getCurrentQuestion();
    if (!question) return null;

    switch (question.type) {
      case 'select':
        return (
          <select
            value={answers[question.id] || ''}
            onChange={handleInputChange}
            required={question.required}
            className="w-full p-2 border rounded"
          >
            <option value="">Select an option</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            value={answers[question.id] || ''}
            onChange={handleInputChange}
            required={question.required}
            className="w-full p-2 border rounded"
            rows={4}
          />
        );
      default:
        return (
          <input
            type={question.type}
            value={answers[question.id] || ''}
            onChange={handleInputChange}
            required={question.required}
            className="w-full p-2 border rounded"
          />
        );
    }
  };

  const isFormComplete = () => {
    const requiredFields = questions.filter(q => q.required).map(q => q.id);
    return requiredFields.every(field => answers[field] && answers[field].trim() !== '');
  };

  const handleSubmit = async () => {
    if (isFormComplete()) {
      // Here you would typically send the data to your backend to generate the PDF
      // For now, we'll just simulate this process
      alert("Form submitted successfully! In a real application, this would generate your FL-150 PDF.");
    } else {
      alert("Please fill out all required fields before submitting.");
    }
  };

  const handleSaveData = () => {
    localStorage.setItem('fl150FormData', JSON.stringify(answers));
    alert('Your information has been saved. You can load it next time you use this form.');
  };

  const handleLoadData = () => {
    const savedData = localStorage.getItem('fl150FormData');
    if (savedData) {
      setAnswers(JSON.parse(savedData));
      alert('Your previously saved information has been loaded.');
    } else {
      alert('No saved information found.');
    }
  };

  const isLastQuestion = currentSection === sections.length - 1 && currentQuestion === getCurrentSection().questions.length - 1;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full">
      <h2 className="text-xl font-semibold mb-4">{getCurrentSection().title}</h2>
      <div className="mb-4">
        <p className="mb-2">{getCurrentQuestion()?.question}</p>
        {renderInput()}
      </div>
      <div className="flex justify-between mb-4">
        <button
          onClick={handlePrevious}
          disabled={currentSection === 0 && currentQuestion === 0}
          className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          <ArrowLeft className="mr-2" size={16} />
          Previous
        </button>
        {isLastQuestion ? (
          <button
            onClick={handleSubmit}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <Check className="mr-2" size={16} />
            Submit and Generate PDF
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next
            <ArrowRight className="ml-2" size={16} />
          </button>
        )}
      </div>
      <div className="flex justify-between mb-4">
        <button
          onClick={handleSaveData}
          className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          <Save className="mr-2" size={16} />
          Save Progress
        </button>
        <button
          onClick={handleLoadData}
          className="flex items-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          <Upload className="mr-2" size={16} />
          Load Saved Data
        </button>
      </div>
      {pdfUrl && (
        <a
          href={pdfUrl}
          download="FL-150-filled.pdf"
          className="flex items-center px-4 py-2 mt-4 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          <Download className="mr-2" size={16} />
          Download Filled FL-150 Form
        </a>
      )}
    </div>
  );
};

export default QuestionnaireForm;