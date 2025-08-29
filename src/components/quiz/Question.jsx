import React from "react";

const Question = ({ question, options, selectedOption, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{question}</h3>
      <ul className="space-y-3">
        {options.map((option, idx) => (
          <li key={idx}>
            <button
              onClick={() => onSelect(option)}
              className={`w-full text-left px-4 py-2 rounded-lg border transition
                ${
                  selectedOption === option
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-50 hover:bg-gray-100 border-gray-300 text-gray-700"
                }`}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
